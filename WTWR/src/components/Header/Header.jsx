function Header() {
  return (
    <header className="header">
      <div className="header__left-content">
        <img
          src="../src/assets/wtwrLogo.svg"
          alt="What to Wear Logo"
          className="header__logo"
        />
        <div>Date and Location</div>
      </div>
      <div className="header__right-content">
        + Add clothes Terrence Tegegne
        <img
          src="../src/assets/placeholderAvatar.png"
          alt="User Avatar"
          className="header__avatar"
        />
      </div>
    </header>
  );
}

export default Header;
