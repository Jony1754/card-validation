const express = require('express');
const router = express.Router();
var connection = require('../Db/database.js');

router.post('/Info', async(req,res) => {
    const sql = 'SELECT * FROM db_pagos.informacion_personal where Id_info = ?;'
    const usr = req.body.user;
    try { 
    connection.query('SELECT Id_info FROM db_pagos.usuarios WHERE Usuario = ?', [usr], function(err,results){
        connection.query(sql,[results[0].Id_info], function(err,results){
            res.send(JSON.stringify(results, null, 4));
        })  
    })
    }catch (error){
        res.status(404);
        return error;
    }
})


module.exports = router;