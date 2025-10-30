import "./SideBar.css";
import avatar from "../../assets/placeholderAvatar.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar() {
  const { currentUser, handleSignOut, handleEditProfileClick } =
    useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__user-content">
        <img
          src={currentUser.avatarUrl}
          className="sidebar__avatar"
          alt="Default avatar"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <p className="sidebar__logout" onClick={handleEditProfileClick}>
        Change profile data
      </p>
      <p className="sidebar__logout" onClick={handleSignOut}>
        Sign out
      </p>
    </div>
  );
}

export default SideBar;
