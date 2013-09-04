#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var http = require("http");
var fs      = require('fs');
var engine = require('ejs-locals');

var app = express();

// TODO instead of using VCAP_APP_HOST it should use an ENV var.
var expImpEnabled = typeof(process.env.VCAP_APP_HOST) !== 'undefined';

app.configure(function() {
  app.set('host',process.env.OPENSHIFT_NODEJS_IP || process.env.OPENSHIFT_INTERNAL_IP || "127.0.0.1");
  app.set('port', process.env.OPENSHIFT_NODEJS_PORT ||  process.env.OPENSHIFT_INTERNAL_PORT || 8080);
  app.use(express.static(__dirname + '/web'));
  app.use(express.bodyParser());
  app.use(require('express-blocks'));

  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.engine('html', engine);
});

app.get('/', function (req, res) {
    res.render('simulator', {expImpEnabled: expImpEnabled});
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.get('/player', function (req, res) {
    res.render('player');
});

app.listen(app.get('port'), app.get('host'), function() {
    console.log('%s: Node server started on %s:%d ...',
        Date(Date.now() ), app.get('host'), app.get('port'));
});