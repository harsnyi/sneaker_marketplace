import "../../../assets/css/home_page.css";

import backgroundImage from "../../../assets/images/jordan/jordan-extended.png";


const Home = () => {
    return <>
        <header className="home-header">
            <img className="home-header-background" src={backgroundImage} alt="Háttérkép" loading="lazy" />
  

        </header>
    </>
 };
export default Home;