const express = require('express');
const ReviewRouter = express.Router();
const ReviewModel = require('../models/reviewModel');

// Middleware

ReviewRouter.post("/", async (req, res) => {
	
	const { content } = req.body;
	
	try {
		const reviewCreated = await ReviewModel.create({content });
		res.status(201).json({ success: 1, review: reviewCreated, reviewId:reviewCreated._id  });
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}

});
// CitizenRouter.use((req, res, next) => {
// 	const { citizenInfo } = req.session;
// 	if (citizenInfo && citizenInfo.role >= 1) {
// 		next();
// 	} else res.status(404).json({ success: 0, message: "access deni" });
// })
// "/api/users" => get all


// get user by id


// Create user


// Edit user
ReviewRouter.put("/:id", async (req, res) => {
	const citizenId = req.params.id;
	const { name, password, dob, address, job } = req.body;

	try {
		const citizenFound = await ReviewModel.findById(citizenId);
		if (!citizenFound) {
			res.status(404).json({ success: 0, message: "Not found!" });
		} else {
			for (key in { name, password, dob, address, job }) {
				if (citizenFound["hashPassword"] && req.body["password"]) {
					const plainPassword = req.body["password"];
					const hashPassword = citizenFound["hashPassword"];
					if (!bcrypt.compareSync(plainPassword, hashPassword)) {
						citizenFound["hashPassword"] = bcrypt.hashSync(plainPassword, bcrypt.genSaltSync())
					}
				}
				if (citizenFound[key] && req.body[key]) citizenFound[key] = req.body[key];
			}
			let citizenUpdated = await citizenFound.save();
			res.json({ success: 1, user: citizenUpdated });
		}
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}
});

// Delete user => BTVN
ReviewRouter.delete("/:id", async (req, res) => {
	const citizenId = req.params.id;
	try {
		ReviewModel.remove({ _id: citizenId });
		res.json({ success: 1 });
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}
});

module.exports = ReviewRouter;