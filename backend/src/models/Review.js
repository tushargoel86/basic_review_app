const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const reviewSchema = new Schema({
    name: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    comments: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    }
});

module.exports = mongoose.model('review', reviewSchema);