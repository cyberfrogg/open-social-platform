import { SetupClientSession } from '@/utils/auth/userSessionDataUtils';
import { MainPageLayout } from '../layouts/mainpage/MainPageLayout'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { CreateNewPostPanel } from '@/components/parts/posts/createnewpostpanel/createnewpostpanel';
import { GenericSpacer } from '@/components/grid/spacers/genericspacer';
import { PostsFeed } from '@/components/body/postsfeed/postsFeed';
import PostData from '@/data/post/PostData';
import { PostFeedItem } from '@/components/parts/posts/postfeeditem/postFeedItem';
import { PostContent } from '@/components/parts/posts/postcontent/postContent';
import { GetServerSidePropsContext } from 'next'
import * as cookie from 'cookie';
import { GetFeed } from '@/utils/api/feed/get';
import { addPostOnPage, setPostsOnPage } from '@/slices/feedSlice';
import PostFeedItemData from '@/data/post/PostFeedItemData';
import PostContentData from '../data/shared/postcontent/postContentData';

interface IUserPageProps {
    serversideItems: string
}

const Home: React.FC<IUserPageProps> = (props) => {
    const serversideItems = JSON.parse(props.serversideItems) as Array<PostFeedItemData>;
    const [postsOnPageState, setPostsOnPageState] = useState(serversideItems);
    const dispatch = useDispatch();
    const userSession = useSelector((state: RootState) => state.authSession.session);
    const postsOnPage = useSelector((state: RootState) => state.feed.postsOnPage);
    const isSessionCollected = useSelector((state: RootState) => state.authSession.isSessionCollected);

    useEffect(() => {
        // setup usersession
        SetupClientSession(userSession, isSessionCollected, dispatch);

        // setup serverside posts to client state
        if (postsOnPage.length == 0) {
            dispatch(setPostsOnPage(JSON.stringify(serversideItems)));
            setPostsOnPageState(serversideItems);
        }

        setPostsOnPageState(postsOnPage);
    }, [postsOnPage]);

    return (
        <>
            <div className="pagecontainer">
                <MainPageLayout title={"Home"}>
                    <GenericSpacer height={30} />
                    <CreateNewPostPanel />
                    <GenericSpacer height={20} />
                    <button onClick={() => {
                        let a = new PostFeedItemData();
                        a.ResponseData = new PostData(1, 79, "new", "new", new PostContentData(), new Date(), new Date());
                        dispatch(addPostOnPage(JSON.stringify(a)))
                    }}>
                        +
                    </button>
                    <PostsFeed>
                        {
                            postsOnPageState.map((post: PostFeedItemData) => {
                                return (
                                    <PostFeedItem
                                        key={post.Index}
                                        post={post}
                                    >
                                        <PostContent content={post.ResponseData.Content} />
                                    </PostFeedItem>
                                )
                            })
                        }
                    </PostsFeed>
                </MainPageLayout>
            </div>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

    let token = "";
    if (context.req.headers.cookie != undefined) {
        const cookies = cookie.parse(context.req.headers.cookie as string);
        if (cookies["session"] != undefined) {
            token = cookies["session"];
        }
    }

    let posts = new Array<PostData>();
    let postsGetResponse = await GetFeed(token, 0);
    posts = postsGetResponse.data;


    let serversideItemsArray = new Array<PostFeedItemData>();
    for (let i = 0; i < posts.length; i++) {
        const element = posts[i];
        let newElement = new PostFeedItemData();
        newElement.Index = i;
        newElement.IsRenderedOnServer = true;
        newElement.ResponseData = element;

        serversideItemsArray.push(newElement);
    }

    if (serversideItemsArray == null || serversideItemsArray.length == 0) {
        serversideItemsArray.push(new PostFeedItemData());
    }

    let serversideItems = JSON.stringify(serversideItemsArray);

    return {
        props: {
            serversideItems
        }
    };
}

export default Home;