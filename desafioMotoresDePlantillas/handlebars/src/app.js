import express from 'express';
import __dirname from './utils.js';
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js"
import productsRouter from "./routes/products.router.js"



const app = express();


const server = app.listen(8080,()=>console.log("Listening on 8080"));

// Template engine config
app.engine("handlebars",handlebars.engine());
app.set("views",__dirname+"/views");
app.set("view engine","handlebars");

app.use(express.json());
app.use(express.static(__dirname+'/public'))
app.use ('/', viewsRouter);
app.use('/api/newProduct',productsRouter);

