const express = require('express');
const router = express.Router();
var connection = require('../Db/database.js');

router.post('/info', async(req,res) => {
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

router.post('/Login', async (req, res) => {
  const usr = req.body.user;
  const pasw = req.body.pasw;
  console.log(usr, pasw, 'login');
  const sql = 'SELECT * FROM db_pagos.usuarios WHERE Usuario = ?';
  try {
    connection.query(sql, [usr], function (err, results, fields) {
      console.log(results);
      if (results.length == 0 || !(pasw === results[0].Contraseña)) {
        res.status(203);
        throw err;
      } else {
        req.session.loggedin = true;
        req.session.usr = results[0].Usuario;
        req.session.all = results[0];
        res.status(200);
        res.send(JSON.stringify(results, null, 4));
      }
    });
  } catch (error) {
    res.status(404);
    return error;
  }
});

router.get('/Logout', (req, res) => {
  console.log(req.session.all.Id_cuenta);
  req.session.destroy(() => {
    console.log('salio');
    res.status(202);
  });
});

module.exports = router;
