import dnavbar from '../../../assets/css/desktop_navbar.module.css';

const NavUserCard = (props) => {
  return (
    <>
      <div className={dnavbar['profile-avatar']}>
        <img src={props.profilePicture} alt="" />
      </div>
      <span className={dnavbar['navbar-username']}>{props.username}</span>
    </>
  );
};

export default NavUserCard;
