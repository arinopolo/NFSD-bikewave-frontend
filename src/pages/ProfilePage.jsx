import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DetailedProfile from "../components/detailedProfile/detailedProfile";
import LogoComponent from "../components/LogoComponent";
import { AuthContext } from "../contexts/AuthContext";
import api from "../api/api";

const Loading = () => {
  return <div> Loading</div>;
};

const ProfilePage = () => {
  const token = localStorage.getItem("token");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState();

  const getUserInfo = async () => {
    try {
      const backendResponse = await api.getUserInfo(user.userId);

      if (backendResponse) {
        setUserInfo(backendResponse);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getUserInfo();
    }
  }, [navigate, token]);

  if (!userInfo) {
    return <Loading />;
  }
  return (
    <>
      <LogoComponent />
      <DetailedProfile userInfo={userInfo} />
    </>
  );
};

export default ProfilePage;
