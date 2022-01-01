import React, { useState, useContext, useEffect } from "react";
import "./home.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Home = () => {
  const [users, setUsers] = useState([]);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get(`/users/friends/${currentUser._id}`);
      setUsers(data);
    };
    getUsers();
  }, []);
  console.log("usersHome:", users);
  const username = currentUser.username;
  console.log(username);
  return (
    <div>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed username={username} />
        <Rightbar />
      </div>
    </div>
  );
};

export default Home;
