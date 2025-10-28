import "./SideBar.css";
import avatar from "../../assets/placeholderAvatar.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ userData }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <img
        src={currentUser.avatarUrl}
        className="sidebar__avatar"
        alt="Default avatar"
      />
      <p className="sidebar__username">{currentUser.name}</p>
    </div>
  );
}

export default SideBar;
