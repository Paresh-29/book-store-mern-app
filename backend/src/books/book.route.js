
const express = require('express')
const Book = require('./book.model')
const { postBook, getAllBooks, getSingleBook, UpdateBook, deleteBook } = require('./book.controller')
const verifyAdminToken = require('../middleware/verifyAdminToken')
const router = express.Router()

//post a book
router.post('/create-book',verifyAdminToken, postBook)

//get all books
router.get("/", getAllBooks);

//get a single book
router.get("/:id", getSingleBook);

//update a book 
router.put("/edit/:id",verifyAdminToken, UpdateBook)

//delete a book
router.delete("/:id",verifyAdminToken, deleteBook)










module.exports = router