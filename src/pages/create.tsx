import { SetupClientSession } from '@/utils/auth/userSessionDataUtils';
import { MainPageLayout } from '../layouts/mainpage/MainPageLayout'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { GenericSpacer } from '@/components/grid/spacers/genericspacer';
import { CreateEditorPanel } from '@/components/body/createeditorpanel/createeditorpanel';

export default function CreatePage() {
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
                <MainPageLayout title={"Create"}>
                    <GenericSpacer height={30} />
                    <CreateEditorPanel />
                </MainPageLayout>
            </div>
        </>
    )
}