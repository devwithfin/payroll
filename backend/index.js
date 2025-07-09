// index setup
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const authRoute = require('./routers/authRoute');
const positionRoute = require('./routers/positionRoute')
 
app.use(
  cors({
    origin: 'http://localhost:5173',  
    credentials: true,             
  })
);


app.use(express.json());

app.use('/api/v1/auth', authRoute );
app.use("/api/v1/positions", positionRoute);


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
