const { urlencoded } = require('express');
const express = require('express');
const logger = require('./middlerware/logger');
const mysql = require("./db/db")
var exphbs  = require('express-handlebars');
var cors = require('cors')
var app = express()

app.use(cors())

const port = 4200;
// const bodyParser = require('body-parser')
const intial = require("./routes/routing");
// app.use(intial);

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) 
app.use(logger);

app.use('/api',intial)
// app.use('/api' , intial)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

module.exports=app

