import '../../assets/css/navbar.css';

import logo from '../../assets/images/logo&icon/laced-logo.png';
import houseIcon from '../../assets/images/logo&icon/house-chimney-solid.svg';
import userIcon from '../../assets/images/logo&icon/user-solid.svg';
import bellIcon from '../../assets/images/logo&icon/bell-solid.svg';
import envelopeIcon from '../../assets/images/logo&icon/envelope-solid.svg';
import heartIcon from '../../assets/images/logo&icon/heart-solid.svg';
import uploadIcon from '../../assets/images/logo&icon/arrow-up-from-bracket-solid.svg';

import {useEffect} from 'react';

function navbarAnimation() {
  const navbarTextItems = document.querySelectorAll('.navbar-text');
  let delay = 0;

  navbarTextItems.forEach((item) => {
    item.style.transitionDelay = delay + 's';
    delay += 0.04;
  });
}

const NavBar = () => {
  useEffect(() => {
    navbarAnimation();
  }, []);

  return (
    <>
      <nav className="nav-bar">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <ul>
          <li>
            <a href="" className="active">
              <img className="navbar-svg" src={houseIcon} alt="" />
              <span className="navbar-text">&ensp;&nbsp;Kezdőlap</span>
            </a>
          </li>

          <div className="account li-group">
            <li>
              <a href="">
                <img className="navbar-svg" src={userIcon} alt="" />
                <span className="navbar-text">&ensp;&nbsp;Fiók</span>
              </a>
            </li>
            <li>
              <a href="" className="bell-svg">
                <img className="navbar-svg" src={bellIcon} alt="" />
                <span className="new-notification"></span>
                <span className="navbar-text">&ensp;&nbsp;Értesítések</span>
              </a>
            </li>
            <li>
              <a href="" className="envelope-svg">
                <img className="navbar-svg" src={envelopeIcon} alt="" />
                <span className="new-notification"></span>
                <span className="navbar-text">&ensp;&nbsp;Üzenetek</span>
              </a>
            </li>
            <li>
              <a href="">
                <img className="navbar-svg" src={heartIcon} alt="" />
                <span className="navbar-text">&ensp;&nbsp;Kedvencek</span>
              </a>
            </li>
            <li>
              <a href="">
                <img className="navbar-svg" src={uploadIcon} alt="" />
                <span className="navbar-text">&ensp;&nbsp;Eladás</span>
              </a>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
