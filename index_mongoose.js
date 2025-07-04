const mongoose = require('mongoose');

// Connect to MongoDB
const url = "mongodb://localhost:27017/my-books-db";
mongoose.connect(url)
  .then(() => console.log("Connected to " + url))
  .catch(err => console.error("Connection error:", err));

// Define schema
const bookSchema = new mongoose.Schema({
  _id: String,
  isbn: String,
  price: Number,
  title: String
});

// Create model
const Book = mongoose.model('Book', bookSchema);

// Data to insert
const booksToInsert = [
  { _id: "1", isbn: "001", price: 18.0, title: "Java Programming" },
  { _id: "2", isbn: "002", price: 4.48, title: "Node.js Programming" },
  { _id: "3", isbn: "003", price: 10.00, title: "Mastering Big Data" },
  { _id: "4", isbn: "004", price: 4.00, title: "Introduction to AI" },
  { _id: "5", isbn: "005", price: 25.00, title: "React-Node.js Projects" },
  { _id: "6", isbn: "006", price: 1.00, title: "HTML-CSS-Simplified" }
];

// Insert
async function insertBooks() {
  try {
    const result = await Book.insertMany(booksToInsert);
    console.log("Inserted Books:", result);
  } catch (err) {
    console.error("Insert Error:", err);
  }
}

// Find
async function getBooks() {
  try {
    const books = await Book.find({});
    console.log("Books:", books);
  } catch (err) {
    console.error("Find Error:", err);
  }
}

// Update
async function updateBook() {
  try {
    const result = await Book.updateOne({ isbn: "002" }, { $set: { price: 26.99 } });
    console.log("Update Result:", result);
  } catch (err) {
    console.error("Update Error:", err);
  }
}

// Delete
async function deleteBook() {
  try {
    const result = await Book.deleteOne({ isbn: "001" });
    console.log("Delete Result:", result);
  } catch (err) {
    console.error("Delete Error:", err);
  }
}

// Uncomment to execute
// insertBooks();
// getBooks();
// updateBook();
// deleteBook();