const mongoose = require('mongoose');
require('dotenv').config()
const password = process.env.MONGODB_PASSWORD;
const user = process.env.MONGODB_USER;

//DB connection:
const databaseUrl = `mongodb+srv://${user}:${password}@cluster0.sre7ibb.mongodb.net/?retryWrites=true&w=majority`;

function mongooseConnect(){
    mongoose.connect(databaseUrl)
      .then(() => {
        console.log('Connected to the database mongo');
      })
      .catch((error) => {
        console.error('Error connecting to the database:', error);
      });
}

module.exports = mongooseConnect;