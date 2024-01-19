import Button from '../../common/Button';

import MultiStepForm from './MultiStepForm';
import {ImFacebook} from 'react-icons/im';
import {FaGoogle} from 'react-icons/fa';

const Signup2 = () => {
  return (
    <>
      <h1>Vágjunk bele!</h1>
      <div className="social-signup">
        <h4>Regisztrálj meglévő fiókoddal,</h4>
        <Button text="via Facebook" className="light">
          <ImFacebook />
        </Button>
        <Button text="via Google" className="light">
          <FaGoogle />
        </Button>
      </div>
      <div className="bg-line">
        <h4>vagy</h4>
      </div>
      <MultiStepForm />
    </>
  );
};

export default Signup2;
