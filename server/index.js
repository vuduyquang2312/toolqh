require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const fs = require('fs');
const path = require('path');
const topupRoutes = require('./routes/topup');
const router = express.Router();
const { handlePercentageLog } = require("./controllers/percentageController");
const app = express();
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));
app.use('/api/topup', topupRoutes);
app.use("/api/percentage", handlePercentageLog);

const createDefaultAdmin = async () => {
    try {
        const adminExists = await User.findOne({ username: 'admin' });
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            const admin = new User({
                username: 'admin',
                phone: '0000000000',
                zalo: 'admin_zalo',
                password: hashedPassword,
                role: 'admin'
            });
            await admin.save();
            console.log('✅ Default admin created');
        } else {
            console.log('ℹ️ Admin already exists');
        }
    } catch (err) {
        console.error('❌ Failed to create default admin:', err);
    }
};

createDefaultAdmin();



app.get('/api/images', async (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Token required' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const imagesDir = path.join(__dirname, 'public', 'images');
        const files = fs.readdirSync(imagesDir);
        const images = files.map((file) => ({
            name: file,
            url: `http://localhost:3001/images/${file}`,
        }));


        res.json(images);
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
});
// Register
app.post('/api/register', async (req, res) => {
    const { username, phone, zalo, password } = req.body;

    try {
        // Kiểm tra username, phone hoặc zalo đã tồn tại
        const existingUser = await User.findOne({
            $or: [
                { username },
                { phone },
                { zalo },
            ],
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Username, số điện thoại hoặc Zalo/Telegram đã tồn tại' });
        }

        // Nếu không trùng, tiếp tục tạo mới
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, phone, zalo, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Registration failed' });
    }
});


// Login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Wrong password' });

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Login failed' });
    }
});

// Protected route (example)
app.get('/api/profile', async (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'Token required' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
