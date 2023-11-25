// index.js

const books = require("./books/contacts")

// TODO: рефакторить
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const listOfBooks = await books.listOfBooks()
      return console.table(listOfBooks)
      break;

    case 'get':
      const getById = await books.getById(id)
      return console.log(getById)
      break;

    case 'add':
      const newBook = await books.addBook({ name, email, phone });
      console.log(newBook);
      break;

    case 'remove':
      const deleteBook = await books.deleteById(id)
      return console.log(deleteBook)
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}


// invokeAction({ action: 'list' })

// invokeAction({ action: 'get', id: 'AeHIrLTr6JkxGE6SN-0Rw' })

// invokeAction({ action: 'add', name: 'Den', email: 'mail', phone: '+380' })

// invokeAction({ action: 'remove', id: 'drsAJ4SHPYqZeG-83QTVW' })

// invokeAction(argv);

const { program } = require('commander');

  program
  .option('--action <type>', 'choose action')
  .option('--id <type>', 'user id')
  .option('--name <type>', 'user name')
  .option('--email <type>', 'user email')
  .option('--phone <type>', 'user phone');

// program.parse(process.argv);

program.parse();

const options = program.opts();

invokeAction(options)