import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const LoginModal = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://khunggiomayman.com/api/login", formData);
            const profileRes = await axios.get("https://khunggiomayman.com/api/profile", {

                headers: { Authorization: token },
            });

            if (profileRes.data.isBanned) {
                toast.error("Tài khoản đã bị khóa!");
                localStorage.removeItem("token");
                return;
            }

            toast.success("Đăng nhập thành công!");
            navigate("/home");
            const { token } = res.data;
            localStorage.setItem("token", token);

            // Gọi API profile để kiểm tra nếu bị khóa thì hủy token và quay lại

        } catch (err) {
            console.error("Lỗi:", err.response?.data);
            toast.error(err?.response?.data?.message || "Đăng nhập thất bại!");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-8 w-full max-w-md space-y-4 shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">ĐĂNG NHẬP</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Tài khoản"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Mật khẩu"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />

                    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" className="accent-blue-600" /> Ghi nhớ đăng nhập
                    </label>

                    <div className="flex justify-between gap-4 mt-4">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="flex-1 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Đăng nhập
                        </button>
                    </div>
                </form>

                <div className="text-sm text-center mt-2 text-gray-700">
                    Chưa có tài khoản?{" "}
                    <a href="/register" className="text-blue-600 underline">
                        Đăng ký
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
