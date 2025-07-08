import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // nếu dùng toast

const TopupForm = ({ onClose }) => {
    const [username, setUsername] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username.trim()) {
            return toast.error("Vui lòng nhập tên tài khoản đã đăng ký!");
        }

        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "http://103.167.89.103:3001/api/topup",
                { username },
                { headers: { Authorization: token } }
            );

            toast.success("Gửi yêu cầu nạp xu thành công!");
            onClose();
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Gửi yêu cầu thất bại");
        }
    }
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/60 z-[1000] flex items-center justify-center backdrop-blur-sm">
            <div className="bg-[#262837] rounded-2xl p-6 w-[90%] max-w-md shadow-2xl relative border border-gray-200 animate-fade-in">
                {/* Tiêu đề */}
                <h2 className="text-2xl font-semibold text-center text-gray-200 mb-4">
                    💸 Yêu cầu nạp xu
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-4">
                            Tên tài khoản đã đăng ký
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nhập tên tài khoản"
                            className="w-full px-4 py-2 border text-gray-200 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                    >
                        🚀 Gửi yêu cầu
                    </button>
                </form>

                {/* Hướng dẫn đăng ký */}
                <div className="mt-6 text-center text-sm text-gray-100 space-y-4 leading-relaxed">
                    <p className="text-gray-200">
                        💰 <span className="font-semibold">Xu được quy đổi 1:1</span> — Ví dụ: Nạp <span className="font-bold text-green-300">100k</span> sẽ nhận <span className="font-bold text-green-300">100 xu</span>.
                    </p>
                    <p className="text-gray-300">
                        ⏱️ Hệ thống xử lý trong <span className="font-semibold text-yellow-300">3–5 phút</span>. Nếu quá thời gian, vui lòng{" "}
                        <a
                            href="https://t.me/minhquanroyal" // ← Thay bằng link của bạn
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 underline hover:text-blue-300"
                        >
                            LIÊN HỆ ADMIN
                        </a>{" "}
                        để được hỗ trợ nhanh chóng.
                    </p>
                    <p className="text-gray-200">
                        ❗ Nếu bạn chưa có tài khoản, vui lòng đăng ký tại liên kết bên dưới:
                    </p>

                    <a
                        href="https://qeyat.qq0011.com/register.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-5 py-2.5 bg-[#598d71] text-white rounded-md hover:bg-[#4b7e62] transition font-medium"
                    >
                        📝 Đăng ký tài khoản
                    </a>
                </div>



                {/* Nút đóng */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 cursor-pointer hover:text-red-600 text-xl font-bold"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default TopupForm;
