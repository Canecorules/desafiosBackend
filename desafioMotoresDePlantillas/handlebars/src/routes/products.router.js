import { Router } from "express";
import Contenedor from "../managers/contenedorManager.js";
import { uploder } from "../utils.js";

const claseProductos = new Contenedor();
const router=Router();

router.post('/', uploder.single('img'),async (req,res)=>{
    const {name,price} = req.body 

    if(!req.file)return res.status(500).send({status:'error', error:"couldn't upload file"})
    if(!name||!price)return res.status(400).send({status:'error', error:'Incomplete values'})
    let product ={
        name,
        price,
        img:req.file.filename
    }
    await claseProductos.addProduct(product)
    res.send({status:'success', message:'Product added'})
})

export default router;