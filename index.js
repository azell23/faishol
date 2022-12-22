require("dotenv").config({});
const express = require('express');
const app = express();
const port = process.env.PORT || 3030;

const mainRoutes = require('./src/routes/');
app.use(express.urlencoded({extended: false}));
app.use('/apis', mainRoutes)

app.listen(port ,() =>{
    console.log("server jalan pada port "+port);
})