import React from 'react';
import classes from './controlImage.module.css'

interface IControlImageProps {
    src: string;
    alt: string;
    srcWidth: number;
    srcHeight: number;
}

export const ControlImage: React.FC<IControlImageProps> = (props) => {
    return (
        <figure className={classes.image}>
            <div className={classes.container}>
                <img
                    className={classes.img}
                    src={props.src}
                    alt={props.alt}
                />
            </div>
        </figure>
    );
}
