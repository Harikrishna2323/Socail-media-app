import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Dropdown } from "react-bootstrap";
import { logoutUser } from "../../context/AuthActions";

const Topbar = () => {
  const { user: currentUser, dispatch } = useContext(AuthContext);
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/">
          <span className="logo">Social App</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>

          <div className="topbarIconItem">
            <Link to="/messenger">
              <Chat />
            </Link>
            <span className="topbarIconBadge">2</span>
          </div>

          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        {currentUser ? (
          <Dropdown className="dropdown ml-5">
            <Dropdown.Toggle
              style={{ color: "black" }}
              type="button"
              id="dropdown-basic"
            >
              {currentUser.name}
              <img
                src={
                  currentUser.profilePic
                    ? currentUser.profilePic
                    : "https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w"
                }
                alt="somebody"
                className="topbarImg"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to={`/profile/${currentUser.username}`}>
                  <li>Profile</li>
                </Link>
              </Dropdown.Item>

              <Dropdown.Item
                className="dropdown-item"
                onClick={() => {
                  dispatch(logoutUser());
                }}
              >
                <li>Logout</li>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <li className="nav-item">
            <a className="nav-link" href="/login">
              Login
            </a>
          </li>
        )}
      </div>
    </div>
  );
};

export default Topbar;
