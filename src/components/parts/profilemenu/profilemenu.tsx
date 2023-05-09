import React, { useEffect } from 'react';
import classes from './profilemenu.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { GetNicknameById } from '@/utils/api/user/getNickname';
import { setIsLoaded, setIsOpen, setNickname } from '@/slices/parts/profileMenuSlice';
import Link from 'next/link';
import { ProfileMenuButton } from './profilemenubutton';
import { GetUserUrlFromId } from '@/utils/routing/getuserurl';

export interface IProfileMenuProps {

}

export const ProfileMenu: React.FC<IProfileMenuProps> = (props) => {
    const dispatch = useDispatch();

    const session = useSelector((state: RootState) => state.authSession.session);
    const isSessionCollected = useSelector((state: RootState) => state.authSession.isSessionCollected);

    const nickname = useSelector((state: RootState) => state.profileMenu.nickname);
    const nicknamePageUrl = GetUserUrlFromId(nickname);
    const isOpened = useSelector((state: RootState) => state.profileMenu.isOpened);
    const isLoaded = useSelector((state: RootState) => state.profileMenu.isLoaded);

    useEffect(() => {
        if (!isSessionCollected)
            return;

        if (isLoaded)
            return;

        setupComponent();
    });

    const setupComponent = async () => {
        if (session == undefined)
            return;

        const collectedNickname = await GetNicknameById(session.UserId);
        dispatch(setNickname(collectedNickname));
        dispatch(setIsLoaded(true));
    }

    //handle click
    const onProfileMenuClick = () => {
        dispatch(setIsOpen(!isOpened));
    }

    let actionListClass = classes.actionslist;
    if (isOpened) {
        actionListClass += " " + classes.open;
    }

    // is logged in
    if (isSessionCollected && session) {
        return (
            <div className={classes.profilemenu}>
                <div className={classes.container} onClick={onProfileMenuClick}>
                    <div className={classes.avatar}>

                    </div>
                    <div className={classes.username}>
                        <p>
                            {nickname}
                        </p>
                    </div>
                    <div className={classes.dropdownbutton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 16 9" fill="none">
                            <path d="M15 1L8 8L1 1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

                <nav className={actionListClass}>
                    <ul className={classes.actionlistul}>
                        <ProfileMenuButton href={nicknamePageUrl} iconType='profile'>
                            My profile
                        </ProfileMenuButton>
                        <ProfileMenuButton href="/auth/logout" iconType='logout'>
                            logout
                        </ProfileMenuButton>
                    </ul>
                </nav>
            </div>
        )
    }
    else    // is not logged in
    {
        return (
            <div className={classes.profilemenuloggedout}>
                <div className={classes.containerloggedout}>
                    <Link className={classes.loggedoutbutton} href={'/auth/signin'}>
                        Sign in
                    </Link>
                    <Link className={classes.loggedoutbutton} href={'/auth/join'}>
                        Join
                    </Link>
                </div>
            </div>
        )
    }
}