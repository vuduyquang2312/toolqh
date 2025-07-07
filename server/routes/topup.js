const User = require('../models/User'); // Import User model
const TopupRequest = require('../models/TopupRequest');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Không có token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token không hợp lệ' });
  }
};

router.post('/', authenticate, async (req, res) => {
  const { username } = req.body;
  const requestingUsername = req.user.username;

  if (!username) {
    return res.status(400).json({ message: 'Vui lòng nhập username' });
  }

  try {
    const now = new Date();

    // Lấy người dùng từ DB
    const user = await User.findOne({ username: requestingUsername });
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    // Nếu tài khoản đã bị khóa
    if (user.isBanned) {
      return res.status(403).json({ message: 'Tài khoản của bạn đã bị khóa' });
    }

    // Kiểm tra yêu cầu trước đó
    const lastRequest = await TopupRequest.findOne({ user: requestingUsername }).sort({ time: -1 });

    if (lastRequest) {
      const secondsSinceLast = (now - lastRequest.time) / 1000;
      if (secondsSinceLast < 180) {
        // Nếu vi phạm, tăng cảnh báo
        user.warnCount += 1;

        // Nếu quá 1 lần cảnh báo thì khóa tài khoản
        if (user.warnCount >= 2) {
          user.isBanned = true;
        }

        await user.save();

        return res.status(429).json({
          message: user.isBanned
            ? 'Tài khoản của bạn đã bị khóa do vi phạm nhiều lần.'
            : `Bạn đã gửi yêu cầu gần đây. Vui lòng chờ ${(180 - secondsSinceLast).toFixed(0)} giây. Vi phạm lần ${user.warnCount}/2.`,
        });
      }
    }

    // Nếu hợp lệ => reset cảnh báo và tạo yêu cầu mới
    user.warnCount = 0;
    await user.save();

    const newRequest = new TopupRequest({
      user: requestingUsername,
      username,
      time: now,
      status: 'Đang xử lý',
      keep: null,
    });

    await newRequest.save();

    return res.json({ message: 'Gửi yêu cầu thành công!' });
  } catch (err) {
    console.error('❌ Lỗi:', err);
    return res.status(500).json({ message: 'Lỗi server' });
  }
});

module.exports = router;
