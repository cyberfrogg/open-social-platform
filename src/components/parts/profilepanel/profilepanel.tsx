import React, { useEffect } from 'react';
import classes from './profilepanel.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';

export interface IProfilePanelProps {
    nickname: string,
    profileDescription: string
}

export const ProfilePanel: React.FC<IProfilePanelProps> = (props) => {
    const dispatch = useDispatch();

    const session = useSelector((state: RootState) => state.authSession.session);
    const isSessionCollected = useSelector((state: RootState) => state.authSession.isSessionCollected);

    return (
        <section className={classes.profilepanel}>
            <div className={classes.grid}>
                <div className={classes.profileimage}>

                </div>
                <div className={classes.textinfo}>
                    <h1 className={classes.nickname}>
                        {props.nickname}
                    </h1>
                    <p className={classes.profiledescription}>
                        {props.profileDescription}
                    </p>
                </div>
            </div>
        </section>
    )
}