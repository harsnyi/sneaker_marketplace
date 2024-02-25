import {motion} from 'framer-motion';

const BsAddressForm = ({formData, setFormData, toggleForm}) => {
  return (
    <motion.div initial={{x: '100%'}} animate={{x: '0'}} exit={{x: '100%'}} transition={{duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94]}} className="settings_edit_wrapper">
      <div className="form_box">
        <p className="link" onClick={toggleForm}>
          Vissza
        </p>
        <h1>Cím kiválasztása</h1>
      </div>
    </motion.div>
  );
};

export default BsAddressForm;
