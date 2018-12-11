const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;


hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');	

hbs.registerHelper('currentYear',() =>{
	return new Date().getFullYear();
});

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`

	fs.appendFile('server.log', log + '\n', (err) => {
			if (err){
				console.log("Something is wrong");
			}});
	next();
});

// app.use((req, res, next) => {
// 	res.render('main.hbs');
// });

app.use(express.static(__dirname + '/public'));


app.get('/', (req,res) => {
	res.render("home.hbs",{
		title : "Home ",
		'name': 'Sami Alassem',
		'hobbies' : {
			'work':[
				'Technology', 'AI', 'Consulting', 'Sales'],
			'life':[
				'Football', 'Swimming']},
	});
});

app.get('/portofolio', (req,res) => {
	res.render("home.hbs",{ title : "Portofolio"});
});

app.get('/about', (req,res) => {
	res.render("about.hbs", {
		title: 'About '
	});
});

app.get("/bad",(req,res) => {
	res.send({
		'errorMessage': 'Unable to Handle Request.'
	});
});

app.listen(port, () =>{
	console.log(`Server in up on port ${3000}`);
})

