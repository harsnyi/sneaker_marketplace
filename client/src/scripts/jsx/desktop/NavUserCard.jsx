import desktopNavStyle from '../../../assets/css/desktop_navbar.module.css';

const NavUserCard = (props) => {
  return (
    <>
      <div className={desktopNavStyle['profile-avatar']}>
        <img src={props.profilePicture} alt="" />
      </div>
      <span className={desktopNavStyle['navbar-username']}>{props.username}</span>
    </>
  );
};

export default NavUserCard;
