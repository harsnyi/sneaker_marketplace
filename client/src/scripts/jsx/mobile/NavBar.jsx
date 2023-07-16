import mobileNavStyle from '../../../assets/css/mobile_navbar.module.css';

const NavBar = () => {
  return (
    <>
      <nav className={mobileNavStyle['nav-bar']}>
        <ul className={mobileNavStyle['nav-list']}></ul>
      </nav>
    </>
  );
};

export default NavBar;
