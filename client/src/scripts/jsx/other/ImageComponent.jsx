import React, { useState, useEffect} from 'react';
import { Blurhash } from 'react-blurhash';

const ImageComponent = (props) => { 
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => { 
        const img = new Image();
        img.onload = () => { 
            setImageLoaded(true);
        }
        img.src = props.src;
    }, [props.src]);

    return (
        <>
            {!imageLoaded && (
                <Blurhash
                    hash={props.blurhash}
                    width="100%"
                    height="100%"
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                />
            ) }
            {imageLoaded && <img
                src={props.src}
                alt={props.alt}
                className={props.className}
            />}
            </>
        );
}

export default ImageComponent;