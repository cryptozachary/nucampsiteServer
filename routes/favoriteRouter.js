const express = require('express');
const Favorite = require('../models/favorite');
const authenticate = require('../authenticate');
const cors = require('./cors');

const favoriteRouter = express.Router();

favoriteRouter.route('/')
    .options(cors.corsWithOptions, authenticate.verifyUser, (req, res) => res.sendStatus(200))
    .get(cors.cors, (req, res, next) => {
        Favorite.find({ user: req.user._id })
            .populate('user')
            .populate('campsite')
            .then(favorites => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);
            })
            .catch(err => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorite.findOne({ user: req.user._id })
            .then(favorites => {
                if (favorites) {
                    favorites.comments.push(req.body);
                    favorites.save()
                        .then(favorites => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorites);
                        })
                        .catch(err => next(err));
                }
            })
            .catch(err => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorites');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorite.findOneAndDelete()
            .then(favorite => {
                if (favorite) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    return res.json(favorite);
                } else {
                    res.setHeader('Content-Type', 'text/plain');
                    return res.end('You do not have any favorites to delete')
                }
            })
            .catch(err => next(err));
    });

favoriteRouter.route('/:campsiteId')
    .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
    .get((req, res) => {
        res.statusCode = 403;
        res.end(`GET operation not supported on /campsites/${req.params.campsiteId}`);
    })
    .post(authenticate.verifyUser, (req, res) => {
        Favorite.findOne()
            .then(favorite => {
                let exist = favorite.campsites.id(req.params.campsiteId)
                if (!exist) {
                    favorite.campsites.push(req.body);
                    return favorite.save()
                } else {
                    return res.send("That campsite is already in the list of favorites!")
                }
            })
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end(`PUT operation not supported on /campsites/${req.params.campsiteId}`);
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Favorite.findOne()
            .then(favorite => {
                if (favorite) {
                    let newArray = favorite.campsites.filter(fav => {
                        return !fav.equals(req.params.campsiteId)
                    })
                    favorite.campsites = newArray
                    return favorite.save()
                } else {
                    res.setHeader('Content-Type', 'text/plain');
                    return res.end('There are no favorites to delete')
                }
            })
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
    });




module.exports = favoriteRouter;