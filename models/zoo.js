const db = require("../data/config")

function find() {
	return db("zoos")
}

function findById(id) {
	return db("zoos")
		.where("id", id)
		.first()
}

function findAnimals(zooID) {
	// Select * from animals where zoo_id = ?
	return db("zoos_animals as za")
		.join("zoos as z", "z.id", "za.zoo_id")
		.join("animals as a", "a.id", "za.animal_id")
		.join("species as s", "s.id", "a.species_id")
		.where("z.id", zooID)
		.select(
			"a.id",
			"a.name",
			"s.name as species_name",
			"za.from_date",
			"za.to_date",
		)
}

module.exports = {
	find,
	findById,
	findAnimals,
}