const mysql = require('mysql2');
const [host, user, pasw, db] = [process.env.HOST, process.env.USER, process.env.PASW, process.env.DB]
const {sql, sql2} = require("./Querydb")

// Mysql connection 

var connection = mysql.createConnection({
    host     : host,
    user     : user,
    password : pasw,
    database : db,
    multipleStatements: true
})

connection.connect(error => {
    if (error) {
        throw error;
    }else{
        connection.query(sql, function(error) {
            if (error) {
                throw error;
            }else{
                connection.query("SELECT * FROM db_pagos.usuarios;", function(error, results, fields) {
                    if (error) {
                        throw error;
                    }else{
                        if(results.length==0){connection.query(sql2)}
                    }
                });
            }
        });
    }

    console.log("********** conectado a la base de datos ************")
})

module.exports = connection