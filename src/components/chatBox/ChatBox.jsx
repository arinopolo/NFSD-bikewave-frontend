import React, { useEffect, useRef, useState } from "react";
import api from "../../api/api";
import InputEmoji from "react-input-emoji";
import "./ChatBox.css";
import { format } from "timeago.js";

const BASE_URL = import.meta.env.VITE_BASE_URL;

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

  //llamada api
  useEffect(() => {
    const getMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const backendResponse = await fetch(
          `${BASE_URL}/messages/${currentChat._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );

        const data = await backendResponse.json();

        setMessages(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    if (currentChat !== null) {
      getMessages();
    }
  }, [currentChat]);

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();

    const message = {
      author: currentUserId,
      text: newMessage,
      chatId: currentChat._id,
    };

    const receiverId = currentChat.members.find((id) => id !== currentUserId);
    //setSendMessage({ ...message, receiverId });
    try {
      const token = localStorage.getItem("token");

      const backendResponse = await fetch(`${BASE_URL}/messages/`, {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const messageSent = await backendResponse.json();
      console.log("message sent", messageSent);
      setMessages([...messages, messageSent]);
      setNewMessage("");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    console.log("recieved message", receiveMessage);
    // Agregar lógica para agregar el mensaje recibido a la lista de mensajes

    if (receiveMessage) {
      setMessages((prevMessages) => [...prevMessages, receiveMessage]);
    }
  }, [receiveMessage]);

  const scroll = useRef();
  return (
    <>
      <div className="flex gap-05" style={{ textTransform: "capitalize" }}>
        <h3>{userData && userData.firstName}</h3>
        <h3>{userData && userData.secondName}</h3>
      </div>

      <div className="chat-body  ">
        {messages.map((message) => (
          <div
            key={message._id}
            ref={scroll}
            className={
              message.author === currentUserId ? "message own" : "message"
            }
          >
            <p> {message.text}</p>
            <p className="date">{format(message.createdAt)}</p>
          </div>
        ))}
      </div>

      <div className="chat-input flex gap-05 align-center">
        <InputEmoji value={newMessage} onChange={handleChange} />
        <button className="Enviar" onClick={handleSend}>
          Enviar
        </button>
      </div>
    </>
  );
};

export default ChatBox;
