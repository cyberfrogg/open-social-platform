import { SetupClientSession } from '@/utils/auth/userSessionDataUtils';
import { MainPageLayout } from '../layouts/mainpage/MainPageLayout'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setAuthSession } from '@/slices/auth/authSessionSlice';
import UserSessionData from '../data/sessions/userSessionData';

export default function Home() {
    const dispatch = useDispatch();
    const userSession = useSelector((state: RootState) => state.authSession.session);

    useEffect(() => {
        SetupClientSession(userSession, (s: UserSessionData) => { dispatch(setAuthSession(s)) });
    });

    return (
        <>
            <div className="pagecontainer">
                <MainPageLayout title={"Home"}>
                    {JSON.stringify(userSession)}

                </MainPageLayout>
            </div>
        </>
    )
}