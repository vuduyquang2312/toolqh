const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  phone: String,
  zalo: String,
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
  warnCount: { type: Number, default: 0 },
  isBanned: { type: Boolean, default: false },
  time: { type: Date, default: Date.now },
  role: { type: String, default: 'user' } // 'user' hoặc 'admin'
});

module.exports = mongoose.model('User', userSchema);
