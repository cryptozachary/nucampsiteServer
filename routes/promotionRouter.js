const express = require('express');
const promotionsRouter = express.Router();

promotionsRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.end('Will send all the promotions to you');
    })
    .post((req, res) => {
        res.end(`Will add the promotion: ${req.body.name} with description: ${req.body.description}`);
    })
    .put((req, res) => {
        res.write(`Updating the promotions: ${req.params.promotionId}\n`);
        res.end(`Will update the promotions: ${req.body.name}
        with description: ${req.body.description}`);
        res.send('Yeah Baby')
    })
    .delete((req, res) => {
        res.end('Deleting all promotions');
    });

promotionsRouter.route('/:promotionId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.end('Will send all the promotions to you (promotionsID) ');
    })
    .post((req, res) => {
        res.end(`Will add the promotion: ${req.body.name} with description: ${req.body.description}`);
    })
    .put((req, res) => {
        res.write(`Updating the promotions: ${req.params.promotionId}\n`);
        res.end(`Will update the promotions: ${req.body.name}
        with description: ${req.body.description}`);
    })
    .delete((req, res) => {
        res.end('Deleting all promotions');
    });

module.exports = promotionsRouter;