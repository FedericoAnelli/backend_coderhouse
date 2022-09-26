const express = require('express');
const app = express();
const port = process.env.NODE_PORT;
const productos = require('./productos');
const path = require('path');
const useragent = require('express-useragent');
const handlebars = require('express-handlebars');

// Middleware a nivel de aplicacion
app.use((req, res, next) => {
        console.log(`Request recibido: ${req.url}`);
        if(req.url === '/')
        {
            console.log("hbs");
            app.engine('handlebars', handlebars.engine());
            app.set('view engine', 'handlebars');
            app.set('views', path.join(__dirname, 'views'));
        }
    
        if(req.url === '/pug/')
        {
            app.set('views', path.join(__dirname, 'express-pug/views'));
            app.set('view engine', 'pug');
        }
    
        if(req.url === '/ejs/')
        {
            app.set('view engine', 'ejs');
            app.set('views', path.join(__dirname, 'express-ejs/views'));
        }
        next();
    }
);

// Middleware incorporado
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/pug', express.static(path.join(__dirname, './express-pug/public')));
app.use('/ejs', express.static(path.join(__dirname, './express-ejs/public')));

// Middleware de terceros
app.use(useragent.express());
app.use('/', productos);

app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }
);

const server = app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    }
);