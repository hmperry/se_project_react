import "./sideBar.css";
import avatar from "../../assets/placeholderAvatar.png";

function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} className="sidebar__avatar" alt="Default avatar" />
      <p className="sidebar__username">User name</p>
    </div>
  );
}

export default SideBar;
