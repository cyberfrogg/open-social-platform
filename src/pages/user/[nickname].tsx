import { ProfilePanel } from "@/components/parts/profilepanel/profilepanel";
import { MainPageLayout } from "@/layouts/mainpage/MainPageLayout";
import { RootState } from "@/store";
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
        }
    };
}

export default UserPage;