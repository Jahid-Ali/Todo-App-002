const express = require('express');
const router = express.Router();

// import model/collection
const todoModel = require("../models/todoSchema");


//create our first route -- add TODO Item in database
router.post("/save-task", async (req, res) => {
	try {
		const { text } = req.body;

		const newItem = new todoModel({
			text: text
		})

		// save this item in database
		const saveItem = await newItem.save();
		res.status(200).json("Add task Successfully!")
	} catch (error) {
		res.json(error);
	}
})


//create our second route -- get TODO Item in database
router.get("/get-task", async (req, res) => {
	try {
		const allTodoItem = await todoModel.find();
		res.status(200).json(allTodoItem)
	} catch (error) {
		res.json(error);
	}
})


//create our third route -- update TODO Item in database
router.post("/update-task", async (req, res) => {
	try {
		const { id, text } = req.body;
		// find the item by it's id and update its
		const updateItem = await todoModel.findByIdAndUpdate(id, { text });
		res.status(200).json("Update Item Successfully!")
	} catch (error) {
		res.json(error);
	}
})


//create our fourth route -- delete TODO Item in database
router.post("/delete-task", async (req, res) => {
	try {
		const { id } = req.body;
		// find the item by it's id and delete its
		const deleteItem = await todoModel.findByIdAndDelete(id);
		res.status(200).json("Deleted Item Successfully!")
	} catch (error) {
		res.json(error);
	}
})


module.exports = router;