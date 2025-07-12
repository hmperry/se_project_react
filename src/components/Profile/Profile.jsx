import "./Profile.css";
import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";

function Profile() {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection />
    </div>
  );
}

export default Profile;
