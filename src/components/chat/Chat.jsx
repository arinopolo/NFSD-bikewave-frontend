import React, { useEffect, useState, useRef } from "react";
import "./Chat.css";
import Conversation from "../conversation/Conversation";
import ChatBox from "../chatBox/ChatBox";
import { io } from "socket.io-client";
import api from "../../api/api";

const WEB_SOCKET = import.meta.env.VITE_WEB_SOCKET;
const Chat = () => {
  const userId = localStorage.getItem("userId");
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const [refresh, toggleRefresh] = useState();

  const socket = useRef();

  // llamada api para traer a los chats
  useEffect(() => {
    const getChats = async () => {
      try {
        const backendResponse = await api.getChats();

        if (backendResponse) {
          setChats(backendResponse);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    getChats();
  }, [userId, refresh]);

  // Connect to Socket.io
  useEffect(() => {
    if (userId !== null) {
      socket.current = io(WEB_SOCKET);
      socket.current.emit("new-user-add", userId);
      socket.current.on("get-users", (users) => {
        setOnlineUsers(users);
      });
      socket.current.on("receive-message", (data) => {
        console.log("mensaje recibidooooo ,", data);
        setReceiveMessage(data);
      });
    }
  }, [userId]);

  return (
    <>
      <div className="chat mb-15">
        <div className="left-side flex flex-column align-start gap-1">
          <h2>Chats</h2>
          <div className="chat-list flex flex-column gap-1">
            {chats.map((chat) => (
              <div
                onClick={() => setCurrentChat(chat)}
                key={chat._id}
                className={
                  chat === currentChat ? "conversation current" : "conversation"
                }
              >
                <Conversation chat={chat} currentUserId={userId} />
              </div>
            ))}
          </div>
        </div>

        <div className="right-side flex flex-column gap-1 align-start">
          {currentChat ? (
            <ChatBox
              currentChat={currentChat}
              currentUserId={userId}
              receiveMessage={receiveMessage}
              refresh={refresh}
              toggleRefresh={toggleRefresh}
            />
          ) : (
            <p>Elije chat para empezar a chatear</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
