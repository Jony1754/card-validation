const express = require('express');
const router = express.Router();
var connection = require('../Db/database.js');

router.post('/InfoP', async(req,res) => {
    const sql = 'SELECT usuarios.Usuario, usuarios.Contraseña, usuarios.E_mail, usuarios.Num_cuenta, informacion_personal.Nombre, informacion_personal.Edad, informacion_personal.Fecha_nacimiento, informacion_personal.Cedula FROM usuarios INNER JOIN informacion_personal ON usuarios.Id_info = informacion_personal.Id_info where usuarios.Usuario = ?;'
    const usr = req.body.user;
    try { 
        connection.query(sql,[usr], function(err,results){
        res.send(JSON.stringify(results, null, 4));
        })  
    }catch (error){
        res.status(404);
        return error;
    }
})


router.get('/Historial', async (req, res) => {
    const usr = req.session.all
    const sql = "SELECT * FROM db_pagos.transacciones where Id_cuenta_entrega = ? or Id_cuenta_recibido = ?"
    try {
        connection.query(sql, [usr.Num_cuenta, usr.Num_cuenta], function(err, results, fields) {
            if(results.length == 0 || !(usr.Num_cuenta === results[0].Id_cuenta_entrega || usr.Num_cuenta === results[0].Id_cuenta_recibido)) {
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
});

router.get("/Saldo", async (req, res) => {
    const usr = req.session.all
    connection.query("SELECT tarjeta.Nombre_tarjeta, tarjeta.Num_tarjeta, tipo_tarjeta.Tipo, if(tipo_tarjeta.Debito_credito=0, 'Debito', 'Credito') as Debito_credito, cuenta_bancaria.Cantidad FROM db_pagos.cuenta_bancaria LEFT JOIN db_pagos.tarjeta ON db_pagos.cuenta_bancaria.Id_tarjeta = db_pagos.tarjeta.Id_tarjeta LEFT JOIN db_pagos.tipo_tarjeta ON db_pagos.tipo_tarjeta.Id_tipo_tarjeta = db_pagos.tarjeta.Id_tipo_tarjeta where Num_cuenta = ?", [Number(usr.Num_cuenta)], function(err, results){
        res.status(202)
        console.log(results[0])
        res.send(JSON.stringify(results, null, 4))
    })
})

module.exports = router;