import { PostsFeed } from "@/components/body/postsfeed/postsFeed";
import { GenericSpacer } from "@/components/grid/spacers/genericspacer";
import { CreateNewPostPanel } from "@/components/parts/posts/createnewpostpanel/createnewpostpanel";
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
    postIdReq: string,
    postSlugReq: number
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
                <MainPageLayout title={"Post"}>
                    <GenericSpacer height={30} />
                    <GenericSpacer height={10} />
                    <CreateNewPostPanel />
                    <GenericSpacer height={20} />
                    <p>{props.postIdReq}</p>
                    <p>{props.postSlugReq}</p>
                </MainPageLayout>
            </div>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const postIdReq = context.query.id as string;
    const postSlugReq = context.query.slug as string;

    const postGetResponse = await GetPostsBy("id", postIdReq, "id", false, 1, 0);
    if (!postGetResponse.success || postGetResponse.data.length == 0 || postGetResponse.data[0].Slug != postSlugReq) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            postIdReq,
            postSlugReq
        }
    };
}

export default UserPage;