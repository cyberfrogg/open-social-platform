import { SetupClientSession } from '@/utils/auth/userSessionDataUtils';
import { MainPageLayout } from '../layouts/mainpage/MainPageLayout'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { CreateNewPostPanel } from '@/components/parts/posts/createnewpostpanel/createnewpostpanel';
import { GenericSpacer } from '@/components/grid/spacers/genericspacer';

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
                    <GenericSpacer height={30} />
                    <CreateNewPostPanel />
                    <GenericSpacer height={20} />
                </MainPageLayout>
            </div>
        </>
    )
}