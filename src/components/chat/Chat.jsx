import React, { useContext, useEffect, useState, useRef } from "react";
import "./Chat.css";
import { AuthContext } from "../../contexts/AuthContext";
import Conversation from "../conversation/Conversation";
import ChatBox from "../chatBox/ChatBox";
import { io } from "socket.io-client";
import api from "../../api/api";
import { useLocation } from "react-router-dom";

const WEB_SOCKET = import.meta.env.VITE_WEB_SOCKET;
const Chat = () => {
  const userId = localStorage.getItem("userId");
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

  const socket = useRef();

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
  }, [userId]);

  // Connect to Socket.io
  useEffect(() => {
    if (userId !== null) {
      socket.current = io(WEB_SOCKET);
      socket.current.emit("new-user-add", userId);
      socket.current.on("get-users", (users) => {
        setOnlineUsers(users);
      });
      socket.current.on("receive-message", (data) => {
        console.log("recevied message", data);
        setReceiveMessage(data);
      });
    }
  }, [userId]);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    console.log("recieved message", receiveMessage);
  }, [receiveMessage]);

  // Get query parameters from URL
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const chatId = params.get("chatId");
  const receiverId = params.get("receiverId");

  // Automatically open chat if chatId or receiverId is provided
  useEffect(() => {
    if (chatId) {
      const selectedChat = chats.find((chat) => chat._id === chatId);
      setCurrentChat(selectedChat);
    } else if (receiverId) {
      const newChat = createChatWithReceiver(receiverId);
      setCurrentChat(newChat);
    }
  }, [chatId, receiverId, chats]);
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
              setSendMessage={setSendMessage}
              receiveMessage={receiveMessage}
              sendMessage={sendMessage}
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
