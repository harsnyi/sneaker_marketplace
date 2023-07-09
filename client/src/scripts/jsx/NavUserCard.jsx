import '../../assets/css/navusercard.css';

const NavUserCard = (props) => {
  return (
    <>
      <a className="user-profile-a" href="">
        <div className="profile-avatar">
          <img src={props.profilePicture} alt="" />
        </div>
        <span className="navbar-username">{props.username}</span>
      </a>
    </>
  );
};

export default NavUserCard;
