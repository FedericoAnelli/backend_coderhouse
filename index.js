const express = require('express');
const app = express();
const port = 8080;

const server = app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

server.on('error', (err) => {
        console.log(`Server error: ${err}`);
    }
);

app.get('/', (req, res) => {
        const welcome = `<h1 style="color: blue">Bienvenidos al servidor express!</h1>`;
        res.send(welcome);
    }
);

app.set('cantidad', 0);
app.get('/visitas', (req, res) => {
        let cantidad = app.get('cantidad');
        cantidad++;
        app.set('cantidad', cantidad);
        res.send(`<h1 style="color: blue">Cantidad de visitas: ${cantidad}</h1>`);
    }
);

app.get('/fyh', (req, res) => {
        const fecha = new Date();
        res.send(`<h1 style="color: blue">Fecha y hora: ${fecha}</h1>`);
    }
);

const Contenedor = require('./Contenedor');
const contenedor = new Contenedor('./productos.txt');

app.get('/productos', async (req, res) => {
        const productos = await contenedor.getAll();
        res.send(productos);
    }
);

app.get('/productoRandom', async (req, res) => {
        const productos = await contenedor.getAll();
        const random = Math.floor(Math.random() * productos.length);
        res.send(productos[random]);
    }
);