const Contenedor = require("./managers/contenedorManager");


const productos = new Contenedor();
const ambiente = async () =>{
    console.log(" leyendo productos");
    let objetos = await productos.getAll();
    console.log(objetos);

    console.log("Adicionando Productos")
    let objeto = {
        title: "tenedor",
        precio: 9000,
        thumbnail: "https://casaideasco.vtexassets.com/arquivos/ids/377663-2048-auto?v=637908884390400000&width=2048&height=auto&aspect=true"
    }
    await productos.save(objeto);

    console.log("Llamando by id");
    let resultadoById= await productos.getById(3);
    console.log(resultadoById);
    
    console.log("Eliminando producto");
    await productos.deleteById(2)
    
    console.log("Eliminando Archivo");
    await productos.deleteAll();
}

ambiente();