import React, { useEffect } from 'react'
import { AuthLayout } from '@/layouts/auth/AuthLayout';
import { ControlTitle } from '@/components/controls/title/controlTitle';
import { useDispatch, useSelector } from 'react-redux';
import { ControlButton } from '@/components/controls/button/control/controlButton';
import { RootState } from '@/store';
import Link from 'next/link';
import { setCfCaptcha, setCfCaptchaErrorMessage, setIsButtonEnabled, setIsCfCaptchaError, setIsLoginError, setIsPasswordError, setIsSuccess, setLogin, setLoginErrorMessage, setPassword, setPasswordErrorMessage, setResponseErrorMessage } from '@/slices/auth/authLoginSlice';
import { ControlTextField } from '@/components/controls/fields/textfield/controlTextField';
import { ControlUnderTitle } from '@/components/controls/title/controlUnderTitle';
import { ControlCfCaptcha } from '@/components/controls/fields/cfcaptcha/controlCfCaptcha';
import { SetupClientSession, ApplyClientSessionData } from '@/utils/auth/userSessionDataUtils';
import { useRouter } from 'next/router';
import IsFieldValid from '@/utils/shared/fieldvalidation';
import GetTextTranslation from '@/localization/allTranslations';
import { SequencePanel } from '@/components/grid/sequencePanel/sequencePanel';
import { SequencePanelItem } from '@/components/grid/sequencePanel/sequencePanelItem';
import UserSessionData from '@/data/sessions/userSessionData';
import ReqResponse from '@/data/shared/reqResponse';
import GetApiUrlForAction from '@/utils/shared/getApiUrlForAction';
import { ControlSimpleError } from '@/components/controls/errors/controlSimpleError';

export default function SignIn() {
    const dispatch = useDispatch();
    const router = useRouter();

    const userSession = useSelector((state: RootState) => state.authSession.session);
    const isSessionCollected = useSelector((state: RootState) => state.authSession.isSessionCollected);

    // setup usersession
    useEffect(() => {
        SetupClientSession(userSession, isSessionCollected, dispatch);
    });

    // if authorized -> return to home
    if (isSessionCollected && userSession != undefined) {
        router.push(process.env.NEXT_PUBLIC_WEBSITE_URL as string);
    }

    const language = useSelector((state: RootState) => state.language.language);

    const loginValue = useSelector((state: RootState) => state.authLogin.login);
    const isLoginError = useSelector((state: RootState) => state.authLogin.isLoginError);
    const loginErrorMessage = useSelector((state: RootState) => state.authLogin.loginErrorMessage);

    const passwordValue = useSelector((state: RootState) => state.authLogin.password);
    const isPasswordError = useSelector((state: RootState) => state.authLogin.isPasswordError);
    const passwordErrorMessage = useSelector((state: RootState) => state.authLogin.passwordErrorMessage);

    const cfCaptchaValue = useSelector((state: RootState) => state.authLogin.cfCaptcha);
    const isCfCaptchaError = useSelector((state: RootState) => state.authLogin.isCfCaptchaError);
    const cfCaptchaErrorMessage = useSelector((state: RootState) => state.authLogin.cfCaptchaErrorMessage);

    const responseErrorMessage = useSelector((state: RootState) => state.authLogin.responseErrorMessage);
    const isButtonEnabled = useSelector((state: RootState) => state.authLogin.isButtonEnabled);
    const sequencePanelIndex = 0;


    const OnLoginFieldChange = (value: string) => {
        dispatch(setLogin(value));

        const fieldValidationResult = IsFieldValid(value, "nickname");
        dispatch(setIsLoginError(!fieldValidationResult.success));
        dispatch(setLoginErrorMessage(GetTextTranslation(fieldValidationResult.message, language)));
    }
    const OnPasswordFieldChange = (value: string) => {
        dispatch(setPassword(value));

        const fieldValidationResult = IsFieldValid(value, "password");
        dispatch(setIsPasswordError(!fieldValidationResult.success));
        dispatch(setPasswordErrorMessage(GetTextTranslation(fieldValidationResult.message, language)));
    }
    const OnCfCaptchaFieldChange = (value: string) => {
        dispatch(setCfCaptcha(value));

        const fieldValidationResult = IsFieldValid(value, "turnstileCaptchaToken");
        dispatch(setIsCfCaptchaError(!fieldValidationResult.success));
        dispatch(setCfCaptchaErrorMessage(GetTextTranslation(fieldValidationResult.message, language)));
    }
    const OnSubmitButtonClick = async () => {
        if (isButtonEnabled) {
            console.log("Clicked on singin button");

            dispatch(setIsButtonEnabled(false));

            const response = await Login();
            console.log(response);

            if (!response.success) {
                OnPasswordFieldChange(passwordValue);
                OnCfCaptchaFieldChange(cfCaptchaValue);

                dispatch(setIsSuccess(false));
                dispatch(setResponseErrorMessage(GetTextTranslation(response.message, language)));

                dispatch(setIsButtonEnabled(true));
            }
            else {
                dispatch(setIsSuccess(true));
                console.log("Login success");
                ApplyClientSessionData(response.data);
                router.push(process.env.NEXT_PUBLIC_WEBSITE_URL as string);
            }
        }
    }

    const Login = async (): Promise<ReqResponse<UserSessionData>> => {
        const apiUrl = GetApiUrlForAction("user/auth/login");

        const payload = {
            "nicknameOrEmail": loginValue,
            "password": passwordValue,
            "turnstileCaptchaToken": cfCaptchaValue
        };

        try {
            //fetch
            const fetchedRequest = await fetch(apiUrl, {
                body: JSON.stringify(payload),
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                    Accept: "application/json"
                })
            });

            const fetchedJson = await fetchedRequest.json();

            return new ReqResponse(fetchedJson.success, fetchedJson.message, fetchedJson.data);
        }
        catch {
            return new ReqResponse(false, "ERRCODE_REQUEST_FAILED");
        }
    }

    return (
        <>
            <div className="pagecontainer">
                <AuthLayout title={"Sign in"}>
                    <SequencePanel panelIndex={sequencePanelIndex}>
                        <SequencePanelItem>
                            <ControlTitle weight={1} isCentered={true}>Welcome back!</ControlTitle>
                            <ControlUnderTitle isCentered={true}>Sign in here</ControlUnderTitle>

                            <ControlTextField
                                label={"Email or login name"}
                                labelname={"login"}
                                type={"login"}
                                isRequired={true}
                                isError={isLoginError}
                                errorMessage={loginErrorMessage}
                                onChange={OnLoginFieldChange}
                                value={loginValue}
                            >

                            </ControlTextField>

                            <ControlTextField
                                label={"Password"}
                                labelname={"password"}
                                type={"password"}
                                isRequired={true}
                                isError={isPasswordError}
                                errorMessage={passwordErrorMessage}
                                onChange={OnPasswordFieldChange}
                                value={passwordValue}
                            >
                                <Link href={"/auth/restore-password"}>Forgor password?</Link>
                            </ControlTextField>

                            <ControlCfCaptcha
                                isError={isCfCaptchaError}
                                errorMessage={cfCaptchaErrorMessage}
                                value={cfCaptchaValue}
                                onChange={OnCfCaptchaFieldChange}
                            />

                            <ControlButton
                                label={"Sign in"}
                                isEnabled={isButtonEnabled}
                                onClick={OnSubmitButtonClick}
                            >
                                Need an account? <Link href={"/auth/join"}>Create account</Link>
                            </ControlButton>

                            <ControlSimpleError isCentered={false}>
                                {responseErrorMessage}
                            </ControlSimpleError>
                        </SequencePanelItem>
                    </SequencePanel>
                </AuthLayout>
            </div>
        </>
    )
}
