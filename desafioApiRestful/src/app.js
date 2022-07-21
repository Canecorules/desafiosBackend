import express from "express";  
import productsRouter from "./routes/products.router.js"


const app = express();
const server = app.listen(8080,()=> console.log("Listening on 8080"));

app.use(express.json());
app.use('/api',productsRouter);



