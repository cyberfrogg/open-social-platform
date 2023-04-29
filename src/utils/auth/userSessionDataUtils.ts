import { setCookie, getCookie, hasCookie } from 'cookies-next';
import UserSessionData from '../../data/sessions/userSessionData';

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
const SetupClientSession = (currentSessionData: UserSessionData | null, completeAction: any) => {

    if (currentSessionData != null) {
        return;
    }

    let userSessionFromCookies = GetClientSessionData();

    if (userSessionFromCookies == undefined)
        return;

    completeAction(userSessionFromCookies);
}

export { ApplyClientSessionData, GetClientSessionData, SetupClientSession }