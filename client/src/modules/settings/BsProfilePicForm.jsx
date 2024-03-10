import {motion} from 'framer-motion';

import {useCallback, useState} from 'react';
import cuid from 'cuid';

import {useAuth} from '../../hooks/useAuth';
import {useAxiosPrivate} from '../../hooks/useAxiosPrivate';
import {useToast} from '../../hooks/useToast';

import Button from '../form/Button';
import Dropzone from '../form/Dropzone';

import {HiUpload} from 'react-icons/hi';

const BsProfilePicForm = ({setFormData, toggleForm}) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const {setAuth} = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const {addToast} = useToast();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();

      reader.onload = function () {
        setImages((prevState) => [...prevState, {id: cuid(), file: file}]);
      };

      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const onDropRejected = (fileRejections) => {
    if (fileRejections[0].errors[0].code === 'file-too-large') {
      addToast('error', 'A fájl mérete túl nagy. A megengedet méret 1MB.');
    } else {
      addToast('error', 'Hibás fájl formátum.');
    }
  };

  const onFileDialogCancel = useCallback(() => {
    setImages([]);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (images.length === 0) {
      addToast('warning', 'Először tölts fel egy képet a módosításhoz.');
      return;
    }

    setLoading(true);
    await axiosPrivate
      .put(
        '/api/v1/upload_profile_picture',
        {
          profile_picture: images[0].file,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response) => {
        setFormData((prevData) => ({
          ...prevData,
          profilePicture: response.data.message,
        }));
        setAuth((prev) => ({
          ...prev,
          profilePicture: response.data.message,
        }));
        toggleForm();
        addToast('success', 'Fénykép mentve!');
      })
      .catch((error) => {
        addToast('error', error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <motion.div initial={{x: '100%'}} animate={{x: '0'}} exit={{x: '100%'}} transition={{duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94]}} className="settings_edit_wrapper">
      <div className="form_box">
        <p className="link" onClick={toggleForm}>
          Vissza
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
