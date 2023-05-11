import React from 'react';
import classes from './postsFeed.module.css'
import { IPostFeedItemProps } from '@/components/parts/posts/postfeeditem/postFeedItem';

interface IPostsFeedProps {
    children: React.ReactNode
}

export const PostsFeed: React.FC<IPostsFeedProps> = (props) => {
    return (
        <div className={classes.postsfeed}>
            {props.children}
        </div>
    );
}
