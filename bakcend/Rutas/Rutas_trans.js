const express = require('express')
const router = express.Router()
var connection = require("../Db/database.js")

/*const sql1 = "SELECT * FROM db_pagos.cuenta_bancaria where Num_cuenta = ? or Num_cuenta = ?"
    const a = "0123456789"*/


router.get('/History', async (req, res) => {
    const usr = req.session.all
    const sql = "SELECT * FROM db_pagos.transacciones where Id_cuenta_entrega = ? or Id_cuenta_recibido = ?"
    try {
        connection.query(sql, [usr,usr], function(err, results, fields) {
            if(results.length == 0 || !(usr.Id_cuenta === results[0].Id_cuenta_entrega || usr.Id_cuenta === results[0].Id_cuenta_recibido)) {
                res.status(203)
                throw err
            }else{
            res.status(302)
            res.send(JSON.stringify(results, null, 4))
            }
        })
    } catch (error) {
        res.status(404)
        return error
    }
});

router.post('/Transaccion', async(req,res) => {
    
    const usr = req.session.all

    const usr1 = req.query.cuenta
    const cant = req.query.cant
    
    const sql = "SELECT * FROM db_pagos.cuenta_bancaria where Id_cuenta = ?"
    
    const cuenta = connection.query(sql, [usr.Id_cuenta], function(err, results){    
        if (err){
            res.status(203)
            throw err
        }else{
            const cuenta = results[0].Num_cuenta
            //console.log("cuenta retiro: "+cuenta)
            
            if (cant <= results[0].Cantidad){
                const result = results[0].Cantidad - cant

                connection.query("SELECT * FROM db_pagos.cuenta_bancaria where Num_cuenta = ?", [usr1], function(err, results){
                    
                   // console.log("Cuenta a depositar: "+results[0].Num_cuenta)

                    if(results.length == 0 || !(usr1 === results[0].Num_cuenta )) {
                        res.status(203)
                        throw err
                    }else{
                        connection.query("UPDATE db_pagos.cuenta_bancaria SET Cantidad = ? WHERE Num_cuenta = ?",[result, cuenta], function(err,results){
                            console.log("update cuenta:"+ results[0])
                        })
                        connection.query("INSERT INTO db_pagos.transacciones (Id_cuenta_entrega, Id_cuenta_recibido, Cantidad) values ?", [usr.Id_cuenta,results[0].Id_cuenta, cant], function(err,results){
                            //console.log("add transaccion:"+ results)

                        })

                        connection.query("UPDATE db_pagos.cuenta_bancaria SET Cantidad = ? WHERE Id_cuenta = ?", [results[0].Cantidad+cant, results[0].Num_cuenta ], function(err, results){
                            //console.log("Transaccion exitosa", results)
                        })
                    
                        res.status(302)
                    res.send(JSON.stringify(results, null, 4))
                    }
                
                })
            }else{
                res.status(402)
            }
        }
    })

    try {
        connection.query(sql, [cuenta], function(err, results, fields) {
            if(results.length == 0 || !(usr.Id_cuenta === results[0].Id_cuenta_entrega || usr.Id_cuenta === results[0].Id_cuenta_recibido)) {
                res.status(203)
                throw err
            }else{
            res.status(302)
            res.send(JSON.stringify(results, null, 4))
            }
        })
    } catch (error) {
        res.status(404)
        return error
    }
})

module.exports = router;
