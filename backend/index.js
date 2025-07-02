// index setup
const express = require('express');
const app = express();
// cors
const cors = require('cors');
require('dotenv').config();

// import routers/auth
const authRoute = require('./routers/authRoute');

// enable CORS for frontend 
app.use(
  cors({
    origin: 'http://localhost:5173',  
    credentials: true,             
  })
);

// middleware to parse incoming JSON requests
app.use(express.json());

// use routes
app.use('/api/v1/auth', authRoute );

// get port from .env
const PORT = process.env.PORT;

// start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
