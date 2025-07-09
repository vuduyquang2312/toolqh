import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import logoBig from "../assets/logo-big.png";
import bannerDesktop from "../assets/banner-desktop.png";
import bannerMobile from "../assets/banner-mobile.png";
import TopupForm from "../components/TopupForm";
import Sidebar from "../components/Sidebar";
import useUserProfile from "../hooks/useUserProfile";
import { useEffect } from "react";
import axios from "axios";

import {
    FaBars,
    FaCoins,
    FaSignOutAlt,
    FaPlusCircle,
    FaUser,
    FaArrowLeft,
} from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";

const SlotDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { name } = location.state || {};

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showTopup, setShowTopup] = useState(false);
    const [percentageData, setPercentageData] = useState([]);

    const { username, balance } = useUserProfile();

    useEffect(() => {
        let interval;

        const sendLogToServer = async () => {
            const isReady =
                username && username !== "Đang tải..." &&
                name && id;

            if (!isReady) return;

            try {
                const res = await axios.post("https://khunggiomayman.com/api/percentage", {
                    username,
                    name,
                    slotId: id,
                    timestamp: new Date().toISOString(),
                });

                if (res.data?.data) {
                    setPercentageData(res.data.data);
                }
            } catch (error) {
                console.error("❌ Error sending log:", error.message);
            }
        };

        // Gửi lần đầu tiên
        sendLogToServer();

        // Sau mỗi 30s thì gửi tiếp
        interval = setInterval(sendLogToServer, 30000);

        // Clear interval khi component unmount
        return () => clearInterval(interval);
    }, [username, name, id]);

    // Hàm để lấy phần trăm cho một trò chơi cụ thể
    const getPercentageForGame = (gameName) => {
        const gameData = percentageData.find(item => item.name === gameName);
        return gameData ? gameData.percentage : 0;
    };

    // Hàm để lấy màu text dựa trên tỉ lệ %
    const getPercentageColor = (percentage) => {
        if (percentage < 30) {
            return "text-white";
        } else if (percentage >= 30 && percentage < 70) {
            return "text-red-500";
        } else {
            return "text-green-500";
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    // Tất cả danh sách game images cho các categories
    const gameImageLists = {
        // PG2 ĐIỆN TỬ
        pg: [
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
        ],
        // SPRIBE
        spribe: [
            "Plinko.png",
            "Hilo.png",
            "Mini Roulette.png",
            "Keno.png",
            "Hotline.png",
            "Dice.png",
        ],
        // JL
        jl: [
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
        ],
        // KA
        ka: [
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
        ],
        // TP
        tp: [
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
        ],
        // PS
        ps: [
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
        ],
        // FC
        fc: [
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
        ],
        // R88
        r88: [
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
        ],
        // PP (Pragmatic Play)
        pp: [
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
        ],
        // PT (Playtech)
        pt: [
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
        ],
        // FTG
        ftg: [
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
        ],
        // MG (Microgaming)
        mg: [
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
        ],
        // CQ9
        cq9: [
            "Bầu Cua Tôm Cá Thái.png",
            "Cây Hái Ra Tiền.png",
            "Tài Xỉu Kiểu Thái.png",
            "Thần Sấm.png",
        ],
        // NE (NetEnt)
        ne: [
            "Khỉ Đột Vàng.png",
            "Vụ Nổ Sao.png",
        ],
        // JDB
        jdb: [
            "Bát Châu Báu.png",
            "Siêu Bò Tót B - Bản Cao Cấp.png",
            "Siêu Bò Tót B.png",
            "Xúc Xắc Màu May Mắn.png",
        ],
        // HB (Habanero)
        hb: [
            "Kỳ Lân Vàng.png",
            "Sư Tử Vui Vẻ.png",
        ],
        // BNG (Booongo)
        bng: [
            "Tarzan - Tập Hồng Vận.png",
            "Viên Kẹo Bùng Nổ.png",
        ],
        // GEM
        gem: [
            "Mines.png",
            "Plinko.png",
        ],
        // VA
        va: [
            "Tự Rút Mạt Chược 2.png",
            "Tự Rút Mạt Chược.png",
        ],
        // T1
        t1: [
            "Limbo.png",
            "Mine.png",
        ],
        // AFB
        afb: [
            "Đắm Mình Trong Tiền.png",
        ],
        // NS
        ns: [
            "Roma.png",
        ],
        // MW
        mw: [
            "Cú Đánh Mạt Chược.png",
        ],
        // YB
        yb: [
            "Money Horse.png",
        ],
        // ASKME
        askme: [
            "Government Disco.png",
        ],
        // RTG
        rtg: [
            "T-Rex.png",
        ],
    };

    // Mapping folder names cho từng category
    const folderMapping = {
        pg: "pg2",
        spribe: "spribe",
        jl: "jili",
        ka: "ka",
        tp: "tp",
        ps: "ps",
        fc: "fc",
        r88: "r88",
        pp: "pp",
        pt: "pt",
        ftg: "ftg",
        mg: "mg",
        cq9: "cq9",
        ne: "ne",
        jdb: "jdb",
        hb: "hb",
        bng: "bng",
        gem: "gem",
        va: "va",
        t1: "t1",
        afb: "afb",
        ns: "ns",
        mw: "mw",
        yb: "yb",
        askme: "askme",
        rtg: "rtg",
    };

    // Lấy danh sách ảnh và thư mục dựa trên ID
    const getImageConfig = () => {
        const imageList = gameImageLists[id] || [];
        const folder = folderMapping[id] || "";
        return { imageList, folder };
    };

    const { imageList, folder } = getImageConfig();

    const renderGameGrid = () => {
        if (!imageList.length) {
            return (
                <div className="text-center text-white text-xl">
                    Không tìm thấy games cho category này
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mt-6">
                {imageList.map((img, index) => {
                    const imageName = img.replace(".png", "");
                    const percentage = getPercentageForGame(imageName);
                    const percentageColor = getPercentageColor(percentage);

                    return (
                        <div
                            key={index}
                            className="bg-black/40 p-4 rounded-lg shadow border border-gray-600 text-white"
                        >
                            {/* Ảnh và circleWinrate */}
                            <div className="flex justify-center items-center gap-4 mb-4">
                                {/* Hình ảnh trò chơi */}
                                <img
                                    src={`/${folder}/${img}`}
                                    alt={imageName}
                                    className="w-28 h-28 object-contain bg-black/30 p-2 rounded"
                                    onError={(e) => {
                                        // Fallback image nếu không tìm thấy
                                        e.target.src = "/default-game.png";
                                    }}
                                />

                                {/* Winrate: vòng quay + phần trăm */}
                                <div className="relative w-28 h-28">
                                    {/* Ảnh quay */}
                                    <img
                                        src={require("../assets/circleWinrate.png")}
                                        alt="Winrate"
                                        className="w-full h-full object-contain animate-[spin-slow_3s_linear_infinite]"
                                    />

                                    {/* Phần trăm hiển thị chính giữa với màu tương ứng */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className={`${percentageColor} font-bold text-2xl`}>
                                            {percentage}%
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Graph ảnh 1 với tên ảnh đè lên */}
                            <div className="relative w-full h-20">
                                <img
                                    src={require("../assets/graph-1.png")}
                                    alt="Graph 1"
                                    className="w-full h-20 rounded"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white text-lg font-semibold text-center px-1">
                                        {imageName}
                                    </span>
                                </div>
                            </div>

                            {/* Graph ảnh 2 với phần trăm nằm đè lên ảnh */}
                            <div className="relative w-full h-12">
                                {/* Ảnh nền biểu đồ */}
                                <img
                                    src={require("../assets/graph-1.png")}
                                    alt="Graph 2"
                                    className="w-full h-12 rounded"
                                />

                                {/* Thanh tiến trình phần trăm nằm đè lên */}
                                <div className="absolute inset-0 flex items-center px-2">
                                    <div className="w-full h-12 bg-gray-800 rounded overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-white text-xs font-semibold flex items-center justify-center transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        >
                                            <span className="text-center text-base w-full">
                                                {percentage}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div
            className="h-screen w-full text-white relative overflow-auto bg-no-repeat bg-cover bg-center"
            style={{
                backgroundImage: `url(${window.innerWidth >= 768 ? bannerDesktop : bannerMobile})`,
            }}
        >
            {/* Overlay nếu cần làm mờ nền */}
            <div className="absolute inset-0 bg-black/60 z-0" />

            {/* Header */}
            <header className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 md:px-12 bg-black/50 z-10">
                <img src={logoBig} alt="Logo" className="h-12 md:h-16" />
                <div className="hidden md:flex items-center space-x-16 text-sm md:text-xl">
                    <span><FaUser className="inline mr-1" /> {username}</span>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowTopup(true);
                        }}
                        className="hover:underline flex items-center gap-1"
                    >
                        <FaPlusCircle /> Nạp xu
                    </a>
                    <span><FaCoins className="inline mr-1" /> Xu: {balance}</span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                    >
                        <FaSignOutAlt /> Đăng xuất
                    </button>
                </div>
                {/* Mobile icon */}
                <div className="block md:hidden">
                    <button onClick={() => setIsSidebarOpen(true)}>
                        <FaBars className="text-white text-2xl" />
                    </button>
                </div>
            </header>

            {/* Sidebar */}
            {isSidebarOpen && (
                <Sidebar
                    username={username}
                    balance={balance}
                    onClose={() => setIsSidebarOpen(false)}
                    onTopup={() => setShowTopup(true)}
                    onLogout={handleLogout}
                />
            )}

            {/* Nội dung chính */}
            <div className="relative h-full flex flex-col items-center justify-start pt-24 md:pt-28 px-0 md:p-4 z-10">
                {/* Card nội dung */}
                <div className="relative w-full bg-black/60 rounded-lg border border-gray-600 p-6 text-center space-y-6">
                    {/* Nút quay lại */}
                    <button
                        onClick={() => navigate("/home")}
                        className="flex items-center text-white border border-gray-200 bg-black/70 hover:bg-black/90 rounded-md px-4 py-2 cursor-pointer"
                    >
                        <FaArrowLeft className="text-xl mr-4" />Quay lại
                    </button>

                    <div className="text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            {name || "Game Category"}
                        </h2>
                    </div>

                    {renderGameGrid()}
                </div>
            </div>

            {showTopup && <TopupForm onClose={() => setShowTopup(false)} />}
        </div>
    );
};

export default SlotDetail;