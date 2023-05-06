import { MainPageLayout } from "@/layouts/mainpage/MainPageLayout";
import { RootState } from "@/store";
import { SetupClientSession } from "@/utils/auth/userSessionDataUtils";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface IUserPageProps {
    nicknameReq: string
}

const UserPage: React.FC<IUserPageProps> = (props) => {
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
                    {props.nicknameReq}
                </MainPageLayout>
            </div>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const nicknameReq = context.query.nickname;

    return { props: { nicknameReq } };
}

export default UserPage;