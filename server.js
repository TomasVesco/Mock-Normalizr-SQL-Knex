const express = require('express');
const moment = require('moment');

const MONGO = require('./DBcfg/MongodbCFG');

const ContenedorProducts = require('./class/productsClass');
const MongodbMessages = require('./class/mongoDBMessages');

const p = new ContenedorProducts();
const fakerProducts = require('./faker');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));

app.set('views', './views');
app.set('view engine', 'ejs');

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const PORT = 8080;

httpServer.listen(PORT, function () {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



const dbMessages = 'mongodb';

let m;

switch(dbMessages){
  case 'mongodb':
    MONGO;
    console.log('Usando Mongodb para la persistencia de mensajes');
    m = new MongodbMessages();
    break;
  
  case 'fs':
    console.log('Usuando FileSystem para la persistencia de mensajes');
    m = new FileSystemMessages();
    break;

  default:
    console.log('Usuando Firestore para la persistencia de los mensajes');
    m = new FirestoreMssages();
    break;
}



app.get('/productos', async (req, res) => {
  res.render('index');
});

app.get('/productos-test', async (req, res) => {
  res.render('test');
});


io.on("connection", async function (socket) {

  products = await p.getAll();
  messages = await m.getAll();

  socket.emit("products", products);
  socket.emit("messages", messages);
  socket.emit('fakerProducts', await fakerProducts);

  socket.on("new-product", async (data) => {

    if(data.title !== '' && data.price !== '' && data.image !== '' && !isNaN(data.price)){
      newProduct = {
        title: data.title,
        price: data.price,
        image: data.image
      }

      await p.save(newProduct);
    }

    products = await p.getAll();

    io.sockets.emit("products", products);
  });

  socket.on("new-message", async (data) => {

    let date = moment(new Date()).format('DD-MM-YYYY h:mm:ss a');

    if(data.author !== '' && data.text !== ''){
      newMessages = {
        author: data.author,
        date: date,
        text: data.text
      }

      await m.insertMessage(newMessages);
    }

    messages = await m.getAll();

    io.sockets.emit("messages", messages);
  });
});