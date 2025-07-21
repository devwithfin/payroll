'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS after_overtime_approval;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER after_overtime_approval
      AFTER UPDATE ON overtime_requests
      FOR EACH ROW
      BEGIN
        IF NEW.approval_status = 'Approved' AND OLD.approval_status != 'Approved' THEN

          INSERT INTO calculated_overtimes (
            request_id,
            employee_id,
            overtime_date,
            start_time,
            end_time,
            duration_minutes,
            overtime_amount,
            calculation_details,
            created_at,
            updated_at
          )
          SELECT
            NEW.request_id,
            NEW.employee_id,
            NEW.overtime_date,
            NEW.start_time,
            NEW.end_time,
            TIMESTAMPDIFF(MINUTE, NEW.start_time, NEW.end_time),
            CASE 
              WHEN DAYOFWEEK(NEW.overtime_date) IN (1,7) THEN
                CASE
                  WHEN TIMESTAMPDIFF(MINUTE, NEW.start_time, NEW.end_time) <= 60 THEN (p.base_salary / 173) * 2.0
                  ELSE 
                    ((p.base_salary / 173) * 2.0) + 
                    (FLOOR((TIMESTAMPDIFF(MINUTE, NEW.start_time, NEW.end_time) - 60)/60) * (p.base_salary / 173) * 3.0)
                END
              ELSE
                CASE
                  WHEN TIMESTAMPDIFF(MINUTE, NEW.start_time, NEW.end_time) <= 60 THEN (p.base_salary / 173) * 1.5
                  ELSE 
                    ((p.base_salary / 173) * 1.5) + 
                    (FLOOR((TIMESTAMPDIFF(MINUTE, NEW.start_time, NEW.end_time) - 60)/60) * (p.base_salary / 173) * 2.0)
                END
            END,
            CONCAT(
              'Durasi: ', TIMESTAMPDIFF(MINUTE, NEW.start_time, NEW.end_time), ' menit, ',
              'Tanggal: ', NEW.overtime_date
            ),
            NOW(),
            NOW()
          FROM employees e
          JOIN positions p ON e.position_id = p.position_id
          WHERE e.employee_id = NEW.employee_id;

        END IF;
      END;
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS after_overtime_approval;
    `);
  }
};
