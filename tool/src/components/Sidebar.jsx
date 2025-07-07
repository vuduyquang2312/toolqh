import React from "react";
import {
  FaCoins,
  FaPlusCircle,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

const Sidebar = ({ username, balance, onClose, onTopup, onLogout }) => {
  return (
    <div className="fixed top-0 right-0 w-64 h-full bg-[#1e1e2f] shadow-lg z-50 p-6 space-y-4 text-white animate-slide-in">
      <div className="text-right">
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white text-lg"
        >
          ✕
        </button>
      </div>
      <p><FaUser className="inline mr-2" /> {username}</p>
      <p><FaCoins className="inline mr-2" /> Xu: {balance}</p>
      <button
        onClick={() => {
          onClose();
          onTopup();
        }}
        className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2 justify-center"
      >
        <FaPlusCircle /> Nạp xu
      </button>

      <button
        onClick={onLogout}
        className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex items-center gap-2 justify-center"
      >
        <FaSignOutAlt /> Đăng xuất
      </button>
    </div>
  );
};

export default Sidebar;
