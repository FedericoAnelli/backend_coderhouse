class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

getFullName(){
    return this.nombre + " " + this.apellido;
}

addMascota(mascota){
    this.mascotas.push(mascota);
}

countMascotas(){
    return this.mascotas.length;
}

addBook(libro, autor){
    this.libros.push({nombre: libro, autor: autor});
}

getBooks(){
    return this.libros.map(function(libro){
        return libro.nombre;
    }).join(", ");
}

}

const usuario = new Usuario("Elon", "Musk", [{nombre: "El señor de las moscas", autor: "William Golding"}, {nombre: "Fundacion", autor: "Isaac Asimov"}], ["Perro", "Gato"]);
console.log(usuario.getFullName());
console.log(usuario.addMascota("Perico"));
console.log(usuario.countMascotas());
console.log(usuario.addBook("El principito", "Antoine de Saint-Exupéry"));
console.log(usuario.getBooks());