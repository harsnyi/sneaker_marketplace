import Button from '../other/Button';

const HomeHeader = () => {
  return (
    <>
      <div className="home-header-content">
        <h1>Footwr.</h1>
        <h4>
          Magyarország első
          <br />
          hivatalos sneaker piactere.
        </h4>
        <Button text="Csatlakozz Te is!" className="btn-light" />
      </div>
    </>
  );
};

export default HomeHeader;
