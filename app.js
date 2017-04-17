const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

app.get('/' , function (req, res) {res.status(200).send('Hello, Express.js');});
app.get('/hello' , function (req, res) {res.status(200).send('Hello stranger!');});
app.get('/hello/:name', function (req, res) {res.status(200).send('Hello, '+req.params.name+'!');})
app.all('/sub/*', function (req, res) {
	let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	res.status(200).send('You requested URI: '+fullUrl+'!');})

const middleware = function (req, res, next) {
if (!req.headers.key) {res.sendStatus(401);} else {next();}
}

const controller = function (req, res) {
	if (Object.keys(req.body).length !== 0){res.status(200).json(req.body);} else {res.sendStatus(404);}
	}

app.post('/post', middleware, controller)
app.listen(3000);