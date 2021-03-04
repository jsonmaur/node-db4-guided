const express = require("express")
const Zoo = require("../models/zoo")

const router = express.Router()

router.get("/zoos", async (req, res, next) => {
	try {
		const zoos = await Zoo.find()
		res.json(zoos)
	} catch(err) {
		next(err)
	}
})

router.get("/zoos/:id", async (req, res, next) => {
	try {
		const zoo = await Zoo.findById(req.params.id)
		if (!zoo) {
			return res.status(404).json({
				message: "Zoo not found",
			})
		}

		res.json(zoo)
	} catch(err) {
		next(err)
	}
})

router.get("/zoos/:id/animals", async (req, res, next) => {
	try {
		const animals = await Zoo.findAnimals(req.params.id)
		res.json(animals)
	} catch (err) {
		next(err)
	}
})

module.exports = router