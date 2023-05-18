import { useState, useEffect } from 'react';
import classes from './postFeedItem.module.css'
import { GetNicknameById } from '@/utils/api/user/getNickname';
import GetDateDifference from '@/utils/shared/dateDifference';
import PostData from '@/data/post/PostData';
import FormatDateAgo from '@/utils/shared/dateFormat';
import Link from 'next/link';
import { GetUserUrlFromNickname } from '@/utils/routing/getuserurl';
import { GetPostUrlFromSlugAndId } from '@/utils/routing/getposturl';

export interface IPostFeedItemProps {
    post: PostData,
    children: React.ReactNode
}

export const PostFeedItem: React.FC<IPostFeedItemProps> = (props) => {
    const [authorNickname, setAuthorNickname] = useState("");

    // check if diff between edit and creation less than 10.000ms
    const isCreateAndEditDiffSmall = GetDateDifference(props.post.CreateTime, props.post.LastEditTime) <= 10000;
    const postDateText = isCreateAndEditDiffSmall ? "Created " + FormatDateAgo(props.post.CreateTime) : "Edited " + FormatDateAgo(props.post.LastEditTime);

    useEffect(() => {
        const fetchNickname = async () => {
            const fetchedNickname = await GetNicknameById(props.post.AuthorID);
            setAuthorNickname(fetchedNickname == null ? "" : fetchedNickname);
        }

        fetchNickname();
    });

    return (
        <article className={classes.postitem}>
            <div className={classes.topinfo}>
                <Link className={classes.author} href={GetUserUrlFromNickname(authorNickname)}>
                    <div className={classes.avatar}>

                    </div>
                    <div className={classes.authornicknamecontainer}>
                        <p className={classes.nickname}>{authorNickname}</p>
                    </div>
                </Link>
                <time className={classes.postdate}>{postDateText}</time>
            </div>
            <div className={classes.title}>
                <Link href={GetPostUrlFromSlugAndId(props.post.ID, props.post.Slug)} className={classes.tilteurl}>
                    <h2 className={classes.tiltetext}>{props.post.Title}</h2>
                </Link>
            </div>
            <div className={classes.content}>
                {props.children}
            </div>
        </article>
    );
}