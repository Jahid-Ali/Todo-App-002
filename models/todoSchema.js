const mongoose = require("mongoose");

// create Schema
const TodoSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true
	}
})

// create model/collection
module.exports = mongoose.model("todo-collection", TodoSchema);

