import express from 'express';
import __dirname from './utils.js';
import productsRouter from "./routes/product.routes.js"
import Contenedor from "./manager/contenedorManager.js";


const app = express();
const claseProductos = new Contenedor();

const server = app.listen(8080,()=>console.log("Listening on 8080"));


app.set("views",__dirname+"/views");
app.set("view engine","pug");

app.use(express.json());
app.use(express.static(__dirname+'/public'))

app.get('/',(req,res)=>{
    res.render('welcome.pug', {
        message:'valor pasado por el render'
    })
})
app.get('/newProduct',(req,res)=>{
    res.render('newProduct', )
})
app.get('/products',async (req,res)=>{
    let products = await claseProductos.getAll()
    res.render('products', {products, listVoid:products.length===0})
})

app.use('/api/newProduct',productsRouter)

export default app