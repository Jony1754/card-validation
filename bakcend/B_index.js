require('dotenv').config();
const express = require('express');
const app = express();
var connection = require("./Db/database")
const session = require('express-session')


// MIDDLEWARE JSON
app.use(express.json());

// var sesion
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))


// ROUTES
const routeLog = require('./Rutas/Rutas_logs')
app.use("/Login", routeLog)


// open app port 3000
app.listen(3000, (err) => {
    if(err){
        console.log("Error", err)
        return
    }
    console.log("listening on port 3000")
});
