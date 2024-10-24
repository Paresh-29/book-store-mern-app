const Book = require("./book.model");

const postBook = async (req,res) => {
    try {
        const newBook = await Book.create({...req.body});
        await newBook.save();
        res.status(200).send({message: "book created successfully", book: newBook})
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).send({message: "Error creating book"});
    }
}

//get all books

const getAllBooks = async (req,res) => {
    try {
        const books = await Book.find().sort({createdAt: -1});
        res.status(200).send({message: "books fetched successfully", books: books})
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).send({message: "Error fetching books"});
    }
}

//get a single book
const getSingleBook = async (req,res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        if (!book) {
            res.status(404).send({message: "book not found"})
        }
        res.status(200).send({message: "books fetched successfully", books: book})
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).send({message: "Error fetching books"});
    }
}

//update a book
const UpdateBook = async (req,res) => {
    try {
        const {id} = req.params;
        const updateBook = await Book.findByIdAndUpdate(id, req.body, {new: true});
        if (!updateBook) {
            res.status(404).send({message: "book not found"})
        }
        res.status(200).send({message: "book updated successfully", book: updateBook})
    } catch (error) {
        console.error("Error updating books:", error);
        res.status(500).send({message: "Error updating books"});
    }
}

//delete a book
const deleteBook = async (req,res) => {
    try {
        const {id} = req.params;
        const deletedBook = await Book.findOneAndDelete(id);
        if (!deletedBook) {
            res.status(404).send({message: "book not found"})
        }
        res.status(200).send({message: "book deleted successfully", book: deletedBook})
        
    } catch (error) {
        console.error("Error deleting books:", error);
        res.status(500).send({message: "Error deleting books"});
    }
}




module.exports = {
    postBook,
    getAllBooks,
    getSingleBook,
    UpdateBook,
    deleteBook
}