import { Router } from "express";
import Contenedor from "../manager/contenedorManager.js";

const claseProductos = new Contenedor();

const router=Router();

function validate(req,res,next){
    if(!req.body.title|| !req.body.precio || !req.body.thumbnail){        
        return res.status(400).send({error:"There´s a wrong value"});
    }else
    next()    
}

router.get('/products', async (req,res)=>{
    try{
    let products = await claseProductos.getAll();    
    res.send({products})
    }catch (error){
        console.log(error)
    }
})  

router.get('/products/:id', async (req,res)=>{
    try{
    let productByID = await claseProductos.getById(parseInt(req.params.id));    
    res.send({productByID})
    }catch (error){
        console.log(error)
    }
})  

router.post('/products/',validate, async (req,res)=>{
    try{
    let productId = await claseProductos.addProduct(req.body);    
    res.send({productId})
    }catch (error){
        console.log(error)
    }
}) 

router.put('/products/:id',validate,async (req,res)=>{
    try{
    let newProduct = await claseProductos.modifiedById(parseInt(req.params.id),req.body.precio,req.body.title,req.body.thumbnail);     
    res.send({newProduct})
    }catch (error){
        console.log(error)
    }
}) 

router.delete('/products/:id',async (req,res)=>{
    try{
    await claseProductos.deleteById(parseInt(req.params.id));     
    res.send({sucess:"Producto Eliminado"})
    }catch (error){
        console.log(error)
    }
})

export default router;