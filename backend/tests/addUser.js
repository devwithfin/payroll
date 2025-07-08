const bcrypt = require('bcrypt');
const { User } = require('../models'); // pastikan path models sesuai

async function insertUser() {
  try {
    const password = await bcrypt.hash('password123', 10);

    const users = [
      { username: 'hr_bayu', password: password, role: 'HR' },
      { username: 'employee_fin', password: password, role: 'Employee' },
      { username: 'finance_dewi', password: password, role: 'Finance' }
    ];

    for (const user of users) {
      await User.create(user);
    }

    console.log('Insert Success');
  } catch (err) {
    console.error('Failed Insert Data:', err.message);
  }
}

insertUser();
