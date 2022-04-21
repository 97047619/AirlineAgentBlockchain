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

app.get('/readAirlineTicket', (req, res) => {
    console.log(req.query.key);
    network.readAirlineTicket(req.query.key)
        .then((response) => {
            let ticketsRecord = JSON.parse(response);
            res.send(ticketsRecord);
        });
});

app.post('/transferAirlineTicket', (req, res) => {
    console.log(req.body);

    network.transferAirlineTicket(req.body.airlineTicketId, req.body.newOwner)
        .then((response) => {
            res.send(response);
        });
});

app.post('/changeAirlineTicketStatus', (req, res) => {
    console.log(req.body);

    network.changeAirlineTicketStatus(req.body.airlineTicketId, req.body.newStatus)
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

app.post('/transferTokens', (req, res) => {
    console.log(req.body);

    network.transferTokens(req.body.to, req.body.value)
        .then((response) => {
            res.send(response);
        });
});

app.listen(process.env.PORT || 8082);