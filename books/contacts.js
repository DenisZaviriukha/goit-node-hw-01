// contacts.js

const fs = require("fs/promises");
const path = require("path")
const {nanoid} = require("nanoid");

const booksPath = path.join(`${__dirname}/books.json`)

const listOfBooks = async () => {
    const data = await fs.readFile(booksPath, "utf-8")
    return JSON.parse(data)
};

const getById = async (id) => { 
    const books = await listOfBooks()
    const data = books.find(item => item.id === id)
    return data || null
}

const addBook = async (data) => { 
    const books = await listOfBooks()
    const newBook = {
        id: nanoid(),
        ...data
    }
    books.push(newBook)

    await fs.writeFile(booksPath, JSON.stringify(books, null, 2))
    return newBook || null
}

const deleteById = async (id) => { 
    const books = await listOfBooks()
    const index = books.findIndex(item => item.id === id)
    if (index === -1) { 
        return null
    }
    const [result] = books.splice(index, 1)
    await fs.writeFile(booksPath, JSON.stringify(books, null, 2))
    return result
}


module.exports = {
    listOfBooks,
    getById,
    addBook,
    deleteById
}