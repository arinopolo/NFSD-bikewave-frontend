import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);
  return <div>ProfilePage</div>;
};

export default ProfilePage;
