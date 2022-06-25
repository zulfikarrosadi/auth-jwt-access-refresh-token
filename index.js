const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');

mongoose.set('runValidators', true);
try {
  mongoose.connect(process.env.MONGO_URI, {
    auth: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    },
    authSource: 'admin',
    useNewUrlParser: true,
  });
  console.log('mongodb connected');
} catch (error) {
  console.log(error);
}

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/users', userRoute);
app.listen(process.env.PORT);
