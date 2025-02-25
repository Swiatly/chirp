const express = require('express');
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');

const app = express(); 

mongoose.connect('mongodb+srv://admin:admin@cluster0.zlhit.mongodb.net/mean-course?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to database!')
    })
    .catch((error) => {
        console.log('Connection failed due to ' + error);
    }
)

app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({ extended: false })); 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    
    next();
});

module.exports = app; 