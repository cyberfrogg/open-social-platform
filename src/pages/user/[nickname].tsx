import { PostsFeed } from "@/components/body/postsfeed/postsFeed";
import { PostContent } from "@/components/parts/posts/postcontent/postContent";
import { PostFeedItem } from "@/components/parts/posts/postfeeditem/postFeedItem";
import { ProfilePanel } from "@/components/parts/profilepanel/profilepanel";
import PostData from "@/data/post/PostData";
import { MainPageLayout } from "@/layouts/mainpage/MainPageLayout";
import { RootState } from "@/store";
import { GetPostsBy } from "@/utils/api/post/getby";
import { GetUserByNickname } from "@/utils/api/user/getUserByNickname";
import { SetupClientSession } from "@/utils/auth/userSessionDataUtils";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface IUserPageProps {
    nicknameReq: string,
    userId: number,
    isExists: string,
    profileDescription: string,
    posts: Array<PostData>
}

const UserPage: React.FC<IUserPageProps> = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const userSession = useSelector((state: RootState) => state.authSession.session);
    const isSessionCollected = useSelector((state: RootState) => state.authSession.isSessionCollected);

    // setup usersession
    useEffect(() => {
        SetupClientSession(userSession, isSessionCollected, dispatch);
    });

    return (
        <>
            <div className="pagecontainer">
                <MainPageLayout title={"User "}>
                    <ProfilePanel
                        nickname={props.nicknameReq}
                        profileDescription={props.profileDescription}
                    />
                    <PostsFeed>
                        {
                            props.posts.map((post: PostData) => {
                                return (
                                    <PostFeedItem
                                        key={post.ID}
                                        authorid={post.AuthorID}
                                    >
                                        <PostContent content={post.Content} />
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
    const nicknameReq = context.query.nickname as string;
    const userId = await GetUserByNickname(nicknameReq);
    const isExists = userId != null;
    const profileDescription = "Profile description placeholder";

    let posts = new Array<PostData>();

    if (isExists) {
        let userPostsResponse = await GetPostsBy("authorid", userId, "create_time", false, 10, 0);
        if (userPostsResponse.success && userPostsResponse.data != undefined) {
            posts = userPostsResponse.data;
        }
    }


    if (!isExists) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            nicknameReq,
            userId,
            isExists,
            profileDescription,
            posts
        }
    };
}

export default UserPage;