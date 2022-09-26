const express = require('express');
const { Router } = require('express');
const router = Router(Router);

const productos = [

    {
        id: 1,
        title: 'Escuadra',
        price: 123.45,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
    },
    {
        id: 2,
        title: 'Calculadora',
        price: 234.56,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
    },
    {
        id: 3,
        title: 'Globo Terráqueo',
        price: 345.67,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
    }
];

let id = 4;

router.get('/productos', (_, res) => {
    res.render("productos", {productos});
});

router.get('/pug/productos', (_, res) => {
    console.log(__dirname);
    res.render("productos", {productos});
});

router.get('/ejs/productos', (_, res) => {
    console.log(__dirname);
    res.render("productos", {productos});
});

router.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    const producto = productos.find(producto => producto.id === parseInt(id));
    if (producto) {
        res.render("productos", { producto } );
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

router.post('/productos', (req, res) => {
    const producto = req.body;
    producto.id = id++;
    productos.push(producto);
    res.redirect('/productos');
});

router.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const producto = req.body;
    const index = productos.findIndex(producto => producto.id === parseInt(id));
    if (index !== -1) {
        productos[index] = producto;
        res.status(200).json(producto);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

router.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    const index = productos.findIndex(producto => producto.id === parseInt(id));
    if (index !== -1) {
        productos.splice(index, 1);
        res.status(200).json({ message: 'Producto eliminado' });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});





module.exports = router;

