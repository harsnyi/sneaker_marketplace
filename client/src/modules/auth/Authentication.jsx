import '../../assets/css/authentication.css';
import AuthTabs from './AuthTabs';
import Hero from './Hero';

const Authentication = () => {
  return (
    <>
      <section className="auth-page">
        <Hero />
        <div className="auth-container">
          <h1 className="brand-title">Under Retail</h1>
          <AuthTabs />
        </div>
      </section>
    </>
  );
};

export default Authentication;
