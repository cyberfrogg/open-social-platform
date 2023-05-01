import { setCookie, getCookie, hasCookie } from 'cookies-next';
import UserSessionData from '../../data/sessions/userSessionData';
import { Dispatch } from 'react';
import { AnyAction } from '@reduxjs/toolkit';
import { setAuthSession, setIsSessionCollected } from '@/slices/auth/authSessionSlice';

const ApplyClientSessionData = (sessioData: UserSessionData) => {
    let raw = JSON.stringify(sessioData);
    raw = Buffer.from(raw).toString("base64");
    setCookie("session", raw);
}

const GetClientSessionData = (): UserSessionData | undefined => {
    try {
        if (!hasCookie("session"))
            return undefined;

        let cookie = getCookie("session");

        if (cookie == undefined || cookie == "")
            return undefined;

        let raw = cookie as string;

        raw = Buffer.from(raw, "base64").toString("ascii");
        let parsed = JSON.parse(raw) as UserSessionData;

        return parsed;
    }
    catch (e) {
        console.error(e);
        return undefined;
    }
}

// To setup session state in useEffect. Call it on every page in useEffect
const SetupClientSession = (currentSessionData: UserSessionData | undefined, isSessionCollected: boolean, dispatch: Dispatch<AnyAction>) => {

    if (isSessionCollected) {
        return;
    }

    let userSessionFromCookies = GetClientSessionData();

    dispatch(setIsSessionCollected(true))
    dispatch(setAuthSession(userSessionFromCookies))
}

export { ApplyClientSessionData, GetClientSessionData, SetupClientSession }