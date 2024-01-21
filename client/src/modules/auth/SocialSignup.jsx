import {ImFacebook} from 'react-icons/im';
import {FaGoogle} from 'react-icons/fa';

import Button from '../../common/Button';

const SocialSignup = () => {
  return (
    <div className="social-signup">
      <h4>Lépj be meglévő fiókoddal,</h4>
      <Button text="via Facebook" className="secondary light">
        <ImFacebook />
      </Button>
      <Button text="via Google" className="secondary light">
        <FaGoogle />
      </Button>
    </div>
  );
};

export default SocialSignup;
