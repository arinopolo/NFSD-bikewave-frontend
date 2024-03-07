import React, { useEffect, useRef, useState } from "react";
import api from "../../api/api";
import InputEmoji from "react-input-emoji";
import "./ChatBox.css";
import { format } from "timeago.js";

const ChatBox = ({
  currentChat,
  currentUserId,
  setSendMessage,
  receiveMessage,
  sendMessage,
}) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  //llamada api
  useEffect(() => {
    const otherUserId = currentChat.members.find((id) => id !== currentUserId);
    const getUserData = async () => {
      try {
        const data = await api.getUserInfo(otherUserId);
        if (data) {
          setUserData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    if (currentChat !== null) getUserData();
  }, [currentChat, currentUserId]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const backendResponse = await api.getMessages(currentChat);

        if (backendResponse) {
        setMessages(backendResponse);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    if (currentChat !== null) {
      getMessages();
    }
  }, [currentChat]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();

    if (newMessage === "") {
      return;
    }
    const message = {
      author: currentUserId,
      text: newMessage,
      chatId: currentChat._id,
    };

    try {
      const messageSent = await api.sendMessage(message);

      if (messageSent) {
        setMessages([...messages, messageSent]);
        setNewMessage("");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    // Agregar lógica para agregar el mensaje recibido a la lista de mensajes

    if (receiveMessage) {
      setMessages((prevMessages) => [...prevMessages, receiveMessage]);
    }
  }, [receiveMessage]);

  const scroll = useRef();

  // controlar el envio del mensaje con la tecla Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend(e);
    }
  };

  return (
    <>
      <div className="flex flex-column gap-1  chat-container">
        <div className="flex gap-05" style={{ textTransform: "capitalize" }}>
          <h3>{userData && userData.firstName}</h3>
          <h3>{userData && userData.secondName}</h3>
        </div>

        <div className="chat-body flex flex-column gap-05  ">
          {messages.map((message) => (
            <div key={message._id} ref={scroll}>
              <div
                className={
                  message.author === currentUserId ? "message own" : "message"
                }
              >
                <div>
                  <p> {message.text}</p>
                  <p className="date">{format(message.createdAt)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input flex gap-05 align-center">
          <InputEmoji
            value={newMessage}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <button className="Enviar" onClick={handleSend}>
            Enviar
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
