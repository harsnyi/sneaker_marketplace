import '../../assets/css/authentication.css';
import Transition from '../../component/Transition';
import AuthTabs from './AuthTabs';
import Hero from './Hero';

const Authentication = () => {
  return (
    <>
      <Transition>
        <section className="auth_page">
          <Hero />
          <div className="auth_container">
            <h1 className="brand_title">Bump</h1>
            <AuthTabs />
          </div>
        </section>
      </Transition>
    </>
  );
};

export default Authentication;
