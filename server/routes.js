// Routes.js - Módulo de rutas
var express = require('express');
var router = express.Router();




const mensajes = [
  {
    _id:'xxx',
    user:'spiderman',
    mensaje:'Hola mundo'
  },
  {
    _id:'xxx',
    user:'thor',
    mensaje:'Hola mundo'
  }
];


// Get mensajes
router.get('/', function (req, res) {
  // res.json('Obteniendo mensajes');
   res.json(mensajes);
});
// post mensaje
router.post('/', function (req, res) {
  // res.json('Obteniendo mensajes');
  //  res.json(mensajes);
  const mensaje = {
    mensaje:req.body.mensaje,
    user:req.body.user
  };
  mensajes.push(mensaje);
  console.log(mensajes);
  res.json({
    ok:true,
    mensaje

  })
});






module.exports = router;