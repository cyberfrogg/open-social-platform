import Head from 'next/head';
import React from 'react';
import classes from './sidebar.module.css'
import { SideBarButton } from './sidebarbutton';
import GetTextTranslation from '../../../localization/allTranslations';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ProfileMenu } from '@/components/parts/profilemenu/profilemenu';

interface ISideBarProps {

}

export const SideBar: React.FC<ISideBarProps> = (props) => {
    const language = useSelector((state: RootState) => state.language.language);
    const isSessionCollected = useSelector((state: RootState) => state.authSession.isSessionCollected);
    const session = useSelector((state: RootState) => state.authSession.session);
    const isOpened = useSelector((state: RootState) => state.sidebar.isOpened);


    const isLoggedIn = isSessionCollected && session != undefined;

    return (
        <aside className={classes.sidebar + " " + (isOpened ? classes.opened : "")}>
            <nav className={classes.block}>
                <div className={classes.mobileprofilemenu}>
                    <ProfileMenu />
                </div>
                <ul className={classes.blocklist}>
                    <SideBarButton href="/" iconType='home'>
                        {GetTextTranslation("PART_SIDEBAR_HOME", language)}
                    </SideBarButton>

                    {!isLoggedIn ? (
                        <>
                            <SideBarButton href="/auth/signin" iconType='empty'>
                                {GetTextTranslation("PART_SIDEBAR_SIGNIN", language)}
                            </SideBarButton>
                            <SideBarButton href="/auth/join" iconType='empty'>
                                {GetTextTranslation("PART_SIDEBAR_JOIN", language)}
                            </SideBarButton>
                        </>
                    ) : <></>}
                </ul>
            </nav>
        </aside>
    );
}
