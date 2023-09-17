import '../../assets/css/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content-wrapper">
        <h1>Footer</h1>
      </div>
      <div className="footer-bottom">
        <div className="copyright-info">
          <p>
            ©<span id="current-year">{currentYear}</span> Footwr. <span className="pipe">|</span> Magyarország <span className="pipe">|</span> Minden jog fenntartva.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
