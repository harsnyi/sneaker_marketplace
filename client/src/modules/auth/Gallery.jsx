const Gallery = ({images, columns}) => {
  const imagePerColumn = Math.floor(images.length / columns);

  const createColumn = (startIndex) => {
    const column = [];
    for (let j = 0; j < imagePerColumn; j++) {
      column.push(
        <div key={startIndex + j} className="image">
          <img src={images[startIndex + j]} alt="background" />
        </div>
      );
    }
    return column;
  };

  const createGallery = () => {
    const gallery = [];
    for (let i = 0; i < columns; i++) {
      gallery.push(
        <div key={i} className={i % 2 === 0 ? 'image-column sliding-down' : 'image-column sliding-up'}>
          {createColumn(i * imagePerColumn)}
        </div>
      );
    }
    return gallery;
  };

  return <>{createGallery()}</>;
};

export default Gallery;
