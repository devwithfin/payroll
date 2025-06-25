const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();

const sampleRoute = require('');
 app.use(
    cors({
        origin : 'http://localhost:5173',
        credentials : true,
    })
)

app.use(express.json());
app.use('/v1', sampleRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
