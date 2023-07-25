import "../../../assets/css/home_page.css";

import backgroundImage from "../../../assets/images/jordan/jordan-extended.png";

import LazyImage from "../other/LazyImage.jsx";
import HomeHeaderContent from "./HomeHeaderContent";

const Home = () => {
    return <>
        <section className="home-header">
            <LazyImage src={backgroundImage} alt="Háttérkép" className="home-header-background" blurhash="L798JQ0JNa~WxuNGt7s:0J?Hxu9Z"/>
            <HomeHeaderContent/>
        </section>
    </>
 };
export default Home;