import {motion} from 'framer-motion';

import {useCallback, useState} from 'react';
import cuid from 'cuid';

import Button from '../form/Button';
import Dropzone from '../form/Dropzone';

import {useAuth} from '../../hooks/useAuth';
import {useToast} from '../../hooks/useToast';

import {HiUpload} from 'react-icons/hi';

const BsProfilePicForm = ({formData, setFormData, toggleForm}) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const {setAuth} = useAuth();
  const {addToast} = useToast();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        setImages((prevState) => [...prevState, {id: cuid(), src: e.target.result}]);
      };

      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const onDropRejected = useCallback((fileRejections) => {
    if (fileRejections[0].errors[0].code === 'file-too-large') {
      addToast('error', 'A fájl mérete túl nagy. A megengedet méret 1MB.');
    } else {
      addToast('error', 'Hibás fájl formátum.');
    }
  });

  const onFileDialogCancel = useCallback(() => {
    setImages([]);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (images.length === 0) {
      addToast('warning', 'Először tölts fel egy képet a módosításhoz.');
      return;
    }

    setLoading(true);
    try {
      console.log(images);
    } catch (error) {
      addToast('error', 'Hiba történt a kép feltöltése közben.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{x: '100%'}} animate={{x: '0'}} exit={{x: '100%'}} transition={{duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94]}} className="settings_edit_wrapper">
      <div className="form_box">
        <p className="link" onClick={toggleForm}>
          Mégse
        </p>
        <h1 className="page_title">Fénykép feltöltése</h1>
        <p className="page_desc">Maximum 1 darab képet tölthetsz fel, amely nem lehet nagyobb mint 1MB.</p>
        <form onSubmit={handleFormSubmit}>
          <Dropzone onDrop={onDrop} accept={'image/*'} multiple={false} maxFiles={1} maxSize={1048576} onDropRejected={onDropRejected} onFileDialogCancel={onFileDialogCancel} />
          <Button type="submit" className="primary" text="Kép módosítása" loading={loading}>
            <HiUpload />
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default BsProfilePicForm;
