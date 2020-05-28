const express = require('express');
const app = express();
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

// connect to mongoDB
connectDB();

// Express middlewares
app.use(bodyParser.json());
app.use(cors());

// ROUTES
app.use('/auth', require('./routes/auth'));
app.use('/cities', require('./routes/cities'));
app.use('/itineraries', require('./routes/itineraries'));
app.use('/users', require('./routes/users'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));