import React from 'react';

import {ImFacebook} from 'react-icons/im';
import {FcGoogle} from 'react-icons/fc';

import Button from '../form/Button';

const SocialSignup = () => {
  return (
    <div className="social-signup">
      <h4>Lépj be meglévő fiókoddal,</h4>
      <Button text="via Facebook" className="secondary">
        <ImFacebook style={{color: '#3b5998'}} />
      </Button>
      <Button text="via Google" className="secondary">
        <FcGoogle />
      </Button>
    </div>
  );
};

export default SocialSignup;
