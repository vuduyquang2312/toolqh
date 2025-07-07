const mongoose = require('mongoose');

const topupRequestSchema = new mongoose.Schema({
  user: { type: String, required: true },      // Người gửi yêu cầu (đăng nhập)
  username: { type: String, required: true },  // Tài khoản được nạp (được nhập)
  time: { type: Date, default: Date.now },     // Thời gian gửi yêu cầu

  status: {
    type: String,
    enum: ['Đang xử lý', 'Thành công', 'Từ chối'],
    default: 'Đang xử lý',
  },

  keep: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('TopupRequest', topupRequestSchema);
