const express = require("express")
const helmet = require("helmet")
const zoosRouter = require("./routers/zoos")
const animalsRouter = require("./routers/animals")
const speciesRouter = require("./routers/species")

const server = express()

server.use(helmet())
server.use(express.json())

server.use(zoosRouter)
server.use(animalsRouter)
server.use(speciesRouter)

server.use((err, req, res, next) => {
	console.log(err)

	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = server
