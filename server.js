// load environment variables
require('dotenv').config();

// grab our dependencies 
const express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    expressLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    flash = require('connect-flash'),
    expressValidator = require('express-validator');


// configure our application
// set session & cookie Parser
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    cookie: { maxAge: 60000 },
    resave: false, // froce the session to be saved back to the store
    saveUninitialized: false // don't save unmodified
}));

app.use(flash());

// tell express where to look for static assets
app.use(express.static(__dirname + '/public'));
app.use(expressLayouts);


// set ejs  as our templating engine
app.set('view engine', 'ejs');

// connect to our database
//mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI);

// use body parser to grab info from a form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

// set our routers
app.use(require('./app/routes'));

// start our server
app.listen(port, () => {
    console.log(`App listening on http://localhost:${ port }`);
});