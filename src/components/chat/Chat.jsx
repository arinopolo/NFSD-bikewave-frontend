import React, { useContext, useEffect, useState, useRef } from "react";
import "./Chat.css";
import { AuthContext } from "../../contexts/AuthContext";
import Conversation from "../conversation/Conversation";
import ChatBox from "../chatBox/ChatBox";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const Chat = () => {
  const userId = localStorage.getItem("userId");
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

  const socket = useRef();

  //llamada al api

  useEffect(() => {
    const getChats = async () => {
      try {
        const token = localStorage.getItem("token");
        const backendResponse = await fetch(`${BASE_URL}/chat/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        const data = await backendResponse.json();
        if (data) {
          setChats(data);
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
      socket.current = io("ws://localhost:8800");
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

  /*useEffect(() => {
    socket.current.on("receive-message", (data) => {
      console.log("recevied message", data);
      setReceiveMessage(data);
    });
  }, []); */

  useEffect(() => {
    console.log("recieved message", receiveMessage);
  }, [receiveMessage]);

  return (
    <>
      <div className="chat">
        <div className="left-side flex flex-column align-start gap-1">
          <h2>Chats</h2>
          <div className="chat-list  flex flex-column gap-1">
            {chats.map((chat) => (
              <div
                onClick={() => setCurrentChat(chat)}
                key={chat._id}
                style={{
                  borderBottom: "1px solid grey",
                  padding: " 1rem 0.5rem",
                  backgroundColor: "lightgray",
                }}
              >
                <Conversation chat={chat} currentUserId={userId} />
              </div>
            ))}
          </div>
        </div>

        <div className="right-side flex flex-column gap-2 align-start">
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
