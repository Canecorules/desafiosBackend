class Usuario{
    constructor (nombre,apellido){
        this.nombre=nombre;
        this.apellido=apellido;
        this.libros=[];
        this.mascotas=[];
    }

    getFullName=function(){
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota=function(name){
        this.mascotas.push(name);
    }

    countMascotas=function(){                 
        return `${this.nombre} ${this.apellido} tiene ${this.mascotas.length} mascotas`;
    }

    addBook=function(libro,escritor){
        this.libros.push({nombre: libro, autor: escritor});
    }

    getBookNames=function(){
        const nombreLibro = this.libros.map((libro)=>libro.nombre);
        return nombreLibro;        
    }
}

let usuario1 = new Usuario("daniel","camelo");
usuario1.addMascota("alitas");
usuario1.addMascota("pelele");
console.log(usuario1.getFullName());
console.log(usuario1.countMascotas());
usuario1.addBook("la odisea", "homero");
usuario1.addBook("el padrino", "mario puzo");
console.log(usuario1.getBookNames());







