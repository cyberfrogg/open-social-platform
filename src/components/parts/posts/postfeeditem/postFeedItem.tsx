import { useState, useEffect } from 'react';
import classes from './postFeedItem.module.css'
import { GetNicknameById } from '@/utils/api/user/getNickname';

export interface IPostFeedItemProps {
    authorid: number
    children: React.ReactNode
}

export const PostFeedItem: React.FC<IPostFeedItemProps> = (props) => {
    const [authorNickname, setAuthorNickname] = useState("");

    useEffect(() => {
        const fetchNickname = async () => {
            const fetchedNickname = await GetNicknameById(props.authorid);
            setAuthorNickname(fetchedNickname == null ? "" : fetchedNickname);
        }

        fetchNickname();
    });

    return (
        <article className={classes.postitem}>
            <div className={classes.author}>
                <div className={classes.avatar}>

                </div>
                <p className={classes.authornickname}>
                    {authorNickname}
                </p>
            </div>
            <div className={classes.content}>
                {props.children}
            </div>
        </article>
    );
}