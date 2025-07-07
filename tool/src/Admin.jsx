// src/Admin.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./admin/pages/AdminLayout";
import Main from "./admin/pages/Main";
import Users from "./admin/pages/Users";
import Settings from "./admin/pages/Settings";

const Admin = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminLayout />}>
                <Route index element={<Main />} />
                <Route path="users" element={<Users />} />
                <Route path="settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/admin" />} />
            </Route>
        </Routes>
    );
};

export default Admin;
