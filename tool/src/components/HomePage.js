import React, { useState } from "react";
import axios from "axios";
import bannerDesktop from "../assets/banner-desktop.png";
import bannerMobile from "../assets/banner-mobile.png";
import logoBig from "../assets/logo-big.png";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import {
    FaUserPlus,
    FaSignInAlt,
    FaTelegramPlane,
    FaGamepad,
} from "react-icons/fa";

const Logo = () => (
    <div>
        <img src={logoBig} alt="Logo" className="h-auto mx-auto" />
    </div>
);

const FormModal = ({ type, onClose, onSwitch }) => {
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const [registerData, setRegisterData] = useState({
        username: "",
        phone: "",
        zalo: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://103.167.89.103:3001/api/login", loginData);
            const { token } = res.data;
            localStorage.setItem("token", token);
            toast.success("Đăng nhập thành công!");

            onClose();

            // ⏳ Chờ 3 giây rồi chuyển hướng
            setTimeout(() => {
                navigate("/home");
            }, 4000); // 3000ms = 3 giây
        } catch (err) {
            console.log("Server response:", err?.response?.data);
            toast.error(err?.response?.data?.message || "Đăng nhập thất bại!");
        }
    };


    const handleRegister = async (e) => {
        e.preventDefault();
        if (registerData.password !== registerData.confirmPassword) {
            return toast.warning("Mật khẩu không khớp!");
        }
        try {
            await axios.post("http://103.167.89.103:3001/api/register", registerData);
            toast.success("Đăng ký thành công!");
            setRegisterData({
                username: "",
                phone: "",
                zalo: "",
                password: "",
                confirmPassword: "",
            });
            // ⏳ Chờ 2 giây trước khi chuyển sang form login
            setTimeout(() => {
                onSwitch("login");
            }, 4000);
        } catch (err) {
            console.log("Server response:", err?.response?.data);
            toast.error(err?.response?.data?.message || "Đăng ký thất bại!");
        }
    };


    return (
        <div className="fixed inset-0 bg-black/60 flex items-center p-6 md:p-0 shadow-lg justify-center z-50">
            <div className="bg-[#50418a] rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-8 animate-fade-in">
                <h2 className="text-2xl font-semibold text-center text-gray-200">
                    {type === "login" ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"}
                </h2>
                <form className="space-y-4">
                    {type === "login" ? (
                        <>
                            <input
                                type="text"
                                placeholder="Tài khoản"
                                value={loginData.username}
                                onChange={(e) =>
                                    setLoginData({ ...loginData, username: e.target.value })
                                }
                                className="w-full bg-[#76708c] px-4 py-2 border border-gray-300 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                value={loginData.password}
                                onChange={(e) =>
                                    setLoginData({ ...loginData, password: e.target.value })
                                }
                                className="w-full px-4 py-2 bg-[#76708c] border border-gray-300 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <label className="flex items-center gap-2 text-sm text-gray-200">
                                <input type="checkbox" /> Ghi nhớ đăng nhập
                            </label>
                            <div className="flex justify-between gap-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="w-1/2 py-2 rounded-lg bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-800 font-normal"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleLogin}
                                    className="w-1/2 py-2 rounded-lg cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-normal"
                                >
                                    Đăng nhập
                                </button>
                            </div>
                            <p className="text-sm text-center text-gray-200">
                                Chưa có tài khoản?{' '}
                                <span
                                    onClick={() => onSwitch("register")}
                                    className="text-blue-300 cursor-pointer hover:underline"
                                >
                                    Đăng ký
                                </span>
                            </p>
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                placeholder="Tài khoản"
                                value={registerData.username}
                                onChange={(e) =>
                                    setRegisterData({ ...registerData, username: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            <input
                                type="text"
                                placeholder="Số điện thoại"
                                value={registerData.phone}
                                onChange={(e) =>
                                    setRegisterData({ ...registerData, phone: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            <input
                                type="text"
                                placeholder="Zalo / Telegram"
                                value={registerData.zalo}
                                onChange={(e) =>
                                    setRegisterData({ ...registerData, zalo: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                value={registerData.password}
                                onChange={(e) =>
                                    setRegisterData({ ...registerData, password: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            <input
                                type="password"
                                placeholder="Nhập lại mật khẩu"
                                value={registerData.confirmPassword}
                                onChange={(e) =>
                                    setRegisterData({ ...registerData, confirmPassword: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            <div className="flex justify-between gap-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="w-1/2 py-2 rounded-lg bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-800 font-semibold"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleRegister}
                                    className="w-1/2 py-2 rounded-lg bg-[#5718ea] hover:bg-[#5828c7] cursor-pointer text-white font-semibold"
                                >
                                    Đăng ký
                                </button>
                            </div>
                            <p className="text-sm text-center text-gray-200">
                                Đã có tài khoản?{' '}
                                <span
                                    onClick={() => onSwitch("login")}
                                    className="text-blue-300 cursor-pointer hover:underline"
                                >
                                    Đăng nhập
                                </span>
                            </p>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

const ContactLinks = ({ className = "mt-8" }) => (
    <div
        className={`flex flex-col items-center justify-center space-y-3 ${className}`}
    >
        <a
            href="https://t.me/minhquanroyal"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-2 bg-white/80 hover:bg-white text-blue-800 font-medium rounded-lg shadow transition-all duration-300"
        >
            <FaTelegramPlane className="text-blue-600 text-lg" />
            <span className="no-underline">Telegram hỗ trợ cấp xu</span>
        </a>
        <a
            href="https://qeyat.qq0011.com/register.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-2 bg-white/80 hover:bg-white text-purple-800 font-medium rounded-lg shadow transition-all duration-300"
        >
            <FaGamepad className="text-purple-600 text-lg" />
            <span className="no-underline">Link cổng game</span>
        </a>
    </div>
);

const HomePage = () => {
    const [formType, setFormType] = useState(null);

    return (
        <div className="h-screen w-full bg-no-repeat bg-cover bg-center relative">
            {formType && (
                <FormModal
                    type={formType}
                    onClose={() => setFormType(null)}
                    onSwitch={(type) => setFormType(type)}
                />
            )}
            <div
                className="h-full w-full bg-no-repeat bg-cover bg-center"
                style={{ backgroundImage: `url(${bannerMobile})` }}
            >
                <div
                    className="hidden md:block h-full w-full bg-no-repeat bg-cover bg-center"
                    style={{ backgroundImage: `url(${bannerDesktop})` }}
                >
                    <div className="flex items-center justify-center h-full">
                        <div className="p-6 rounded-xl shadow-lg max-w-2xl w-full space-y-6 text-center">
                            <Logo />
                            <div className="space-x-20 mt-12">
                                <button
                                    onClick={() => setFormType("login")}
                                    className="bg-[#3b9dfe] hover:bg-[#3a708d] cursor-pointer text-white px-6 py-3 rounded-lg font-normal text-xl inline-flex items-center gap-3 shadow transition-colors duration-300"
                                >
                                    <FaSignInAlt size={20} />
                                    Đăng nhập
                                </button>
                                <button
                                    onClick={() => setFormType("register")}
                                    className="bg-[#3b9dfe] hover:bg-[#336d97] cursor-pointer text-white px-6 py-3 rounded-lg font-normal text-xl inline-flex items-center gap-3 shadow transition-colors duration-300"
                                >
                                    <FaUserPlus size={20} />
                                    Đăng ký
                                </button>
                            </div>
                            <ContactLinks />
                        </div>
                    </div>
                </div>
                <div className="block md:hidden h-full w-full flex items-center justify-center">
                    <div className="p-6 rounded-xl shadow-md text-center space-y-6 max-w-sm w-full">
                        <Logo />
                        <div className="space-y-4">
                            <button
                                onClick={() => setFormType("register")}
                                className="bg-[#3b9dfe] hover:bg-[#336d97] text-white w-full py-3 rounded-lg text-sm inline-flex justify-center items-center gap-3 transition-all duration-300 shadow"
                            >
                                <FaUserPlus size={20} />
                                Đăng ký
                            </button>
                            <button
                                onClick={() => setFormType("login")}
                                className="bg-[#3b9dfe] hover:bg-[#3a708d] text-white w-full py-3 rounded-lg text-sm inline-flex justify-center items-center gap-3 transition-all duration-300 shadow"
                            >
                                <FaSignInAlt size={20} />
                                Đăng nhập
                            </button>
                        </div>
                        <ContactLinks className="mt-4" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
