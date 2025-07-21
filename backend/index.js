// index setup
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const authRoute = require('./routers/authRoute');
const positionRoute = require('./routers/positionRoute')
const departmentRoute = require('./routers/departmentRoute')
const employeeRoute = require('./routers/employeeRoute')
const attendanceRoute = require('./routers/attendanceRoute')
const payrollPeriodRoute = require('./routers/payrollPeriodRoute')
const employeeAllowanceRoute  = require('./routers/employeeAllowance')
const allowanceRoute = require('./routers/allowanceRoute');
const deductionRoute = require('./routers/deductionRoute');
const overtimeRateRoute = require('./routers/overtimeRateRoute');
const overtimeRequestRoute = require('./routers/overtimeRequestRoute');


app.use(
  cors({
    origin: 'http://localhost:5173',  
    credentials: true,             
  })
);

app.use(express.json());

app.use('/api/v1/auth', authRoute );
app.use("/api/v1/positions", positionRoute);
app.use("/api/v1/departments", departmentRoute);
app.use("/api/v1/employees", employeeRoute);
app.use("/api/v1/attendances", attendanceRoute);
app.use("/api/v1/payroll-periods", payrollPeriodRoute);
app.use("/api/v1/employee-allowances", employeeAllowanceRoute);
app.use("/api/v1/allowances", allowanceRoute);
app.use("/api/v1/deductions", deductionRoute);
app.use("/api/v1/overtime-rates", overtimeRateRoute);
app.use("/api/v1/overtime-requests", overtimeRequestRoute);


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
