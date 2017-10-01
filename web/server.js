"use strict";

// Create an Express app
let express = require('express');
let app = express();

const PORT = 3000;
const HOST = '0.0.0.0';

app.disable('x-powered-by');
app.use(function(req, res, next) {
  res.header('X-Server', process.env.NODE);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello world!\n');
});

let mongoose = require('mongoose');
mongoose.connection.on('error', function (err) {
  console.log('Could not connect to mongo server!');
  console.log(err);
});

mongoose.connect("mongodb://mongodb:27017/sample", function (err) {
  if (err) console.log("Connection error - %s", err.message);
  else console.log("Successfully connected to the database");
});

let UserSchema = new mongoose.Schema({
  name: String,
  gender: String,
  age: String
});

mongoose.model('Users', UserSchema);
let User = mongoose.model('Users');

app.get('/users', function (req, res) {
  User.find({}, function (err, users) {
    if (!err) {
      res.write("<table>");
      res.write("<tr>");
      res.write("<th>User Name</th>");
      res.write("<th>Gender</th>");
      res.write("<th>Age</th>");
      res.write("</tr>");
      users.forEach(function (k, v) {
        res.write("<tr>");
        res.write("<td>" + k.name + "</td>");
        res.write("<td>" + k.gender + "</td>");
        res.write("<td>" + k.age + "</td>");
        res.write("</tr>");
      });
      res.end();
    }
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
