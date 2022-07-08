import express from "express";
import Contenedor from './managers/contenedorManager.js'


const productos = new Contenedor();

const app = express(); 
const PORT = 8080;
const server = app.listen(PORT,()=>{
    console.log(`Listening on Port ${PORT}`)
})

function productsView(productos){
    let string=''
    for(const prod of productos){
        string +=` 
        <h1>${prod.title}</h1>
        <h3>${prod.precio}</h3>
        <img style='width:300px' src='${prod.thumbnail}'></img>
        <br>
        <br>
        `
    }
    return string
}

app.get("/productos",async(req,res)=>{
    let arrayProductos= await productos.getAll();
    res.send(productsView(arrayProductos))
})


app.get('/productoRandom', async(req, res)=>{
    try {
        if(await productos.getRandom()===0){
            res.send('No hay productos')
        }else{
            let randomProduct= await productos.getRandom()            
            res.send(productsView([randomProduct]))
        }
    } catch (error) {
        console.log(error)
    }
})

