import '../../assets/css/navbar.css';

const NavUserCard = (props) => {
  return (
    <>
      <div className="profile-avatar">
        <img src={props.profilePicture} alt="" />
      </div>
      <span className="navbar-username">{props.username}</span>
    </>
  );
};

export default NavUserCard;
