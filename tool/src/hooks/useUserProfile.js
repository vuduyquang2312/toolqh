import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useUserProfile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Đang tải...");
  const [balance, setBalance] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    fetch("https://khunggiomayman.com/api/profile", {
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

        // Fetch ảnh
        fetch("https://khunggiomayman.com/api/images", {
          headers: { Authorization: token },
        })
          .then((res) => res.json())
          .then((imageList) => {
            setImages(imageList);
            setLoading(false);
          })
          .catch((err) => {
            console.error("❌ Lỗi khi lấy ảnh:", err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error("Lỗi lấy thông tin:", err);
        navigate("/");
      });
  }, [navigate]);

  return {
    username,
    balance,
    images,
    loading,
  };
};

export default useUserProfile;
