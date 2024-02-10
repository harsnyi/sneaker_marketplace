import {useState, useEffect} from 'react';
import {useAxiosPrivate} from '../../hooks/useAxiosPrivate';

import {CgProfile} from 'react-icons/cg';

const Header = () => {
  const [image, setImage] = useState(null);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axiosPrivate.get('/api/v1/get_profile_picture');
        setImage(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchImage();
  }, []);

  return (
    <nav className="main_header">
      {image ? (
        <span className="header_img">
          <img src={'http://localhost:8000' + image.profile_picture} />
        </span>
      ) : (
        <span className="header_img">
          <CgProfile className="header_img" />
        </span>
      )}
    </nav>
  );
};

export default Header;
