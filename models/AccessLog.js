const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    client: {
      type: String,
      required: true,
    },
    access_date: {
      type: Date,
      required: true,
    },
    remote_ip: {
      type: String,
    },
    last_access: {
      type: Date,
    },
  },
  {
    collection: 'access_logs',
  }
);

module.exports = mongoose.model('access_log', accessLogSchema);
