import Head from 'next/head';
import React from 'react';
import classes from './sidebar.module.css'
import { SideBarButton } from './sidebarbutton';
import GetTextTranslation from '../../../localization/allTranslations';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface ISideBarProps {

}

export const SideBar: React.FC<ISideBarProps> = (props) => {
    const language = useSelector((state: RootState) => state.language.language);

    return (
        <aside className={classes.sidebar}>
            <nav className={classes.block}>
                <ul className={classes.blocklist}>
                    <SideBarButton href="/" iconType='home'>
                        {GetTextTranslation("PART_SIDEBAR_HOME", language)}
                    </SideBarButton>
                    <SideBarButton href="/auth/signin" iconType='empty'>
                        {GetTextTranslation("PART_SIDEBAR_SIGNIN", language)}
                    </SideBarButton>
                    <SideBarButton href="/auth/join" iconType='empty'>
                        {GetTextTranslation("PART_SIDEBAR_JOIN", language)}
                    </SideBarButton>
                </ul>
            </nav>
        </aside>
    );
}
