import msearchbar from '../../../assets/css/mobile_searchbar.module.css';
import searchIcon from '../../../assets/images/logo&icon/magnifying-glass-solid.svg';

const SearchBar = () => {
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('searching...');
  };

  return (
    <>
      <header className={msearchbar['search-bar']}>
        <form onSubmit={handleSearchSubmit}>
          <input type="search" name="search" className="search-input" placeholder="Keresés . . ." autoComplete="off" required />
          <button type="submit">
            <img src={searchIcon} alt="" />
          </button>
        </form>
      </header>
    </>
  );
};

export default SearchBar;
