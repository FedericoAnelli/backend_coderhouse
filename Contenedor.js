const fs = require("fs");

class Contenedor{
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    }

    save = async (objeto) => {
        try{
            if (fs.existsSync(this.nombreArchivo)){
                const array = JSON.parse(fs.readFileSync(this.nombreArchivo, "utf-8"));
                for (let i = 0; i < array.length; i++){
                    if (array[i].title === objeto.title){
                        return "El producto ya existe";
                    }
                }
                objeto.id = array.length + 1;
                array.push(objeto);
                fs.writeFileSync(this.nombreArchivo, JSON.stringify(array, null, 2));
                return objeto.id;
            }
            else{
                objeto.id = 1;
                fs.writeFileSync(this.nombreArchivo, JSON.stringify([objeto], null, 2));
                return objeto.id;
            }
        }
        catch(error){
            console.log(error);
        }
    }

    getById = async (id) => {
        try{
            const productos = JSON.parse(fs.readFileSync(this.nombreArchivo, "utf-8"));
            const producto = productos.find(producto => producto.id === id);
            return producto;
        }
        catch(error){
            console.log(error);
        }
    }

    getAll = async () => {
        try{
            const productos = JSON.parse(fs.readFileSync(this.nombreArchivo, "utf-8"));
            return productos;
        }
        catch(error){
            console.log(error);
        }
    }

    deleteById = async (id) => {
        try{
            const productos = JSON.parse(fs.readFileSync(this.nombreArchivo, "utf-8"));
            const producto = productos.find(producto => producto.id === id);
            const index = productos.indexOf(producto);
            productos.splice(index, 1);
            fs.writeFileSync(this.nombreArchivo, JSON.stringify(productos, null, 2));
        }
        catch(error){
            console.log(error);
        }
    }

    deleteAll = async () => {
        try{
            fs.writeFileSync(this.nombreArchivo, JSON.stringify([], null, 2));
        }
        catch(error){
            console.log(error);
        }
    }

}
const contenedor = new Contenedor('./productos.txt');
module.exports = Contenedor;

//console.log(contenedor.save({title: "Escuadra", price: 123.45, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"}));
//console.log(contenedor.save({title: "Calculadora", price: 234.56, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"}));
//console.log(contenedor.save({title: "Globo Terráqueo", price: 345.67, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"}));
//console.log(contenedor.getById(2));
//console.log(contenedor.getAll());
//contenedor.deleteById(1);
//console.log(contenedor.getAll());
//contenedor.deleteAll();
//console.log(contenedor.getAll());
