const express = require('express');
const app = express();
const port = process.env.NODE_PORT;
const productos = require('./productos');
const path = require('path');
const useragent = require('express-useragent');
const { engine } = require('express-handlebars');

// Middleware a nivel de aplicacion
app.use((req, res, next) => {
        console.log(`Request recibido: ${req.url}`);
        next();
    }
);

// Middleware incorporado
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'public')));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware de terceros
app.use(useragent.express());
app.use('/api', productos);

app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }
);

const server = app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    }
);