const express = require('express')
const router = express.Router()
var connection = require("../Db/database.js")

router.get('/pagosinfo', async (req, res) => {
    let sql = "SELECT * FROM db_pagos.pagos_info"
    connection.query(sql, function(error,results){
        res.status(302)
        res.send(results)
    })
});


module.exports = router