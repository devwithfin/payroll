// index setup
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

// import category route
const authRoute = require('./routers/authRoute');
// const categoryRoute = require('./routers/categoryRoute');

// enable CORS for frontend 
app.use(
  cors({
    origin: 'http://localhost:5173', // allowed frontend URL
    credentials: true,               // allow cookies and credentials
  })
);

// middleware to parse incoming JSON requests
app.use(express.json());

// use routes
app.use('/api/v1/auth', authRoute );
// app.use('/api/v1/category', categoryRoute);

// get port from .env
const PORT = process.env.PORT;

// start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
