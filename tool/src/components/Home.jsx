import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bannerDesktop from "../assets/banner-desktop.png";
import bannerMobile from "../assets/banner-mobile.png";
import logoBig from "../assets/logo-big.png";
import TopupForm from "../components/TopupForm";
import { toast } from "react-toastify";
import {
    FaBars,
    FaCoins,
    FaSignOutAlt,
    FaPlusCircle,
    FaUser,
} from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";

const Home = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("Đang tải...");
    const [balance, setBalance] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showTopup, setShowTopup] = useState(false);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }


        fetch("http://localhost:3001/api/profile", {
            headers: { Authorization: token },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.isBanned) {
                    toast.error("Tài khoản của bạn đã bị khóa.");
                    localStorage.removeItem("token");
                    navigate("/");
                    return;
                }

                setUsername(data.username);
                setBalance(data.balance || 0);

                // Lấy danh sách ảnh
                fetch("http://localhost:3001/api/images", {
                    headers: { Authorization: token }, // Nếu backend cần Bearer thì thêm Bearer ở đây
                })
                    .then((res) => res.json())
                    .then((imageList) => {
                        setImages(imageList);
                    })
                    .catch((err) => {
                        console.error("❌ Lỗi khi lấy ảnh:", err);
                    });
            })
            .catch((err) => {
                console.error("Lỗi lấy thông tin:", err);
                navigate("/");
            });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    // Hàm xử lý click vào ảnh game
    const handleGameClick = (img) => {
        // Kiểm tra balance trước khi cho phép truy cập
        if (balance <= 0) {
            toast.error("Bạn không đủ số dư để sử dụng, vui lòng chọn phương thức nạp xu!");
            setShowTopup(true); // Mở form nạp xu
            return;
        }

        // Nếu có đủ balance, cho phép truy cập
        const id = img.file.replace(".png", "");
        navigate(`/slot/${id}`, { state: { name: img.name } });
    };

    const renderImageGallery = () => {
        const baseURL = "http://localhost:3001/images";
        const images = [
            { name: "PG2 ĐIỆN TỬ", file: "pg.png" },
            { name: "SPRIBE ĐIỆN TỬ", file: "spribe.png" },
            { name: "JILI ĐIỆN TỬ", file: "jl.png" },
            { name: "KA ĐIỆN TỬ", file: "ka.png" },
            { name: "TP ĐIỆN TỬ", file: "tp.png" },
            { name: "PS ĐIỆN TỬ", file: "ps.png" },
            { name: "FC ĐIỆN TỬ", file: "fc.png" },
            { name: "R88 ĐIỆN TỬ", file: "r88.png" },
            { name: "PP ĐIỆN TỬ", file: "pp.png" },
            { name: "PT ĐIỆN TỬ", file: "pt.png" },
            { name: "FTG ĐIỆN TỬ", file: "ftg.png" },
            { name: "MG ĐIỆN TỬ", file: "mg.png" },
            { name: "CQ9 ĐIỆN TỬ", file: "cq9.png" },
            { name: "NE ĐIỆN TỬ", file: "ne.png" },
            { name: "JDB ĐIỆN TỬ", file: "jdb.png" },
            { name: "HB ĐIỆN TỬ", file: "hb.png" },
            { name: "BNG ĐIỆN TỬ", file: "bng.png" },
            { name: "GEM ĐIỆN TỬ", file: "gem.png" },
            { name: "VA ĐIỆN TỬ", file: "va.png" },
            { name: "T1 ĐIỆN TỬ", file: "t1.png" },
            { name: "AFB ĐIỆN TỬ", file: "afb.png" },
            { name: "NS ĐIỆN TỬ", file: "ns.png" },
            { name: "MW ĐIỆN TỬ", file: "mw.png" },
            { name: "YB ĐIỆN TỬ", file: "yb.png" },
            { name: "ASKME ĐIỆN TỬ", file: "askme.png" },
            { name: "RTG ĐIỆN TỬ", file: "rtg.png" },
        ];

        return (
            <div className="w-full max-h-[70vh] overflow-y-auto px-4 border border-gray-700 bg-black/50 rounded-lg custom-scrollbar">
                {/* SLOT title - đưa ra ngoài grid */}
                <div className="flex justify-center relative mb-6">
                    <img
                        src={require('../assets/title.png')}
                        alt="SLOT Background"
                        className="w-64 max-w-xs md:max-w-md"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-white text-xl md:text-2xl font-bold tracking-widest">SLOT</h2>
                    </div>
                </div>

                {/* Grid ảnh */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-2">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center bg-black/30 rounded-lg p-2"
                        >
                            <div className="w-80% aspect-square border border-gray-200 p-2 overflow-hidden rounded-md">
                                <img
                                    src={`${baseURL}/${img.file}`}
                                    alt={img.name}
                                    className="w-40 h-40 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={() => handleGameClick(img)}
                                />
                            </div>
                            <p className="text-white text-sm text-center mt-2">{img.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="h-screen w-full bg-no-repeat bg-cover bg-center relative overflow-auto">
            {/* Header */}
            <header className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 md:px-12 bg-black/50 z-10">
                <img src={logoBig} alt="Logo" className="h-12 md:h-16" />
                <div className="hidden md:flex items-center space-x-16 text-white text-sm md:text-xl">
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
                <div className="fixed top-0 right-0 w-64 h-full bg-[#1e1e2f] shadow-lg z-50 p-6 space-y-4 text-white animate-slide-in">
                    <div className="text-right">
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="text-gray-400 hover:text-white text-lg"
                        >
                            ✕
                        </button>
                    </div>
                    <p><FaUser className="inline mr-2" /> {username}</p>
                    <p><FaCoins className="inline mr-2" /> Xu: {balance}</p>
                    <button
                        onClick={() => {
                            setIsSidebarOpen(false); // đóng sidebar
                            setShowTopup(true);      // mở form nạp xu
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2 justify-center"
                    >
                        <FaPlusCircle /> Nạp xu
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex items-center gap-2 justify-center"
                    >
                        <FaSignOutAlt /> Đăng xuất
                    </button>
                </div>
            )}

            {/* Backgrounds */}
            <div
                className="h-full w-full bg-no-repeat bg-cover bg-center"
                style={{ backgroundImage: `url(${bannerMobile})` }}
            >
                {/* Desktop */}
                <div
                    className="hidden md:block h-full w-full bg-no-repeat bg-cover bg-center"
                    style={{ backgroundImage: `url(${bannerDesktop})` }}
                >
                    <div className="flex flex-col items-center justify-start pt-40 md:pt-52 px-4">
                        {renderImageGallery()}
                    </div>
                </div>

                {/* Mobile */}
                <div className="block md:hidden flex flex-col items-center justify-start pt-36 px-4">
                    {renderImageGallery()}
                </div>
            </div>
            {showTopup && <TopupForm onClose={() => setShowTopup(false)} />}
        </div>
    );
};

export default Home;