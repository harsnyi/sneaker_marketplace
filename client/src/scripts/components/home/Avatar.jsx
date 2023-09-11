const Avatar = (props) => {
  return (
    <div className="avatar">
      <img className={props.className} src={props.src} alt={props.alt} />
    </div>
  );
};

export default Avatar;
