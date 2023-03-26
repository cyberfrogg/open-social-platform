import Head from 'next/head';
import React from 'react';
import classes from './sidebar.module.css'
import { SideBarButton } from './sidebarbutton';

interface ISideBarProps {

}

export const SideBar: React.FC<ISideBarProps> = (props) => {
    return (
        <aside className={classes.sidebar}>
            <nav className={classes.block}>
                <ul className={classes.blocklist}>
                    <SideBarButton href="/" iconType='home'>Home</SideBarButton>
                    <SideBarButton href="/auth/signin" iconType='empty'>Sign in</SideBarButton>
                    <SideBarButton href="/auth/join" iconType='empty'>Join</SideBarButton>
                </ul>
            </nav>
        </aside>
    );
}
