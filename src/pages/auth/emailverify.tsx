import React, { useEffect } from 'react'
import { AuthLayout } from '@/layouts/auth/AuthLayout';
import { ControlTitle } from '@/components/controls/title/controlTitle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ControlButton } from '@/components/controls/button/control/controlButton';
import { ControlTextField } from '@/components/controls/fields/textfield/controlTextField';
import { ControlCfCaptcha } from '@/components/controls/fields/cfcaptcha/controlCfCaptcha';
import { ControlUnderTitle } from '@/components/controls/title/controlUnderTitle';
import { ControlSimpleError } from '@/components/controls/errors/controlSimpleError';
import { SequencePanel } from '@/components/grid/sequencePanel/sequencePanel';
import { SequencePanelItem } from '@/components/grid/sequencePanel/sequencePanelItem';
import { setCfCaptcha, setCfCaptchaErrorMessage, setIsButtonEnabled, setIsCfCaptchaError, setIsSuccess, setIsTokenError, setResponseErrorMessage, setToken, setTokenErrorMessage } from '@/slices/auth/authEmailVerifySlice';
import IsFieldValid from '@/utils/shared/fieldvalidation';
import GetTextTranslation from '@/localization/allTranslations';
import { useRouter } from 'next/router';
import ReqResponse from '@/data/shared/reqResponse';
import GetApiUrlForAction from '@/utils/shared/getApiUrlForAction';
import UserSessionData from '@/data/sessions/userSessionData';
import Sleep from '../../utils/shared/sleep';
import { ApplyClientSessionData } from '@/utils/auth/userSessionDataUtils';

export default function EmailVerify() {
    const dispatch = useDispatch();
    const router = useRouter();
    const routerQuery = router.query;
    const redirectPageAfterSuccess = "/";

    const language = useSelector((state: RootState) => state.language.language);

    const tokenValue = useSelector((state: RootState) => state.authEmailVerify.token);
    const isTokenError = useSelector((state: RootState) => state.authEmailVerify.isTokenError);
    const tokenErrorMessage = useSelector((state: RootState) => state.authEmailVerify.tokenErrorMessage);

    const cfCaptchaValue = useSelector((state: RootState) => state.authEmailVerify.cfCaptcha);
    const isCfCaptchaError = useSelector((state: RootState) => state.authEmailVerify.isCfCaptchaError);
    const cfCaptchaErrorMessage = useSelector((state: RootState) => state.authEmailVerify.cfCaptchaErrorMessage);

    const responseErrorMessage = useSelector((state: RootState) => state.authEmailVerify.responseErrorMessage);
    const isButtonEnabled = useSelector((state: RootState) => state.authEmailVerify.isButtonEnabled);

    const isSuccess = useSelector((state: RootState) => state.authEmailVerify.isSuccess);
    const sequencePanelIndex = isSuccess ? 1 : 0;


    const OnTokenFieldChange = (value: string) => {
        dispatch(setToken(value));

        const fieldValidationResult = IsFieldValid(value, "verificationToken");
        dispatch(setIsTokenError(!fieldValidationResult.success));
        dispatch(setTokenErrorMessage(GetTextTranslation(fieldValidationResult.message, language)));
    }

    const OnCfCaptchaFieldChange = (value: string) => {
        dispatch(setCfCaptcha(value));

        const fieldValidationResult = IsFieldValid(value, "turnstileCaptchaToken");
        dispatch(setIsCfCaptchaError(!fieldValidationResult.success));
        dispatch(setCfCaptchaErrorMessage(GetTextTranslation(fieldValidationResult.message, language)));
    }

    // submit button
    const OnSubmitButtonClick = async () => {
        if (isButtonEnabled) {
            console.log("Clicked on submit button");

            dispatch(setIsButtonEnabled(false));

            const response = await VerifyEmail();

            if (!response.success || response.data == null) {
                OnTokenFieldChange(tokenValue);
                OnCfCaptchaFieldChange(cfCaptchaValue);

                dispatch(setIsSuccess(false));
                dispatch(setResponseErrorMessage(GetTextTranslation(response.message, language)));
            }
            else {
                dispatch(setIsSuccess(true));
                console.log("Email verification done!");
                console.log(response.data);

                await Sleep(3000);

                ApplyClientSessionData(response.data);

                router.push(redirectPageAfterSuccess);
            }

            dispatch(setIsButtonEnabled(true));
        }
    }

    const VerifyEmail = async (): Promise<ReqResponse<UserSessionData>> => {
        const apiUrl = GetApiUrlForAction("user/auth/verifyemail");

        const payload = {
            "verificationToken": tokenValue,
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

    useEffect(() => {
        if (tokenValue == "") {
            if (router.query.token != null && router.query.token != "") {
                OnTokenFieldChange(router.query.token as string);
            }
        }
    }, [routerQuery]);  // warning here. idk why. ill just let it be here



    return (
        <>
            <div className="pagecontainer">
                <AuthLayout title={"Home"}>
                    <SequencePanel panelIndex={sequencePanelIndex}>
                        <SequencePanelItem>
                            <ControlTitle weight={1} isCentered={true}>Verify your email</ControlTitle>
                            <ControlUnderTitle isCentered={true}>Enter token manually or it will be inserted automatically</ControlUnderTitle>

                            <ControlTextField
                                label={"Token"}
                                labelname={"login"}
                                type={"password"}
                                isRequired={true}
                                isError={isTokenError}
                                errorMessage={tokenErrorMessage}
                                onChange={OnTokenFieldChange}
                                value={tokenValue}
                            >

                            </ControlTextField>

                            <ControlCfCaptcha
                                isError={isCfCaptchaError}
                                errorMessage={cfCaptchaErrorMessage}
                                value={cfCaptchaValue}
                                onChange={OnCfCaptchaFieldChange}
                            />

                            <ControlButton
                                label={"Verify Email"}
                                onClick={OnSubmitButtonClick}
                                isEnabled={isButtonEnabled}
                            >

                            </ControlButton>

                            <ControlSimpleError isCentered={false}>
                                {responseErrorMessage}
                            </ControlSimpleError>
                        </SequencePanelItem>
                        <SequencePanelItem>
                            <ControlTitle weight={1} isCentered={true}>Email Verification Done!</ControlTitle>
                            <ControlUnderTitle isCentered={true}>Now you can fully use this website!</ControlUnderTitle>

                            <div style={{ display: "flex", justifyContent: "center", marginTop: 130, marginBottom: 130 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="135" height="95" viewBox="0 0 135 95" fill="none">
                                    <path d="M90.5 91H23.0695C16.0515 91 12.5372 91 9.85406 89.6311C7.49158 88.4259 5.57222 86.5007 4.36847 84.1353C3 81.4461 3 77.9276 3 70.8869V23.1155C3 16.0749 3 12.5519 4.36847 9.86272C5.57222 7.49726 7.49158 5.57547 9.85406 4.3702C12.5398 3 16.0583 3 23.0901 3H95.9123C102.944 3 106.455 3 109.141 4.3702C111.503 5.57547 113.429 7.49726 114.633 9.86272C116 12.5493 114.633 59.9731 114.633 67M9.27778 9.28571L47.6202 38.2771L47.6329 38.2877C51.8904 41.4138 54.0204 42.9777 56.3533 43.5819C58.4154 44.1159 60.583 44.1159 62.645 43.5819C64.98 42.9772 67.1162 41.4087 71.3812 38.2771C71.3812 38.2771 95.9744 19.3802 109.722 9.28571" stroke="#8D65FF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M71 70.0001L91.0014 91L131 49" stroke="#33FF54" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            <ControlUnderTitle isCentered={true}>You will be redirected in 3 seconds...</ControlUnderTitle>
                        </SequencePanelItem>
                    </SequencePanel>
                </AuthLayout>
            </div>
        </>
    );
}

