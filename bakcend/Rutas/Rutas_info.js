const express = require('express');
const router = express.Router();
var connection = require('../Db/database.js');

router.post('/Info', async(req,res) => {
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


module.exports = router;