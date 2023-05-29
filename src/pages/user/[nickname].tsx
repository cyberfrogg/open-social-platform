import { PostsFeed } from "@/components/body/postsfeed/postsFeed";
import { GenericSpacer } from "@/components/grid/spacers/genericspacer";
import { CreateNewPostPanel } from "@/components/parts/posts/createnewpostpanel/createnewpostpanel";
import { PostContent } from "@/components/parts/posts/postcontent/postContent";
import { PostFeedItem } from "@/components/parts/posts/postfeeditem/postFeedItem";
import { ProfilePanel } from "@/components/parts/profilepanel/profilepanel";
import PostData from "@/data/post/PostData";
import PostFeedItemData from "@/data/post/PostFeedItemData";
import usePageBottom from "@/hooks/usePageBottom";
import { MainPageLayout } from "@/layouts/mainpage/MainPageLayout";
import { addPostsOnPage, setErrorMessage, setFeedType, setIsError, setIsLoadingNewPosts, setPostsOnPage } from "@/slices/feedSlice";
import { RootState } from "@/store";
import { GetFeed } from "@/utils/api/feed/get";
import { GetPostsBy } from "@/utils/api/post/getby";
import { GetUserByNickname } from "@/utils/api/user/getUserByNickname";
import { SetupClientSession } from "@/utils/auth/userSessionDataUtils";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostsFeedError } from '../../components/body/postsfeed/postsFeedError';

interface IUserPageProps {
    nicknameReq: string,
    userId: number,
    isExists: string,
    profileDescription: string,
    serversideItems: string
}

const UserPage: React.FC<IUserPageProps> = (props) => {
    const feedTypeName = "user";
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
        let postsGetResponse = await GetPostsBy("authorid", props.userId, "create_time", false, 10, postsOnPage.length);

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
                <MainPageLayout title={props.nicknameReq + " User"}>
                    <GenericSpacer height={30} />
                    <ProfilePanel
                        nickname={props.nicknameReq}
                        profileDescription={props.profileDescription}
                    />
                    <GenericSpacer height={10} />
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
    const nicknameReq = context.query.nickname as string;
    const userId = await GetUserByNickname(nicknameReq);
    const isExists = userId != null;
    const profileDescription = "Profile description placeholder";

    let posts = new Array<PostData>();
    let serversideItemsArray = new Array<PostFeedItemData>();

    if (isExists) {
        // getting posts
        let userPostsResponse = await GetPostsBy("authorid", userId, "create_time", false, 10, 0);
        if (userPostsResponse.success && userPostsResponse.data != undefined) {
            posts = userPostsResponse.data;
        }

        // mapping to items
        for (let i = 0; i < posts.length; i++) {
            const element = posts[i];
            let newElement = new PostFeedItemData();
            newElement.Index = i;
            newElement.IsRenderedOnServer = true;
            newElement.ResponseData = element;

            serversideItemsArray.push(newElement);
        }

        // adding empty post if northing found
        if (serversideItemsArray == null || serversideItemsArray.length == 0) {
            serversideItemsArray.push(new PostFeedItemData());
        }
    }


    if (!isExists) {
        return {
            notFound: true
        }
    }


    let serversideItems = JSON.stringify(serversideItemsArray);

    return {
        props: {
            nicknameReq,
            userId,
            isExists,
            profileDescription,
            serversideItems
        }
    };
}

export default UserPage;