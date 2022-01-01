import React, { useContext } from "react";
import "./conversation.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Conversation = ({ conv, currentUser }) => {
  const [user, setUser] = useState(null);
  // const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const friendId = conv.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const { data } = await axios.get(`/api/users?userId=${friendId}`);

        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conv]);
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.profilePic
            ? user.profilePic
            : "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
};

export default Conversation;
