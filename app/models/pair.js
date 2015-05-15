var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var pairSchema = Schema({
  pairPartner1: {
    type: Schema.Types.ObjectId,
    ref: 'Maker'
  },
  pairPartner2: {
    type: Schema.Types.ObjectId,
    ref: 'Maker'
  }
});

module.exports = mongoose.model('Pair', pairSchema);