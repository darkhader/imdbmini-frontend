const express = require('express');
const MovieRouter = express.Router();
const MovieModel = require('../models/movieModel');

// Middleware

MovieRouter.post("/", async (req, res) => {
	
	const { title, description, image, duration,year,review, actor } = req.body;
	try {
		const movieCreated = await MovieModel.create({  title, description, image, duration,year,review, actor });
		res.status(201).json({ success: 1, movie: movieCreated, movieId:movieCreated._id  });
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}

});
// MovieRouter.use((req, res, next) => {
// 	const { movieInfo } = req.session;
// 	if (movieInfo && movieInfo.role >= 1) {
// 		next();
// 	} else res.status(404).json({ success: 0, message: "access deni" });
// })
// "/api/users" => get all
MovieRouter.get("/", async (req, res) => {
	console.log("Get all user");
	try {
		const movies = await MovieModel.find({});
		res.json({ success: 1, movies });
	} catch (error) {
		res.status(500).json({ success: 0, error: error })
	}

});

// get user by id
MovieRouter.get("/:id", async (req, res) => {
	let movieId = req.params.id;
	try {
		const movieFound = await MovieModel.findById(movieId).populate("actor", "name image");
		if (!movieFound) res.status(404).json({ success: 0, message: "Not found!" })
		else res.json({ success: 1, movie: movieFound });
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}
});

// Create user


// Edit user
MovieRouter.put("/:id", async (req, res) => {
	const movieId = req.params.id;
	const {  title, description, image, duration,year,review, actor } = req.body;

	try {
		const movieFound = await MovieModel.findById(movieId);
		if (!movieFound) {
			res.status(404).json({ success: 0, message: "Not found!" });
		} else {
			for (key in {  title, description, image, duration,year,review, actor }) {
				if (movieFound[key] && req.body[key]) movieFound[key] = req.body[key];
			}
			let movieUpdated = await movieFound.save();
			res.json({ success: 1, user: movieUpdated });
		}
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}
});

// Delete user => BTVN
MovieRouter.delete("/:id", async (req, res) => {
	const movieId = req.params.id;
	try {
		MovieModel.remove({ _id: movieId });
		res.json({ success: 1 });
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}
});

module.exports = MovieRouter;