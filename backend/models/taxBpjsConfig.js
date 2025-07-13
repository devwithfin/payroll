// model/tax-bpjs-config
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TaxBpjsConfig extends Model {
    static associate(models) {}
  }

  TaxBpjsConfig.init(
    {
      config_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      config_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      pph21_rules: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      bpjs_kesehatan_employee_rate: DataTypes.DECIMAL(5, 4),
      bpjs_kesehatan_company_rate: DataTypes.DECIMAL(5, 4),
      bpjs_tk_jkm_employee_rate: DataTypes.DECIMAL(5, 4),
      bpjs_tk_jkm_company_rate: DataTypes.DECIMAL(5, 4),
      bpjs_tk_jht_employee_rate: DataTypes.DECIMAL(5, 4),
      bpjs_tk_jht_company_rate: DataTypes.DECIMAL(5, 4),
      bpjs_tk_jp_employee_rate: DataTypes.DECIMAL(5, 4),
      bpjs_tk_jp_company_rate: DataTypes.DECIMAL(5, 4),
      bpjs_tk_jkk_company_rate: DataTypes.DECIMAL(5, 4),
      effective_start_date: DataTypes.DATEONLY,
      effective_end_date: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "TaxBpjsConfig",
      tableName: "tax_bpjs_config",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      deletedAt: "deleted_at",
    }
  );

  return TaxBpjsConfig;
};
