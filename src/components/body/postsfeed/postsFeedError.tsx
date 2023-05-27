import React from 'react';
import classes from './postsFeedError.module.css'

interface IPostsFeedError {
    isShown: boolean,
    message: string
}

export const PostsFeedError: React.FC<IPostsFeedError> = (props) => {
    return (
        <div className={classes.error + " " + (props.isShown ? classes.shown : "")}>
            <p className={classes.title}>An error occured while loading posts</p>
            <p className={classes.message}>{props.message}</p>
        </div>
    );
}
