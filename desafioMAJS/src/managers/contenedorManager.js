const fs = require ("fs");
const path= "./src/files/productos.json" 

class Contenedor{

    getAll = async()=>{
        try {
            if(fs.existsSync(path)){
                let datos= await fs.promises.readFile(path,"utf-8");
                let objetos = JSON.parse(datos)
                return objetos
            }else{
                return [];
            }
        } catch (error) {
            console.log("El archivo no pudo ser leido: ",error);
        }     
    }

    save = async (object) => {        
        try {
            let producto = await this.getAll();
            if (producto.length===0){
                object.id= 1;
                producto.push(object);
                await fs.promises.writeFile(path,JSON.stringify(producto,null,"\t"));
                console.log("Producto ha sido almacenado correctamente")
            } else {
                object.id=producto[producto.length-1].id+1;
                producto.push(object);
                await fs.promises.writeFile(path,JSON.stringify(producto,null,"\t"));
                console.log("Producto ha sido almacenado correctamente")
            }          
        } catch (error) {
            console.log("El archivo no pudo ser leido: ",error);
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
            await fs.promises.writeFile(path,JSON.stringify(arrayProductos,null,"\t"));
            console.log("Producto eliminado de su lista de productos");
            }else{
                console.log("Producto no se encuentra registrado")
            }    
        } catch (error) {
            console.log("El archivo no pudo ser leido: ",error);
        }
    }

    deleteAll = async() =>{
        try {
            await fs.promises.unlink(path);
            console.log("Su lista de productos ha sido eliminada completamente")            
        } catch (error) {
            console.log("El archivo no pudo ser borrado: ",error);
        }
    }
}

module.exports = Contenedor;