const express = require('express');
const partnersRouter = express.Router();

partnersRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.end('Will send all the partners to you (partnerID)');
    })
    .post((req, res) => {
        res.end(`Will add the partner: ${req.body.name} with description: ${req.body.description}`);
    })
    .put((req, res) => {
        res.write(`Updating the partners: ${req.params.partnerId}\n`);
        res.end(`Will update the partners: ${req.body.name}
        with description: ${req.body.description}`);
        res.send('Yeah Baby')
    })
    .delete((req, res) => {
        res.end('Deleting all partners');
    });

partnersRouter.route('/:partnerId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.end('Will send all the partners to you (partnerID) ');
    })
    .post((req, res) => {
        res.end(`Will add the partner: ${req.body.name} with description: ${req.body.description}`);
    })
    .put((req, res) => {
        console.log(req)
        res.write(`Updating the partner: ${req.params.partnerId}\n`);
        res.end(`Will update the partner: ${req.body.name}
        with description: ${req.body.description}`);
    })
    .delete((req, res) => {
        res.end('Deleting all partners');
    });

module.exports = partnersRouter;