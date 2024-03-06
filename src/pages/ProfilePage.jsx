import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoComponent from "../components/LogoComponent";
import { AuthContext } from "../contexts/AuthContext";
import api from "../api/api";
import ProfileButtons from "../containers/profileButtons/ProfileButtons";
import ProfileInfo from "../containers/profileInfo/ProfileInfo";
import Settings from "../containers/settings/Settings";
import Loading from "../components/loading/Loading";

const ProfilePage = () => {
  const token = localStorage.getItem("token");
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState();
  const [isActive, setIsActive] = useState("Sobre mí");
  const [myBicyclesList, setMyBicyclesList] = useState([]);
  const [refresh, toggleRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const getMyOwnBicycles = async () => {
    try {
      const backendResponse = await api.getMyBicycles();

      if (backendResponse) {
        setMyBicyclesList(backendResponse);
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
      getMyOwnBicycles();
    }
  }, [token, refresh]);

  useEffect(() => {
    if (userInfo) {
      setLoading(false);
    }
  }, [userInfo]);

  return (
    <>
      <LogoComponent />
      <ProfileButtons setIsActive={setIsActive} isActive={isActive} />
      {loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          {isActive === "Sobre mí" ? (
            <ProfileInfo userInfo={userInfo} myBicyclesList={myBicyclesList} />
          ) : (
            <Settings
              handleLogoutClick={logout}
              userInfo={userInfo}
              toggleRefresh={toggleRefresh}
              refresh={refresh}
            />
          )}{" "}
        </>
      )}
    </>
  );
};

export default ProfilePage;
