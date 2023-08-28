import '../../../assets/css/searchbar.css';

import xMarkIcon from '../../../assets/images/logo&icon/xmark-solid.svg';

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
      <div className="search-wrapper"></div>
    </>
  );
};

export default Search;
