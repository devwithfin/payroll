// index setup
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const accountRoute = require('./routers/accountRoute');
const allowanceRoute = require('./routers/allowanceRoute');
const authRoute = require('./routers/authRoute');
const attendanceRoute = require('./routers/attendanceRoute');
const departmentRoute = require('./routers/departmentRoute');
const deductionRoute = require('./routers/deductionRoute');
const employeeAllowanceRoute = require('./routers/employeeAllowance');
const employeeDeductionRoute = require('./routers/employeeDeduction');
const employeeRoute = require('./routers/employeeRoute');
const employeeSummaryRoute = require('./routers/employeeSummaryRoute');
const hrSummaryRoute = require('./routers/hrSummaryRoute');
const overtimeRateRoute = require('./routers/overtimeRateRoute');
const overtimeRequestRoute = require('./routers/overtimeRequestRoute');
const payrollDetailRoute = require('./routers/payrollDetailRoute');
const payrollPeriodRoute = require('./routers/payrollPeriodRoute');
const positionRoute = require('./routers/positionRoute');

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/v1/account-users', accountRoute);
app.use('/api/v1/allowances', allowanceRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/attendances', attendanceRoute);
app.use('/api/v1/departments', departmentRoute);
app.use('/api/v1/deductions', deductionRoute);
app.use('/api/v1/employee-allowances', employeeAllowanceRoute);
app.use('/api/v1/employee-deductions', employeeDeductionRoute);
app.use('/api/v1/employee-summary', employeeSummaryRoute);
app.use('/api/v1/employees', employeeRoute);
app.use('/api/v1/hr-summary', hrSummaryRoute);
app.use('/api/v1/overtime-rates', overtimeRateRoute);
app.use('/api/v1/overtime-requests', overtimeRequestRoute);
app.use('/api/v1/payroll-details', payrollDetailRoute);
app.use('/api/v1/payroll-periods', payrollPeriodRoute);
app.use('/api/v1/positions', positionRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
