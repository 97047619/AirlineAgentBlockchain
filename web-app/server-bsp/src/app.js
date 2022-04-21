'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

let network = require('./fabric/network.js');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());


app.get('/getAllAirlineTickets', (req, res) => {
    network.getAllAirlineTickets()
        .then((response) => {
            let ticketsRecord = JSON.parse(response);
            res.send(ticketsRecord);
        });
});

app.post('/mintTokens', (req, res) => {
    console.log(req.body);

    network.mintTokens(req.body.amount)
        .then((response) => {
            res.send(response);
        });
});

app.post('/burnTokens', (req, res) => {
    console.log(req.body);

    network.burnTokens(req.body.amount)
        .then((response) => {
            res.send(response);
        });
});

app.get('/getClientAccountBalance', (req, res) => {
    network.getClientAccountBalance()
        .then((response) => {
            let balanceRecord = JSON.parse(response);
            // converting into to string to avoid bad response error
            let newBal = '' + balanceRecord;
            res.send(newBal);
        });
});

app.post('/getBalanceOf', (req, res) => {
    console.log(req.body);
    
    network.getBalanceOf(req.body.clientId)
        .then((response) => {
            let balanceRecord = JSON.parse(response);
            // converting into to string to avoid bad response error
            let newBal = '' + balanceRecord;
            res.send(newBal);
        });
});

app.post('/transferTokens', (req, res) => {
    console.log(req.body);

    network.transferTokens(req.body.to, req.body.value)
        .then((response) => {
            res.send(response);
        });
});

app.post('/transferTokensFrom', (req, res) => {
    console.log(req.body);

    network.transferTokensFrom(req.body.from, req.body.to, req.body.value)
        .then((response) => {
            res.send(response);
        });
});

app.get('/getTotalSupply', (req, res) => {
    network.getTotalSupply()
        .then((response) => {
            let balanceRecord = JSON.parse(response);
            // converting into to string to avoid bad response error
            let newBal = '' + balanceRecord;
            res.send(newBal);
        });
});

app.listen(process.env.PORT || 8081);