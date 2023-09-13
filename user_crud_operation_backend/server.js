const express = require('express');
const bodeParser = require('body-parser');
const fs = require('fs');

const app = express();

var cors = require('cors');
app.use(cors());

app.use(bodeParser.json());
app.use(bodeParser.urlencoded({extended: true}));

const routes = require('./Routes/routes');

app.use('/', routes);

app.listen(8000, () => {

    console.log('Welcome to world')
})



