const User = require("../models/User");

// Biến đếm số lần request của từng user (chỉ lưu trong RAM)
const requestCounts = {};

exports.handlePercentageLog = async (req, res) => {
    const { username, name, slotId, timestamp } = req.body;

    if (!username || !name) {
        return res.status(400).json({ message: "Missing username or name" });
    }

    try {
        // Tìm người dùng trong MongoDB
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Tăng biến đếm cho user
        requestCounts[username] = (requestCounts[username] || 0) + 1;

        // Mỗi 2 lần gọi -> trừ 1 xu
        if (requestCounts[username] % 2 === 0) {
            if (user.balance > 0) {
                user.balance -= 1;
                await user.save();
            } else {
            }
        }

        // Nếu là "PG2 ĐIỆN TỬ", trả về danh sách game PG2
        if (name === "PG2 ĐIỆN TỬ") {
            const rawList = [
                "Chiến Thắng CaiShen.png",
                "Đế Quốc Hoàng Kim.png",
                "Đường Mạt Chược 2.png",
                "Đường Mạt Chược.png",
                "Giấc Mơ Macao.png",
                "Kho Báu Aztec.png",
                "Kho Báu Ganesha.png",
                "Kho Báu Thuyền Trưởng.png",
                "Kho Báu Yêu Tinh.png",
                "Kì Lân Mách Nước.png",
                "Neko May Mắn.png",
                "Nữ Hoàng Tiền Thưởng.png",
                "Pháo Hoa Wild.png",
                "Quý Bà Say Rượu.png",
                "Quyết Chiến Tiền Thưởng.png",
                "Siêu Cấp ACE.png",
                "Wild Đạo Tặc.png",
            ];

            const result = rawList.map((fileName) => ({
                name: fileName.replace(".png", ""),
                percentage: Math.floor(Math.random() * (97 - 20 + 1)) + 20,
            }));

            return res.status(200).json({
                message: "Success",
                data: result,
                balance: user.balance,
            });
        }

        // Nếu là "SPRIBE", trả về danh sách game Spribe
        if (name === "SPRIBE ĐIỆN TỬ") {
            const rawList = [
                "Plinko.png",
                "Hilo.png",
                "Mini Roulette.png",
                "Keno.png",
                "Hotline.png",
                "Dice.png",
            ];

            const result = rawList.map((fileName) => ({
                name: fileName.replace(".png", ""),
                percentage: Math.floor(Math.random() * (97 - 20 + 1)) + 20,
            }));

            return res.status(200).json({
                message: "Success",
                data: result,
                balance: user.balance,
            });
        }

        // Nếu là "JL", trả về danh sách game JL
        if (name === "JILI ĐIỆN TỬ") {
            const rawList = [
                "Vương Bài Vô Hạn.png",
                "Tiền đến rồi.png",
                "Pháo Thủ Điên Cuồng.png",
                "Thượng Hải Ngọt Ngào.png",
                "Tim Vàng.png",
                "Siêu Cấp ACE.png",
                "Trâu Rừng Xung Phong.png",
                "Nhân Ngư Ngọt Ngào.png",
                "Quyền Vương.png",
                "Điên Cuồng 777.png",
                "Đế Quốc Hoàng Kim.png",
                "Bảo Vật Pharaoh.png",
                "Bảo Thạch Kala.png",
                "Bảng Phong Thần.png",
                "Ali Quán Ba Quán Ba.png",
            ];

            const result = rawList.map((fileName) => ({
                name: fileName.replace(".png", ""),
                percentage: Math.floor(Math.random() * (97 - 20 + 1)) + 20,
            }));

            return res.status(200).json({
                message: "Success",
                data: result,
                balance: user.balance,
            });
        }

        // Nếu là "KA", trả về danh sách game KA
        if (name === "KA ĐIỆN TỬ") {
            const rawList = [
                "Siêu Năng Lượng.png",
                "Zoombie Daoist Lock Chúc May Mắn.png",
                "Ngọn lửa siêu cấp.png",
                "Vận May Phát Tài.png",
                "Siêu Rồng Hổ.png",
                "Phần Thưởng Điên Cuồng.png",
                "Tứ Hải Long Vương.png",
                "Phần Thưởng Điên Cuồng Bản Cao Cấp.png",
                "May Mắn Phát Tài.png",
                "Trâu Vàng.png",
                "May Mắn 88.png",
                "Hổ Vàng Phát Tài.png",
                "Gannesha May Mắn.png",
                "Gà Trống.png",
                "Chậu Châu Báu.png",
            ];

            const result = rawList.map((fileName) => ({
                name: fileName.replace(".png", ""),
                percentage: Math.floor(Math.random() * (97 - 20 + 1)) + 20,
            }));

            return res.status(200).json({
                message: "Success",
                data: result,
                balance: user.balance,
            });
        }

        // Nếu là "TP", trả về danh sách game TP
        if (name === "TP ĐIỆN TỬ") {
            const rawList = [
                "Trò Chơi Màu Sắc 2.png",
                "Vịnh Cát Vàng.png",
                "Toucan Wild.png",
                "Thần Tài Phú Quý.png",
                "Tiệc Kẹo Ngọt.png",
                "TP Vinh Quang Của Zumas.png",
                "Thành Phố Vàng Maya 3.png",
                "Thần Tài Vàng 777.png",
                "Vua Đá Gà.png",
                "Tiệc Kim Cương.png",
                "Thần Tài Giáng Lâm.png",
                "Kẻ Cướp Ngân Hàng.png",
                "Rồng Thần Tìm Kho Báu 7.png",
                "Crazy 777.png",
                "Ngôi Sao May Mắn.png",
                "Mèo Phú Quí.png",
                "5x Kim Cương 7.png",
                "Nhảy Samba.png",
                "Thần Tài 777.png",
                "Lửa vàng bùng nổ 7.png",
                "Núi Vàng.png",
                "Kỳ Nghỉ Của Cún.png",
                "Nữ Pháp Sư Hoàng Kim.png",
                "Mạt Chược Phát Tài 2.png",
                "Phát Phát Phát.png",
            ];

            const result = rawList.map((fileName) => ({
                name: fileName.replace(".png", ""),
                percentage: Math.floor(Math.random() * (97 - 20 + 1)) + 20,
            }));

            return res.status(200).json({
                message: "Success",
                data: result,
                balance: user.balance,
            });
        }

        // Nếu là "PS", trả về danh sách game PS
        if (name === "PS ĐIỆN TỬ") {
            const rawList = [
                "Phong Cuồng 777.png",
                "Siêu Thắng.png",
                "Song Hỷ.png",
                "Thử Thách Lớn - Con Heo Vàng.png",
                "Thử Thách Lớn - Lịch Mayan.png",
                "Tiền Thưởng Siêu Cấp.png",
                "Tính Năng Mua - Tôi Thích Đến Từ Lợn.png",
                "Võ Thuật Thuỷ Mạc.png",
                "Zongzi Vàng.png",
                "Mạt Chược Fa Fa Fa.png",
                "Hoàng Thượng Cát Tường.png",
                "Gà Vàng Báo Hỷ.png",
                "Đặc Vụ Giỏi Giang.png",
                "Mua Tính Năng - Siêu Năng Lực.png",
                "Bậc Thầy Haha.png",
            ];

            const result = rawList.map((fileName) => ({
                name: fileName.replace(".png", ""),
                percentage: Math.floor(Math.random() * (97 - 20 + 1)) + 20,
            }));

            return res.status(200).json({
                message: "Success",
                data: result,
                balance: user.balance,
            });
        }

        // Nếu là "FC", trả về danh sách game FC
        if (name === "FC ĐIỆN TỬ") {
            const rawList = [
                "Hạt Đậu Thần.png",
                "Kim Linh Thần Đèn.png",
                "Ma Thuật Ghép.png",
                "Người Hùng Robin Hood.png",
                "Phú Ông.png",
                "Super Color Game.png",
                "Tầm Bảo Biển Lớn.png",
                "Tết Nguyên Đán.png",
                "Trâu Hoàng Điên Cuồng.png",
                "Bạo Kích Đường Mật.png",
                "Báo Vàng.png",
                "Cá Koi May May.png",
                "Cao Bồi Miền Tây.png",
                "Chợ Đêm.png",
                "Chúc Mừng Năm Mới 2.png",
                "Giàu Có Một Lần Nữa Và Một Lần Nữa.png",
                "Săn Tìm Kho Báu.png",
            ];

            const result = rawList.map((fileName) => ({
                name: fileName.replace(".png", ""),
                percentage: Math.floor(Math.random() * (97 - 20 + 1)) + 20,
            }));

            return res.status(200).json({
                message: "Success",
                data: result,
                balance: user.balance,
            });
        }

        // Nếu là "R88", trả về danh sách game R88
        if (name === "R88 ĐIỆN TỬ") {
            const rawList = [
                "Tài Lộc Đến.png",
                "Tài Lộc.png",
                "Tiền Tài.png",
                "To Lớn Con Vượn.png",
                "Multi Mega Bingo Bonanza.png",
                "Năm Mới Phát Tài.png",
                "Ngũ Bá.png",
                "Ngũ Phúc.png",
                "Nhảy Lên.png",
                "Nhảy.png",
                "777.png",
                "Đảo Phiêu Lưu.png",
                "Hành Tinh Đá Quý.png",
                "Khe Đôi.png",
                "Ma Mút.png",
                "Mặt Nạ Kịch.png",
            ];

            const result = rawList.map((fileName) => ({
                name: fileName.replace(".png", ""),
                percentage: Math.floor(Math.random() * (97 - 20 + 1)) + 20,
            }));

            return res.status(200).json({
                message: "Success",
                data: result,
                balance: user.balance,
            });
        }

        // Nếu là "PP", trả về danh sách game PP (Pragmatic Play)
        if (name === "PP ĐIỆN TỬ") {
            const rawList = [
                "Đá Quý Của Người Aztec.png",
                "Giáng Sinh May Mắn Ngọt Ngào.png",
                "Slot Trái Cây.png",
                "Sugar Rush Giáng Sinh.png",
                "Tê Giác Khổng Lồ Megaways.png",
                "Vận May Ngọt Ngào.png",
                "Vàng 888.png",
                "Vàng Thịnh Vượng.png",
                "Vua Trâu Megaways.png",
                "5 Chú Sư Tử Megaways.png",
                "888 Con Rồng.png",
                "Biển Lửa.png",
                "Chú Khỉ Điên Cuồng.png",
                "Công Chúa Ánh Sao.png",
                "Cổng Olympus.png",
            ];

            const result = rawList.map((fileName) => ({
                name: fileName.replace(".png", ""),
                percentage: Math.floor(Math.random() * (97 - 20 + 1)) + 20,
            }));

            return res.status(200).json({
                message: "Success",
                data: result,
                balance: user.balance,
            });
        }

        // Nếu là "PT", trả về danh sách game PT (Playtech)
        if (name === "PT ĐIỆN TỬ") {
            const rawList = [
                "Đại Chiến Trâu Rừng.png",
                "Hằng Nga.png",
                "Hành Trình Vàng.png",
                "Kho Báu Của Thuyền Trưởng.png",
                "Mộng Cá Heo.png",
                "Ngọn Lửa - Phù Thuỷ Áo Xanh Megaways.png",
                "Rồng Rồng Rồng.png",
                "Vua Đường Cao Tốc.png",
                "Vườn Thú Nhiệt Đới.png",
                "Ba Chú Khỉ.png",
                "Bầu Trời Của Nữ Vương.png",
                "Biển Xanh Sâu Thẳm.png",
                "Cá Rồng Vàng.png",
                "Con Gái Phraoh.png",
                "Cung Thủ.png",
            ];

            const result = rawList.map((fileName) => ({
                name: fileName.replace(".png", ""),
                percentage: Math.floor(Math.random() * (97 - 20 + 1)) + 20,
            }));

            return res.status(200).json({
                message: "Success",
                data: result,
                balance: user.balance,
            });
        }

        // Nếu là "FTG", trả về danh sách game FTG
        if (name === "FTG ĐIỆN TỬ") {
            const rawList = [
                "Thí Luyện Long Môn.png",
                "Thiên Đường Trái Cây.png",
                "Tuyệt Đỉnh Công Phu.png",
                "Đấu Trường Huyền Thoại.png",
                "King Kong Khổng Lổ.png",
                "Mạt Chược Ngưu Ngưu.png",
                "Nụ Cười Di Lặc.png",
                "Sinh Vật Cổ Đại.png",
                "Thần Linh Pháp Quyền.png",
                "Ảo Giác.png",
                "Bạch Xà Truyện.png",
                "Bầu Cua Tôm Cá Slot.png",
                "Cuộc Phiêu Lưu Bí Ẩn.png",
                "Đá Quý.png",
                "Đám Cưới Ngưu Ngưu.png",
            ];

            const result = rawList.map((fileName) => ({
                name: fileName.replace(".png", ""),
                percentage: Math.floor(Math.random() * (97 - 20 + 1)) + 20,
            }));

            return res.status(200).json({
                message: "Success",
                data: result,
                balance: user.balance,
            });
        }

        // Nếu là "MG", trả về danh sách game MG (Microgaming)
        if (name === "MG ĐIỆN TỬ") {
            const rawList = [
                "Đào Thoát DELUXE.png",
                "Đào Thoát Siêu Hạng.png",
                "Đào Thoát.png",
                "Kho Tàng Cổ Đại Poseidon Megaways.png",
                "Liên Kết Thần Kỳ Apollo.png",
                "Ngôi Sao Bóng Đá Deluxe.png",
                "Ngôi Sao Kép May Mắn Hoang Dại.png",
                "Siêu Sao Bóng Rổ.png",
                "4 Viên Kim Cương Xanh - Megaways.png",
                "9 Mặt Nạ Lửa HyperSpins.png",
                "10k Điều Ước.png",
                "777 Hoàn Toàn Sang Trọng.png",
                "Báu Vật Cổ Đại Zeus.png",
                "Cặp Song SInh May Mắn.png",
            ];

            const result = rawList.map((fileName) => ({
                name: fileName.replace(".png", ""),
                percentage: Math.floor(Math.random() * (97 - 20 + 1)) + 20,
            }));

            return res.status(200).json({
                message: "Success",
                data: result,
                balance: user.balance,
            });
        }

        // Nếu là "CQ9", trả về danh sách game CQ9
        if (name === "CQ9 ĐIỆN TỬ") {
            const rawList = [
                "Bầu Cua Tôm Cá Thái.png",
                "Cây Hái Ra Tiền.png",
                "Tài Xỉu Kiểu Thái.png",
                "Thần Sấm.png",
            ];

            const result = rawList.map((fileName) => ({
                name: fileName.replace(".png", ""),
                percentage: Math.floor(Math.random() * (97 - 20 + 1)) + 20,
            }));

            return res.status(200).json({
                message: "Success",
                data: result,
                balance: user.balance,
            });
        }

        // Nếu là "NE", trả về danh sách game NE (NetEnt)
        if (name === "NE ĐIỆN TỬ") {
            const rawList = [
                "Khỉ Đột Vàng.png",
                "Vụ Nổ Sao.png",
            ];

            const result = rawList.map((fileName) => ({
                name: fileName.replace(".png", ""),
                percentage: Math.floor(Math.random() * (97 - 20 + 1)) + 20,
            }));

            return res.status(200).json({
                message: "Success",
                data: result,
                balance: user.balance,
            });
        }

        // Nếu là "JDB", trả về danh sách game JDB
        if (name === "JDB ĐIỆN TỬ") {
            const rawList = [
                "Bát Châu Báu.png",
                "Siêu Bò Tót B - Bản Cao Cấp.png",
                "Siêu Bò Tót B.png",
                "Xúc Xắc Màu May Mắn.png",
            ];

            const result = rawList.map((fileName) => ({
                name: fileName.replace(".png", ""),
                percentage: Math.floor(Math.random() * (97 - 20 + 1)) + 20,
            }));

            return res.status(200).json({
                message: "Success",
                data: result,
                balance: user.balance,
            });
        }

        // Nếu là "HB", trả về danh sách game HB (Habanero)
        if (name === "HB ĐIỆN TỬ") {
            const rawList = [
                "Kỳ Lân Vàng.png",
                "Sư Tử Vui Vẻ.png",
            ];

            const result = rawList.map((fileName) => ({
                name: fileName.replace(".png", ""),
                percentage: Math.floor(Math.random() * (97 - 20 + 1)) + 20,
            }));

            return res.status(200).json({
                message: "Success",
                data: result,
                balance: user.balance,
            });
        }

        // Nếu là "BNG", trả về danh sách game BNG (Booongo)
        if (name === "BNG ĐIỆN TỬ") {
            const rawList = [
                "Tarzan - Tập Hồng Vận.png",
                "Viên Kẹo Bùng Nổ.png",
            ];

            const result = rawList.map((fileName) => ({
                name: fileName.replace(".png", ""),
                percentage: Math.floor(Math.random() * (97 - 20 + 1)) + 20,
            }));

            return res.status(200).json({
                message: "Success",
                data: result,
                balance: user.balance,
            });
        }

        // Nếu là "GEM", trả về danh sách game GEM
        if (name === "GEM ĐIỆN TỬ") {
            const rawList = [
                "Mines.png",
                "Plinko.png",
            ];

            const result = rawList.map((fileName) => ({
                name: fileName.replace(".png", ""),
                percentage: Math.floor(Math.random() * (97 - 20 + 1)) + 20,
            }));

            return res.status(200).json({
                message: "Success",
                data: result,
                balance: user.balance,
            });
        }

        // Nếu là "VA", trả về danh sách game VA
        if (name === "VA ĐIỆN TỬ") {
            const rawList = [
                "Tự Rút Mạt Chược 2.png",
                "Tự Rút Mạt Chược.png",
            ];

            const result = rawList.map((fileName) => ({
                name: fileName.replace(".png", ""),
                percentage: Math.floor(Math.random() * (97 - 20 + 1)) + 20,
            }));

            return res.status(200).json({
                message: "Success",
                data: result,
                balance: user.balance,
            });
        }

        // Nếu là "T1", trả về danh sách game T1
        if (name === "T1 ĐIỆN TỬ") {
            const rawList = [
                "Limbo.png",
                "Mine.png",
            ];

            const result = rawList.map((fileName) => ({
                name: fileName.replace(".png", ""),
                percentage: Math.floor(Math.random() * (97 - 20 + 1)) + 20,
            }));

            return res.status(200).json({
                message: "Success",
                data: result,
                balance: user.balance,
            });
        }

        // Nếu là "AFB", trả về danh sách game AFB
        if (name === "AFB ĐIỆN TỬ") {
            const rawList = [
                "Đắm Mình Trong Tiền.png",
            ];

            const result = rawList.map((fileName) => ({
                name: fileName.replace(".png", ""),
                percentage: Math.floor(Math.random() * (97 - 20 + 1)) + 20,
            }));

            return res.status(200).json({
                message: "Success",
                data: result,
                balance: user.balance,
            });
        }

        // Nếu là "NS", trả về danh sách game NS
        if (name === "NS ĐIỆN TỬ") {
            const rawList = [
                "Roma.png",
            ];

            const result = rawList.map((fileName) => ({
                name: fileName.replace(".png", ""),
                percentage: Math.floor(Math.random() * (97 - 20 + 1)) + 20,
            }));

            return res.status(200).json({
                message: "Success",
                data: result,
                balance: user.balance,
            });
        }

        // Nếu là "MW", trả về danh sách game MW
        if (name === "MW ĐIỆN TỬ") {
            const rawList = [
                "Cú Đánh Mạt Chược.png",
            ];

            const result = rawList.map((fileName) => ({
                name: fileName.replace(".png", ""),
                percentage: Math.floor(Math.random() * (97 - 20 + 1)) + 20,
            }));

            return res.status(200).json({
                message: "Success",
                data: result,
                balance: user.balance,
            });
        }

        // Nếu là "YB", trả về danh sách game YB
        if (name === "YB ĐIỆN TỬ") {
            const rawList = [
                "Money Horse.png",
            ];

            const result = rawList.map((fileName) => ({
                name: fileName.replace(".png", ""),
                percentage: Math.floor(Math.random() * (97 - 20 + 1)) + 20,
            }));

            return res.status(200).json({
                message: "Success",
                data: result,
                balance: user.balance,
            });
        }

        // Nếu là "ASKME", trả về danh sách game ASKME
        if (name === "ASKME ĐIỆN TỬ") {
            const rawList = [
                "Government Disco.png",
            ];

            const result = rawList.map((fileName) => ({
                name: fileName.replace(".png", ""),
                percentage: Math.floor(Math.random() * (97 - 20 + 1)) + 20,
            }));

            return res.status(200).json({
                message: "Success",
                data: result,
                balance: user.balance,
            });
        }

        // Nếu là "RTG", trả về danh sách game RTG
        if (name === "RTG ĐIỆN TỬ") {
            const rawList = [
                "T-Rex.png",
            ];

            const result = rawList.map((fileName) => ({
                name: fileName.replace(".png", ""),
                percentage: Math.floor(Math.random() * (97 - 20 + 1)) + 20,
            }));

            return res.status(200).json({
                message: "Success",
                data: result,
                balance: user.balance,
            });
        }

        return res.status(400).json({ message: "Invalid name or unsupported category" });

    } catch (error) {
        console.error("❌ Error in handlePercentageLog:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};