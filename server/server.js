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
app.use('/profiles', require('./routes/profiles'));
app.use('/users', require('./routes/users'));
app.use('/upload_photo', require('./routes/upload_photo'));
// ROUTE input files
app.use('/public', express.static('public'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));