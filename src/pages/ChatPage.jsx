import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "../components/chat/Chat";
import LogoComponent from "../components/LogoComponent";
import BottomNavigation from "../containers/bottomNavigation/BottomNavigation";

const ChatPage = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  return (
    <>
      <LogoComponent />
      <Chat />
   
    </>
  );
};

export default ChatPage;
