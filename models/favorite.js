const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);


const favoriteSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    campsites: [{
        type: mongoose.Types.ObjectId,
        ref: 'Campsite'
    }]
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;