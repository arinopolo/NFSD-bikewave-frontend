import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Conversation.css";

const Conversation = ({ chat, currentUserId }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const otherUserId = chat.members.find((id) => id !== currentUserId);

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

    getUserData();
  }, [chat]);
  return (
    <div
      className="flex gap-05 align-center"
      style={{ textTransform: "capitalize" }}
    >
      <FontAwesomeIcon icon={faUser} size="lg" />
      <h3>{userData && userData.firstName}</h3>
      <h3>{userData && userData.secondName}</h3>
      {chat.unreadMessagesCount > 0 && (
        <div className="unread-messages">{chat.unreadMessagesCount}</div>
      )}
    </div>
  );
};

export default Conversation;
