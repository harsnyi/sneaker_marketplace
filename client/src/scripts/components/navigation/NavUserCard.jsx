const NavUserCard = (props) => {
  return (
    <>
      <div className={props.divClassName}>
        <img src={props.profilePicture} alt="" />
      </div>
      <span className={props.spanClassName}>{props.username}</span>
    </>
  );
};

export default NavUserCard;
