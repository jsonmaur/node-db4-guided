exports.up = async function(knex) {
	await knex.schema.createTable("zoos", (table) => {
		table.increments("id")
		table.text("name").notNull()
		table.text("address").notNull().unique()
	})

	await knex.schema.createTable("species", (table) => {
		table.increments("id")
		table.text("name").notNull().unique()
	})

	await knex.schema.createTable("animals", (table) => {
		table.increments("id")
		table.text("name").notNull()
		table
			.integer("species_id")
			.references("id")
			.inTable("species")
			.onDelete("SET NULL")
			.onUpdate("CASCADE")
	})

	await knex.schema.createTable("zoos_animals", (table) => {
		table.integer("zoo_id")
			.notNull()
			.references("id")
			.inTable("zoos")
			.onDelete("CASCADE")
			.onUpdate("CASCADE")
		table.integer("animal_id")
			.notNull()
			.references("id")
			.inTable("animals")
			.onDelete("CASCADE")
			.onUpdate("CASCADE")
		table.date("arrival").notNull().defaultTo(knex.raw("current_timestamp"))
		table.date("departure")
		// make the primary key a combination of two columns, so you can only have one
		// unique combination of each value
		table.primary(["zoo_id", "animal_id"])
	})
}

exports.down = async function(knex) {
	await knex.schema.dropTableIfExists("zoos_animals")
	await knex.schema.dropTableIfExists("animals")
	await knex.schema.dropTableIfExists("species")
	await knex.schema.dropTableIfExists("zoos")
}
