import * as fs from 'fs'
import __dirname from '../utils.js'


class Contenedor{

    constructor(){
        this.path = __dirname+'/files/products.json'
    }

    getAll = async()=>{
        try {
            
            if(fs.existsSync(this.path)){
                let datos= await fs.promises.readFile(this.path,"utf-8");
                let objetos = JSON.parse(datos)
                return objetos
            }else{
                return [];
            }
        } catch (error) {
            console.log("El archivo no pudo ser leido: ",error);
        }     
    }

    addProduct = async (object) => {        
        try {
            let producto = await this.getAll();            
            if (producto.length===0){
                object.id= 1;
                producto.push(object);
                await fs.promises.writeFile(this.path,JSON.stringify(producto,null,"\t"));
                return object
            } else {                
                object.id=producto[producto.length-1].id+1;               
                producto.push(object);
                await fs.promises.writeFile(this.path,JSON.stringify(producto,null,"\t"));
                return object
            }          
        } catch (error) {
            console.log(error);
        }
    }

    getById = async (numeroId)=>{
        try {
            let arrayProductos = await this.getAll();    
            let objetoById=arrayProductos.find(item => item.id===numeroId);
            if(objetoById!=undefined){
                return objetoById;
            }else{
                return null;
            }                                  
        } catch (error) {
            console.log("El archivo no pudo ser leido: ",error);
        }
    }

    deleteById = async (numeroId)=>{
        try {
            let arrayProductos = await this.getAll();    
            let indice = arrayProductos.findIndex(index=> index.id === numeroId); 
            if(indice!=-1){
            arrayProductos.splice(indice,1);
            await fs.promises.writeFile(this.path,JSON.stringify(arrayProductos,null,"\t"));
            console.log("Producto eliminado de su lista de productos");
            }else{
                console.log("Producto no se encuentra registrado")
            }    
        } catch (error) {
            console.log("El archivo no pudo ser leido: ",error);
        }
    }


    modifiedById = async (numeroId,precio,title,thumbnail)=>{
        try {
            let arrayProductos = await this.getAll();
            for(const item of arrayProductos){ 
                if(item.id===numeroId){                    
                    item.precio = precio
                    item.title =  title
                    item.thumbnail = thumbnail                             
                    await fs.promises.writeFile(this.path,JSON.stringify(arrayProductos,null,"\t"));
                    return item
                }else{     
                    console.log({error:"Producto no encontrado"})
                }
            }               
        } catch (error) {
                console.log("El archivo no pudo ser leido: ",error);
        }
    }

    deleteAll = async() =>{
        try {
            await fs.promises.unlink(this.path);
            console.log("Su lista de productos ha sido eliminada completamente")            
        } catch (error) {
            console.log("El archivo no pudo ser borrado: ",error);
        }
    }   
}

export default Contenedor