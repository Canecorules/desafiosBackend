import express from 'express';
import __dirname from './utils.js';
import handlebars from "express-handlebars";
import Contenedor from "./managers/contenedorManager.js";
import {Server} from "socket.io";
import viewsRouter from "./routes/views.router.js"


const claseProductos = new Contenedor();

const app = express();
const server = app.listen(8080,()=>console.log("Listening on 8080"));
const io = new Server(server);

// Template engine config
app.engine("handlebars",handlebars.engine());
app.set("views",__dirname+"/views");
app.set("view engine","handlebars");

app.use(express.json());
app.use(express.static(__dirname+'/public'))

app.use ('/', viewsRouter);

const log = [];
let products;


io.on('connection', async (socket)=>{
    products= await claseProductos.getAll()
    socket.emit("listProducts",products)    
    console.log("connected");
    socket.broadcast.emit('newConnection');
    
    socket.on('message',data=>{
        log.push(data);        
        io.emit('log',log)
    })

    socket.on('addProduct', async (data) => {        
        await claseProductos.addProduct(data)
        products = await claseProductos.getAll()
        io.emit('listoProducts', products)
    })
})

