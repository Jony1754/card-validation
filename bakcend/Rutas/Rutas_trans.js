const { ConnectingAirportsOutlined, ConstructionOutlined } = require('@mui/icons-material');
const express = require('express');
const { connect } = require('../Db/database.js');
const router = express.Router()
var connection = require("../Db/database.js")


/*router.get('/History', async (req, res) => {
    const usr = req.session.all
    const sql = "SELECT * FROM db_pagos.transacciones where Id_cuenta_entrega = ? or Id_cuenta_recibido = ?"
    try {
        connection.query(sql, [usr.Id_cuenta, usr.Id_cuenta], function(err, results, fields) {
            if(results.length == 0 || !(usr.Id_cuenta === results[0].Id_cuenta_entrega || usr.Id_cuenta === results[0].Id_cuenta_recibido)) {
                res.status(203)
                throw err
            }else{
                connection.query("SELECT Usuario as Usuario_envia, transacciones.Cantidad as transaccion FROM usuarios inner join transacciones ON usuarios.Id_cuenta = transacciones.Id_cuenta_entrega",function(err,results){
                    //res.send(JSON.stringify(results, null, 4))
                })
                connection.query("SELECT Usuario as Usuario_recibe FROM usuarios inner join transacciones ON usuarios.Id_cuenta = transacciones.Id_cuenta_recibido",function(err,results){
                    //res.send(JSON.stringify(results, null, 4))
                })
            res.status(302)
            res.send(JSON.stringify(results, null, 4))
            }
        })
    } catch (error) {
        res.status(404)
        return error
    }
});*/

router.post('/Transaccion', async(req,res) => {
    const usr = req.session.all
    
    const ac = req.query.ac
    const cant = req.query.cant
    
    const conp = req.query.conp

    const tarj = req.query.tarj
    const csv = req.query.csv

    const fv = req.query.fv 
    const cuot =  req.query.cuot

    connection.query("WITH ab as (SELECT tarjeta.Nombre_tarjeta, tarjeta.Num_tarjeta, tipo_tarjeta.Tipo, if(tipo_tarjeta.Debito_credito=0, 'Debito', 'Credito') as Debito_credito, cuenta_bancaria.Cantidad FROM db_pagos.cuenta_bancaria LEFT JOIN tarjeta ON cuenta_bancaria.Id_tarjeta = tarjeta.Id_tarjeta LEFT JOIN tipo_tarjeta ON tipo_tarjeta.Id_tipo_tarjeta = tarjeta.Id_tipo_tarjeta where Num_cuenta = ?) select * from ab where Num_tarjeta = ?", [Number(usr.Num_cuenta),tarj], function(err, results){
        console.log(results)
        if(results.length == 0) {
            console.log("la tarjeta no se encuentra")
            res.status(203)
            throw err
        }else{
            connection.query("SELECT * FROM db_pagos.cuenta_bancaria where Num_cuenta = ?;", [ac], function(err, results){
                if(results.length == 0) {
                    console.log("la cuenta a depositar no existe")
                    res.status(203)
                    throw err
                }else{
                    const acp = results[0].Cantidad
                    const aci = results[0].Id_cuenta

                    if (results[0].Debito_credito == "Debito"){
                        if (results[0].Cantidad >= cant){
                            const result = results[0].Cantidad - cant
                            
                            connection.query("SELECT Id_tarjeta FROM db_pagos.tarjeta where Num_tarjeta = ?;", [results[0].Num_tarjeta], function(err, results) {
                                
                                connection.query("UPDATE db_pagos.cuenta_bancaria SET Cantidad = ? WHERE Id_tarjeta = ? and Id_cuenta > 0",[result, results[0].Id_tarjeta], function(err,results){
                                    console.log("update cuenta")
                                    connection.end();
                                })
                                
                                connection.query("INSERT INTO db_pagos.transacciones (Id_cuenta_entrega, Id_cuenta_recibido, Cantidad, Conpago) values (?,?,?,?)", [usr.Num_cuenta,ac,cant,conp], function(err,results){
                                    console.log("add transaccion")
                                    connection.end();
                                })

                                connection.query("UPDATE db_pagos.cuenta_bancaria SET Cantidad = ? WHERE Num_cuenta = ? and Id_cuenta = ?", [acp + Number(cant), ac, aci], function(err, results){
                                    console.log("Transaccion exitosa")
                                    connection.end();
                                })

                            })
                        }
                    }else{            
                    
                    }

                }
                connection.end();
            })
        }
        connection.end();
    })
    
})


router.get("/Saldo", async (req, res) => {
    const usr = req.session.all
    connection.query("SELECT tarjeta.Nombre_tarjeta, tarjeta.Num_tarjeta, tipo_tarjeta.Tipo, if(tipo_tarjeta.Debito_credito=0, 'Debito', 'Credito') as Debito_credito, cuenta_bancaria.Cantidad FROM db_pagos.cuenta_bancaria LEFT JOIN tarjeta ON cuenta_bancaria.Id_tarjeta = tarjeta.Id_tarjeta LEFT JOIN tipo_tarjeta ON tipo_tarjeta.Id_tipo_tarjeta = tarjeta.Id_tipo_tarjeta where Num_cuenta = ?", [Number(usr.Num_cuenta)], function(err, results){
        res.status(302)
        res.send(JSON.stringify(results, null, 4))
        connection.end();
    })
})

module.exports = router;

