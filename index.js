const { MongoClient } = require('mongodb');

// MongoDB Server URL
const url = "mongodb://localhost:27017";

// Create client
const client = new MongoClient(url);

const booksToInsert = [{ "_id": "1", "isbn": "001", "price": 18.0, "title": "Java Programming" },
{ "_id": "2", "isbn": "002", "price": 4.48, "title": "Node.js Programming" },
{ "_id": "3", "isbn": "003", "price": 10.00, "title": "Mastering Big Data" },
{ "_id": "4", "isbn": "004", "price": 4.00, "title": "Introduction to AI" },
{ "_id": "5", "isbn": "005", "price": 25.00, "title": "React-Node.js Projects" },
{ "_id": "6", "isbn": "006", "price": 1.00, "title": "HTML-CSS-Simplified" }
]

async function insertBooks() {

    try {
        await client.connect();
        console.log("connected to : " + url);
        const database = client.db('my-books-db');
        console.log(database);
        const booksCollection = database.collection('books');
        const status = await booksCollection.insertMany(booksToInsert);
        console.log('Books: ' + JSON.stringify(status));
    } finally { 
        await client.close();
    }
}

async function getBooks() {
    try {
        await client.connect();
        console.log("connected to : " + url);
        // select a db and collection to work with
        const database = client.db('my-books-db');
        const booksCollection = database.collection('books');
        // run the find method on the books collection
        const books = await booksCollection.find().toArray();
        // do something with the data
        console.log('Books: ' + JSON.stringify(books));
    } finally {
        await client.close();
    }
}

async function updateBook() {
    try {
        await client.connect();
        console.log("connected to : " + url);
        const database = client.db('my-books-db');
        const booksCollection = database.collection('books');
        const filter = { isbn: "002" }
        const data = { $set: { price: 26.99 } };
        const status = await booksCollection.updateOne(filter, data);
        console.log('Books: ' + JSON.stringify(status));
    } finally {
        await client.close();
    }
}

async function deleteBook() {
    try {

        await client.connect();
        console.log("connected to : " + url);
        let database = client.db('my-books-db');
        const books = database.collection('books');
        const filter = { isbn: '001' };
        const status = await books.deleteOne(filter);
        console.log('Output: ' + JSON.stringify(status));
    } finally { await client.close(); }
}

//insertBooks();
//getBooks();
//updateBook();
//deleteBook();
