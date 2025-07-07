import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-gray-800 text-white p-4">
                <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
                <nav className="space-y-2">
                    <Link to="/admin" className="block hover:underline">Trang chủ</Link>
                    <Link to="/admin/users" className="block hover:underline">Người dùng</Link>
                    <Link to="/admin/settings" className="block hover:underline">Cài đặt</Link>
                </nav>
            </aside>
            <main className="flex-1 p-6 bg-gray-100">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
