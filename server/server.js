const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
// init
const app = express();

const port = process.env.PORT || 3000;
// Static files
app.use(express.static(path.join(__dirname, '../public')));

// settings
app.listen(port, () => console.log('online', new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()));

app.set('views', path.join(__dirname, '../views'));
app.engine(
    '.hbs',
    exphbs({
        defaultLayout: 'main',
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        extname: '.hbs',
        helpers: {
            selected: (sala, idSala) => (sala === idSala ? 'selected' : ''),
            year: () => new Date().getFullYear(),
            returnSala: (salas) => ({ ...salas }),
        },
    })
);
app.set('view engine', '.hbs');

// Middelware
// app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(require('./routes/index'));
