import mnavbar from '../../../assets/css/mobile_navbar.module.css';

const NavBar = () => {
  return (
    <>
      <nav className={mnavbar['nav-bar']}>
        <ul className={mnavbar['nav-list']}></ul>
      </nav>
    </>
  );
};

export default NavBar;
