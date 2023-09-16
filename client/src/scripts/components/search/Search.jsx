import '../../../assets/css/searchbar.css';

import magnifyingGlassIcon from '../../../assets/icons/magnifying-glass-solid.svg';
import xMarkIcon from '../../../assets/icons/xmark-solid.svg';

import {useEffect} from 'react';
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';

const Search = (props) => {
  const handleDisable = () => {
    props.setIsSearchOpen(false); // Call the function passed through props to set isAuthOpen to false
    window.history.replaceState(null, null, window.location.pathname); // Remove the query string from the URL
  };

  useEffect(() => {
    // Disable body scroll when the form is active
    if (props.isSearchOpen) {
      const targetElement = document.querySelector('.search-wrapper');
      disableBodyScroll(targetElement);
    } else {
      // Enable body scroll when the form is not active
      enableBodyScroll(document.body);
    }

    // Clean up the effect
    return () => {
      enableBodyScroll(document.body);
    };
  }, [props.isSearchOpen]);

  return (
    <>
      <div className="search-wrapper">
        <button className="btn-search">
          <img src={magnifyingGlassIcon} alt="Keresés..." />
        </button>
        <div className="search-bar">
          <img onClick={handleDisable} src={xMarkIcon} alt="Bezár" />
        </div>
      </div>
    </>
  );
};

export default Search;
