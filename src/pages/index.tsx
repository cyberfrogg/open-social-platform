import { SetupClientSession } from '@/utils/auth/userSessionDataUtils';
import { MainPageLayout } from '../layouts/mainpage/MainPageLayout'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function Home() {
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
                <MainPageLayout title={"Home"}>

                </MainPageLayout>
            </div>
        </>
    )
}