import {motion} from 'framer-motion';

import Button from '../form/Button';

import {MdAddCircle} from 'react-icons/md';
import {AiOutlineEdit} from 'react-icons/ai';
import {FaCheck} from 'react-icons/fa';
import {IoMdTrash} from 'react-icons/io';

const BsAddressForm = ({formData, setFormData, toggleForm}) => {
  return (
    <motion.div initial={{x: '100%'}} animate={{x: '0'}} exit={{x: '100%'}} transition={{duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94]}} className="settings_edit_wrapper">
      <div className="form_box">
        <p className="link" onClick={toggleForm}>
          Mégsem
        </p>
        <h1 className="page_title">Címek kezelése</h1>
        <p className="page_desc">Itt kezelheted a címeidet és adhatsz hozzá újakat.</p>
        <div className="address_grid">
          <div className="address_box">
            <article className="add">
              <MdAddCircle />
              <h4>Új hozzáadása</h4>
            </article>
          </div>

          <article className="address">
            <Button className="secondary delete">
              <IoMdTrash />
            </Button>
            <h5>Lakcím</h5>
            <h4>Teszt Elek</h4>
            <div>
              <p>Valami. 34.</p>
              <p>1111</p>
              <p>Budapest</p>
              <p>Magyarország</p>
            </div>
            <span className="default">
              <FaCheck />
              Alapértelmezett
            </span>
            <Button className="secondary" text="Szerkesztés">
              <AiOutlineEdit />
            </Button>
          </article>
        </div>
      </div>
    </motion.div>
  );
};

export default BsAddressForm;
