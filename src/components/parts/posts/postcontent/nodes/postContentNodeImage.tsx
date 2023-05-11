import React from 'react';
import classes from './postContentNodeStyles.module.css'
import PostContentNodeImageData from '@/data/shared/postcontent/nodes/PostContentNodeImageData';

export interface IPostContentNodeImageProps {
    data: PostContentNodeImageData
}

export const PostContentNodeImage: React.FC<IPostContentNodeImageProps> = (props) => {
    return (
        <figure className={classes.image}>
            <img
                className={classes.img}
                src={props.data.url}
                alt={props.data.description}
            />
            <p className={classes.imagedescription}>{props.data.description}</p>
        </figure>
    );
}