const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);


const favoriteSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    campsite: [{
        type: mongoose.Types.ObjectId,
        ref: 'campsite'
    }]
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;