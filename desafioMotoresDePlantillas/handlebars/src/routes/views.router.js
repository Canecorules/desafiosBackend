import {Router} from "express";
import Contenedor from "../managers/contenedorManager.js";

const router = Router()
const claseProductos = new Contenedor()

router.get ("/",(req,res)=>{
    res.render("welcome")
})

router.get('/newProduct', (req,res)=>{
    res.render('newProduct')
})
router.get('/products', async(req,res)=>{
    let products = await claseProductos.getAll();
    res.render('products',{products, listVoid:products.length===0})
})


export default router;