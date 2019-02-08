var express = require('express');
var bodyParser = require('body-parser');
var port = 80;
var app = express();
var db = require('./db');
var countComplete = 0;
var countAll = 0;
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('views'));
app.get('/', function(req, res){
  res.render('index', {list: db, countComplete: countComplete, countAll: countAll});
});
app.post('/', function(req, res){
  db.push({name : req.body.task, success: false});
  countAll++;
  res.redirect('/');
});
app.get('/delete/:index', function(req, res){
  if(db[req.params.index] == undefined) {
    return res.send('not correct index id');
  }
  if(db[req.params.index].success == true) {
    return res.send('cannot do repeated through');
  }
  db[req.params.index].success = true;
  countComplete++;
  res.redirect('/');
});

app.get('/test', function(req, res){
  res.sendStatus(404);
});

app.listen(port, function(){
  console.log('Server start at port', port);
});
