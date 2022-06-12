const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    username: {
      type: String,
      unique: true,
      lowercase: true,
    },
    is_admin:{
      type: Boolean,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    roles: {
      type: Array,
    },
    first_access: {
      type: Boolean,
    },
    remember_token: {
      type: String,
      strim: true,
    },
    profile_image: {
      type: Object,
    },
  },
  {
    collection: 'users',
  }
);

module.exports = mongoose.model('users', userSchema);
