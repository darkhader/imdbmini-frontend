const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// const session = require('express-session')


mongoose.connect("mongodb://localhost/hackathon", { useNewUrlParser: true }, (err) => {
    if (err) console.log(err)
    else console.log("Success")

});
const movieRouter = require('./routers/movieRouter');
const actorRouter = require('./routers/actorRouter');
const reviewRouter = require('./routers/reviewRouter');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
	res.setHeader("X-Frame-Options", "ALLOWALL");
	res.setHeader(
	  "Access-Control-Allow-Methods",
	  "POST, GET, PUT, DELETE, OPTIONS"
	);
  
	if (req.headers.origin) {
	  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
	}
  
	res.setHeader("Access-Control-Allow-Credentials", true);
  
	res.setHeader(
	  "Access-Control-Allow-Headers",
	  "Authorization, Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
  });
// app.use(session({
// 	secret:"keybroadhero",
// 	resave:false,
// 	saveUninitialized:true,
// 	cookie:{
// 		secure:false,
// 		httpOnly:false,
// 		maxAge:7*24*60*60*1000
// 	}
// }))

app.get("/api", (req, res) => {

});
//api/images
app.use("/api/movies",movieRouter );
app.use("/api/reviews", reviewRouter);
app.use("/api/actors", actorRouter);


// Middleware
app.use((req, res, next) => {
	console.log("404");
	res.send("404");
});

const port = 9999;
app.listen(port, (err) => {
	if(err) console.log(err)
	else console.log("Listen at port " + port);
});