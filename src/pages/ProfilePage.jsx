import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoComponent from "../components/LogoComponent";
import { AuthContext } from "../contexts/AuthContext";
import api from "../api/api";
import ProfileButtons from "../containers/profileButtons/ProfileButtons";
import ProfileInfo from "../containers/ProfileInfo";
import Settings from "../containers/settings/Settings";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Loading = () => {
  return <div> Loading</div>;
};

const ProfilePage = () => {
  const token = localStorage.getItem("token");
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState();
  const [isActive, setIsActive] = useState("Sobre mí");
  const [myBicyclesList, setMyBicyclesList] = useState([]);

  const getUserInfo = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const backendResponse = await api.getUserInfo(userId);

      if (backendResponse) {
        setUserInfo(backendResponse);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const getMyBicycles = async () => {
    try {
      const token = localStorage.getItem("token");
      const backendResponse = await fetch(`${BASE_URL}/users/mybicycles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const data = await backendResponse.json();
      console.log(data);
      if (data) {
        setMyBicyclesList(data);
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
      getMyBicycles();
    }
  }, [token]);

  if (!userInfo) {
    return <Loading />;
  }

  return (
    <>
      <LogoComponent />
      <ProfileButtons setIsActive={setIsActive} isActive={isActive} />

      {isActive === "Sobre mí" ? (
        <ProfileInfo userInfo={userInfo} myBicyclesList={myBicyclesList} />
      ) : (
        <Settings handleLogoutClick={logout} />
      )}
    </>
  );
};

export default ProfilePage;
