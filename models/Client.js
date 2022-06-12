const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: String,
  base_url: String,
  infos: Object,
  configs: Object,
  active: Boolean,
}, {
  collection: 'clients',
});

module.exports = mongoose.model('clients', clientSchema);
