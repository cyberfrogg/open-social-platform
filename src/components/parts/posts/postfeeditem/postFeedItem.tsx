import { useState, useEffect } from 'react';
import classes from './postFeedItem.module.css'
import { GetNicknameById } from '@/utils/api/user/getNickname';
import GetDateDifference from '@/utils/shared/dateDifference';
import PostData from '@/data/post/PostData';
import FormatDateAgo from '@/utils/shared/dateFormat';
import Link from 'next/link';
import { GetUserUrlFromNickname } from '@/utils/routing/getuserurl';
import { GetPostUrlFromSlugAndId } from '@/utils/routing/getposturl';
import PostFeedItemData from '@/data/post/PostFeedItemData';
import { useDispatch } from 'react-redux';
import { addPostOnPage, replacePostAtIndex } from '@/slices/feedSlice';
import Sleep from '../../../../utils/shared/sleep';

export interface IPostFeedItemProps {
    post: PostFeedItemData,
    children: React.ReactNode
}

export const PostFeedItem: React.FC<IPostFeedItemProps> = (props) => {
    const dispatch = useDispatch();
    let post = JSON.parse(JSON.stringify(props.post)) as PostFeedItemData;
    const isAllStaticDataLoaded = post.IsAllStaticDataLoaded;
    const responseData = post.ResponseData;

    // check if diff between edit and creation less than 10.000ms
    const isCreateAndEditDiffSmall = GetDateDifference(responseData.CreateTime, responseData.LastEditTime) <= 10000;
    const postDateText = isCreateAndEditDiffSmall ? "Created " + FormatDateAgo(responseData.CreateTime) : "Edited " + FormatDateAgo(responseData.LastEditTime);
    const userUrl = GetUserUrlFromNickname(post.AuthorNickname);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedNickname = await GetNicknameById(responseData.AuthorID);

            post.AuthorNickname = fetchedNickname == null ? "" : fetchedNickname;
            post.IsAllStaticDataLoaded = true;
            dispatch(replacePostAtIndex(JSON.stringify({ index: post.Index, postFeedItem: post })));
        }

        if (!isAllStaticDataLoaded)
            fetchData();

    }, [isAllStaticDataLoaded]);

    return (
        <article className={classes.postitem}>
            <div className={classes.topinfo}>
                <Link className={classes.author} href={userUrl}>
                    <div className={classes.avatar}>

                    </div>
                    <div className={classes.authornicknamecontainer}>
                        <p className={classes.nickname}>{post.AuthorNickname}</p>
                    </div>
                </Link>
                <time className={classes.postdate}>{postDateText}</time>
            </div>
            <div className={classes.title}>
                <Link href={GetPostUrlFromSlugAndId(responseData.ID, responseData.Slug)} className={classes.tilteurl}>
                    <h2 className={classes.tiltetext}>{responseData.Title}</h2>
                </Link>
            </div>
            <div className={classes.content}>
                {props.children}
            </div>
        </article>
    );
}