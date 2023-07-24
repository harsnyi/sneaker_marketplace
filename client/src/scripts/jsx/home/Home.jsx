import "../../../assets/css/home_page.css";

import backgroundImage from "../../../assets/images/jordan/jordan-extended.png";

import ImageComponent from "../other/ImageComponent.jsx";

const Home = () => {
    return <>
        <header className="home-header">
            <ImageComponent src={backgroundImage} alt="Háttérkép" className="home-header-background" blurhash="L798JQ0JNa~WxuNGt7s:0J?Hxu9Z"/>

  

        </header>
    </>
 };
export default Home;