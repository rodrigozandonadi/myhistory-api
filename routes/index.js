var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'API' });
});

/* --- Postagens --- */

/* Get postagens */
router.get('/postagens', function (req, res, next) {
  var db = require('../dbHistory');
  var Postagens = db.Mongoose.model('postagens', db.PostagensSchema, 'postagens');
  Postagens.find({}).lean().exec(function(e,docs){
     res.json(docs);
     res.end();
  });
});

/* Get postagens by id */
router.get('/postagens/:id', function (req, res, next) {
  var db = require('../dbHistory');
  var Postagens = db.Mongoose.model('postagens', db.PostagensSchema, 'postagens');
  Postagens.find({ _id: req.params.id }).lean().exec(function (e, docs) {
      res.json(docs);
      res.end();
  });  
});

/* Post postagem */
router.post('/postagens/', function (req, res, next) {
  var db = require('../dbHistory');
  var Postagens = db.Mongoose.model('postagens', db.PostagensSchema, 'postagens');
  var newpost = new Postagens(
    { 
      titulo: req.body.titulo, 
      tipo: req.body.tipo,
      categoria: req.body.categoria,
      tags: req.body.tags,
      texto: req.body.texto
    });
  newpost.save(function (err) {
      if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
      }
      res.json(newpost);
      res.end();
  });
});

/* Update postagem */
router.put('/postagens/:id', function (req, res, next) {
  var db = require('../dbHistory');
  var Postagens = db.Mongoose.model('postagens', db.PostagensSchema, 'postagens');
  Postagens.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, function (err, doc) {
      if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
      }
      res.json(req.body);
      res.end();
  });
});

/* Delete postagem */
router.delete('/postagens/:id', function (req, res, next) {
  var db = require('../dbHistory');
  var Postagens = db.Mongoose.model('postagens', db.PostagensSchema, 'postagens');
  Postagens.find({ _id: req.params.id }).remove(function (err) {
      if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
      }
      res.json({success: true});
      res.end();
  });
});


module.exports = router;
