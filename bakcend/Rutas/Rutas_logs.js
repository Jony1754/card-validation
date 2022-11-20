const express = require('express')
const router = express.Router()
var connection = require("../Db/database.js")


router.post('/Login', async (req, res) => {
    const usr = req.query.user
    const pasw = req.query.pasw
    const sql = "SELECT * FROM db_pagos.usuarios WHERE Usuario = ?"
    try {
        connection.query(sql, [usr], function(err, results, fields) {
            console.log(results)
            if(results.length == 0 || !(pasw === results[0].Contraseña)) {
                res.status(203)
                throw err
            }else{
            req.session.loggedin = true;
            req.session.usr = results[0].Usuario
            req.session.all = results[0]
            res.status(302)
            res.send(JSON.stringify(results, null, 4))
            }
            connection.end();
        })
    } catch (error) {
        res.status(404)
        return error
    }
});

router.get('/Logout', (req, res) => {
    console.log(req.session.all.Id_cuenta)
    req.session.destroy(()=>{
        console.log("salio")
        res.status(202)
    })
});

module.exports = router;