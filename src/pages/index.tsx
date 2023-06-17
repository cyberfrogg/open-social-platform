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
import { addPostOnPage, addPostsOnPage, setErrorMessage, setFeedType, setIsError, setIsLoadingNewPosts, setPostsOnPage } from '@/slices/feedSlice';
import PostFeedItemData from '@/data/post/PostFeedItemData';
import PostContentData from '../data/shared/postcontent/postContentData';
import usePageBottom from '../hooks/usePageBottom';
import { PostsFeedError } from '@/components/body/postsfeed/postsFeedError';

interface IUserPageProps {
    serversideItems: string
}

const Home: React.FC<IUserPageProps> = (props) => {
    const feedTypeName = "main";
    const serversideItems = JSON.parse(props.serversideItems) as Array<PostFeedItemData>;
    const [postsOnPageState, setPostsOnPageState] = useState(serversideItems);
    const dispatch = useDispatch();

    const userSession = useSelector((state: RootState) => state.authSession.session);
    const userSessionToken = userSession != null ? userSession.Token : "";
    const isSessionCollected = useSelector((state: RootState) => state.authSession.isSessionCollected);

    const feedType = useSelector((state: RootState) => state.feed.type);
    const postsOnPage = useSelector((state: RootState) => state.feed.postsOnPage);
    const isLoadingNewPosts = useSelector((state: RootState) => state.feed.isLoadingNewPosts);

    const isError = useSelector((state: RootState) => state.feed.isError);
    const errorMessage = useSelector((state: RootState) => state.feed.errorMessage);

    const isPageBottomReached = usePageBottom(10);

    useEffect(() => {
        // setup usersession
        SetupClientSession(userSession, isSessionCollected, dispatch);

        // setup serverside posts to client state
        if (postsOnPage.length == 0 || feedType != feedTypeName) {
            dispatch(setPostsOnPage(JSON.stringify(serversideItems)));
            dispatch(setFeedType(feedTypeName));
            setPostsOnPageState(serversideItems);
        }

        setPostsOnPageState(postsOnPage);   // i forgor why i need this

        if (postsOnPage.length != 0 && isPageBottomReached && !isLoadingNewPosts && !isError) {
            console.log("Loading new posts");
            dispatch(setIsLoadingNewPosts(true));
            LoadNewPosts(userSessionToken);
        }

    }, [postsOnPage, isPageBottomReached]);

    const LoadNewPosts = async (token: string) => {
        let posts = new Array<PostData>();
        let postsGetResponse = await GetFeed(token, postsOnPage.length);
        if (!postsGetResponse.success) {
            dispatch(setIsLoadingNewPosts(false));
            dispatch(setIsError(true));
            dispatch(setErrorMessage(postsGetResponse.message));
            return;
        }
        posts = postsGetResponse.data;

        let itemsArray = new Array<PostFeedItemData>();
        for (let i = 0; i < posts.length; i++) {
            const element = posts[i];
            let newElement = new PostFeedItemData();
            newElement.Index = i;
            newElement.IsRenderedOnServer = true;
            newElement.ResponseData = element;

            itemsArray.push(newElement);
        }

        dispatch(addPostsOnPage(JSON.stringify(itemsArray)));
        dispatch(setIsLoadingNewPosts(false));
    }

    return (
        <>
            <div className="pagecontainer">
                <MainPageLayout title={"Home"}>
                    <GenericSpacer height={30} />
                    <CreateNewPostPanel />
                    <GenericSpacer height={20} />
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
                    <GenericSpacer height={20} />
                    <PostsFeedError isShown={isError} message={errorMessage} />
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