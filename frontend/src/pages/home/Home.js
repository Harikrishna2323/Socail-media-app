import React, { useContext } from "react";
import "./home.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const { user: currentUser } = useContext(AuthContext);
  const username = currentUser.username;
  console.log(username);
  return (
    <div>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed username={username} />
        {/* <Rightbar /> */}
      </div>
    </div>
  );
};

export default Home;
