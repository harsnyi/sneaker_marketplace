import MultiStepForm from './MultiStepForm';
import SocialSignup from './SocialSignup';

const Signup = () => {
  return (
    <>
      <h1>Vágjunk bele!</h1>
      <SocialSignup />
      <div className="bg-line">
        <h4>vagy</h4>
      </div>
      <MultiStepForm />
    </>
  );
};

export default Signup;
