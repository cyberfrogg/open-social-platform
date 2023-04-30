import React, { useEffect } from 'react'
import { AuthLayout } from '@/layouts/auth/AuthLayout';
import { ControlTitle } from '@/components/controls/title/controlTitle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ControlButton } from '@/components/controls/button/control/controlButton';
import Link from 'next/link';
import { ControlTextField } from '@/components/controls/fields/textfield/controlTextField';
import { ControlCheckmarkField } from '../../components/controls/fields/checkmark/controlCheckmark';
import { ControlCfCaptcha } from '@/components/controls/fields/cfcaptcha/controlCfCaptcha';
import { ControlUnderTitle } from '@/components/controls/title/controlUnderTitle';
import { setCfCaptcha, setCfCaptchaErrorMessage, setEmail, setEmailErrorMessage, setIsButtonEnabled, setIsCfCaptchaError, setIsEmailError, setIsNicknameError, setIsPasswordConfirmError, setIsPasswordError, setIsSuccess, setIsTosAcceptedError, setNickname, setNicknameErrorMessage, setPassword, setPasswordConfirm, setPasswordConfirmErrorMessage, setPasswordErrorMessage, setResponseErrorMessage, setTosAccepted, setTosAcceptedErrorMessage } from '@/slices/auth/authRegisterSlice';
import IsFieldValid from '@/utils/shared/fieldvalidation';
import GetTextTranslation from '@/localization/allTranslations';
import GetApiUrlForAction from '@/utils/shared/getApiUrlForAction';
import ReqResponse from '@/data/shared/reqResponse';
import { ControlSimpleError } from '@/components/controls/errors/controlSimpleError';
import { SequencePanel } from '@/components/grid/sequencePanel/sequencePanel';
import { SequencePanelItem } from '@/components/grid/sequencePanel/sequencePanelItem';
import { SetupClientSession } from '@/utils/auth/userSessionDataUtils';
import { useRouter } from 'next/router';

export default function Join() {
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

    const nicknameValue = useSelector((state: RootState) => state.authRegister.nickname);
    const isNicknameError = useSelector((state: RootState) => state.authRegister.isNicknameError);
    const nicknameErrorMessage = useSelector((state: RootState) => state.authRegister.nicknameErrorMessage);

    const emailValue = useSelector((state: RootState) => state.authRegister.email);
    const isEmailError = useSelector((state: RootState) => state.authRegister.isEmailError);
    const emailErrorMessage = useSelector((state: RootState) => state.authRegister.emailErrorMessage);

    const passwordValue = useSelector((state: RootState) => state.authRegister.password);
    const isPasswordError = useSelector((state: RootState) => state.authRegister.isPasswordError);
    const passwordErrorMessage = useSelector((state: RootState) => state.authRegister.passwordErrorMessage);

    const passwordConfirmValue = useSelector((state: RootState) => state.authRegister.passwordConfirm);
    const isPasswordConfirmError = useSelector((state: RootState) => state.authRegister.isPasswordConfirmError);
    const passwordConfirmErrorMessage = useSelector((state: RootState) => state.authRegister.passwordConfirmErrorMessage);

    const cfCaptchaValue = useSelector((state: RootState) => state.authRegister.cfCaptcha);
    const isCfCaptchaError = useSelector((state: RootState) => state.authRegister.isCfCaptchaError);
    const cfCaptchaErrorMessage = useSelector((state: RootState) => state.authRegister.cfCaptchaErrorMessage);

    const tosAcceptedValue = useSelector((state: RootState) => state.authRegister.tosAccepted);
    const isTosAcceptedError = useSelector((state: RootState) => state.authRegister.isTosAcceptedError);
    const tosAcceptedErrorMessage = useSelector((state: RootState) => state.authRegister.tosAcceptedErrorMessage);

    const isButtonEnabled = useSelector((state: RootState) => state.authRegister.isButtonEnabled);

    const responseErrorMessage = useSelector((state: RootState) => state.authRegister.responseErrorMessage);

    const isSuccess = useSelector((state: RootState) => state.authRegister.isSuccess);
    const sequencePanelIndex = isSuccess ? 1 : 0;


    // fields working properly
    const OnNicknameFieldChange = (value: string) => {
        dispatch(setNickname(value));

        const fieldValidationResult = IsFieldValid(value, "nickname");
        dispatch(setIsNicknameError(!fieldValidationResult.success));
        dispatch(setNicknameErrorMessage(GetTextTranslation(fieldValidationResult.message, language)));
    }
    const OnEmailFieldChange = (value: string) => {
        dispatch(setEmail(value));

        const fieldValidationResult = IsFieldValid(value, "email");
        dispatch(setIsEmailError(!fieldValidationResult.success));
        dispatch(setEmailErrorMessage(GetTextTranslation(fieldValidationResult.message, language)));
    }

    const OnPasswordFieldChange = (value: string) => {
        dispatch(setPassword(value));

        const fieldValidationResult = IsFieldValid(value, "password");
        dispatch(setIsPasswordError(!fieldValidationResult.success));
        dispatch(setPasswordErrorMessage(GetTextTranslation(fieldValidationResult.message, language)));
    }

    const OnPasswordConfirmFieldChange = (value: string) => {
        dispatch(setPasswordConfirm(value));

        const isPasswordsEquals = passwordValue == value;
        const isPasswordsEqualsMessage = isPasswordsEquals ? "" : GetTextTranslation("ERRVALID_PASSWORDS_NOT_EQUALS", language);

        dispatch(setIsPasswordConfirmError(!isPasswordsEquals));
        dispatch(setPasswordConfirmErrorMessage(isPasswordsEqualsMessage));
    }

    const OnCfCaptchaFieldChange = (value: string) => {
        dispatch(setCfCaptcha(value));

        const fieldValidationResult = IsFieldValid(value, "turnstileCaptchaToken");
        dispatch(setIsCfCaptchaError(!fieldValidationResult.success));
        dispatch(setCfCaptchaErrorMessage(GetTextTranslation(fieldValidationResult.message, language)));
    }

    const OnTosCheckarmClick = (value: boolean) => {
        dispatch(setTosAccepted(value));

        const errorMessage = value ? "" : GetTextTranslation("ERRVALID_TOS_NOT_ACCEPTED", language);

        dispatch(setIsTosAcceptedError(!value));
        dispatch(setTosAcceptedErrorMessage(errorMessage));
    }

    // submit button
    const OnSubmitButtonClick = async () => {
        if (isButtonEnabled) {
            console.log("Clicked on submit button");

            dispatch(setIsButtonEnabled(false));

            const response = await Register();

            if (!response.success) {
                OnNicknameFieldChange(nicknameValue);
                OnEmailFieldChange(emailValue);
                OnPasswordFieldChange(passwordValue);
                OnPasswordConfirmFieldChange(passwordConfirmValue);
                OnCfCaptchaFieldChange(cfCaptchaValue);
                OnTosCheckarmClick(tosAcceptedValue);

                dispatch(setIsSuccess(false));
                dispatch(setResponseErrorMessage(GetTextTranslation(response.message, language)));
            }
            else {
                dispatch(setIsSuccess(true));
                console.log("Registration success. Verification email sent");
            }

            dispatch(setIsButtonEnabled(true));
        }
    }

    // api call
    const Register = async (): Promise<ReqResponse<boolean>> => {
        const apiUrl = GetApiUrlForAction("user/auth/register");

        const payload = {
            "nickname": nicknameValue,
            "email": emailValue,
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

            return new ReqResponse(fetchedJson.success, fetchedJson.message, fetchedJson.success);
        }
        catch {
            return new ReqResponse(false, "ERRCODE_REQUEST_FAILED");
        }
    }

    return (
        <>
            <div className="pagecontainer">
                <AuthLayout title={"Create Account"}>
                    <SequencePanel panelIndex={sequencePanelIndex}>
                        <SequencePanelItem>
                            <ControlTitle weight={1} isCentered={true}>Join Open Community!</ControlTitle>
                            <ControlUnderTitle isCentered={true}>Fill in fields and Create an Account</ControlUnderTitle>

                            <ControlTextField
                                label={"Nickname"}
                                labelname={"login"}
                                type={"login"}
                                isRequired={true}
                                isError={isNicknameError}
                                errorMessage={nicknameErrorMessage}
                                onChange={OnNicknameFieldChange}
                                value={nicknameValue}
                            >

                            </ControlTextField>

                            <ControlTextField
                                label={"E-mail"}
                                labelname={"email"}
                                type={"email"}
                                isRequired={true}
                                isError={isEmailError}
                                errorMessage={emailErrorMessage}
                                onChange={OnEmailFieldChange}
                                value={emailValue}
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

                            </ControlTextField>


                            <ControlTextField
                                label={"Confirm Password"}
                                labelname={"password"}
                                type={"password"}
                                isRequired={true}
                                isError={isPasswordConfirmError}
                                errorMessage={passwordConfirmErrorMessage}
                                onChange={OnPasswordConfirmFieldChange}
                                value={passwordConfirmValue}
                            >

                            </ControlTextField>

                            <ControlCfCaptcha
                                isError={isCfCaptchaError}
                                errorMessage={cfCaptchaErrorMessage}
                                value={cfCaptchaValue}
                                onChange={OnCfCaptchaFieldChange}
                            />

                            <ControlCheckmarkField
                                label={"Accept Terms of Use and Privacy Policy"}
                                labelname={"tosandprivacypolicy"}
                                type={"checkmark"}
                                isRequired={true}
                                isError={isTosAcceptedError}
                                errorMessage={tosAcceptedErrorMessage}
                                onClick={OnTosCheckarmClick}
                                value={tosAcceptedValue}
                            >
                                I accept <Link href={"/policy/terms-of-use"}>Terms of Use</Link> and <Link href={"/policy/privacy-policy"}>Privacy Policy</Link>
                            </ControlCheckmarkField>

                            <ControlButton
                                label={"Create account"}
                                onClick={OnSubmitButtonClick}
                                isEnabled={isButtonEnabled}
                            >
                                Already have an account? <Link href={"/auth/signin"}>Sign in</Link>
                            </ControlButton>

                            <ControlSimpleError isCentered={false}>
                                {responseErrorMessage}
                            </ControlSimpleError>
                        </SequencePanelItem>
                        <SequencePanelItem>
                            <ControlTitle weight={1} isCentered={true}>Registration almost Done!</ControlTitle>
                            <ControlUnderTitle isCentered={true}>Now, check your e-mail for further instructions!</ControlUnderTitle>

                            <div style={{ display: "flex", justifyContent: "center", marginTop: 130, marginBottom: 130 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="158" height="105" viewBox="0 0 158 105" fill="none">
                                    <path d="M90.5 91H23.0695C16.0515 91 12.5372 91 9.85406 89.6311C7.49158 88.4259 5.57222 86.5007 4.36847 84.1353C3 81.4461 3 77.9276 3 70.8869V23.1155C3 16.0749 3 12.5519 4.36847 9.86272C5.57222 7.49726 7.49158 5.57547 9.85406 4.3702C12.5398 3 16.0583 3 23.0901 3H95.9123C102.944 3 106.455 3 109.141 4.3702C111.503 5.57547 113.429 7.49726 114.633 9.86272C116 12.5493 116 22.9731 116 30M9.27778 9.28571L47.6202 38.2771L47.6329 38.2877C51.8904 41.4138 54.0204 42.9777 56.3533 43.5819C58.4154 44.1159 60.583 44.1159 62.645 43.5819C64.98 42.9772 67.1162 41.4087 71.3812 38.2771C71.3812 38.2771 95.9744 19.3802 109.722 9.28571" stroke="#8D65FF" strokeWidth="6" strokeLinecap="round" />
                                    <path d="M75.6477 59.3624C74.3885 58.2495 75.0725 56.2376 76.7756 56.0446L100.908 53.3089C101.602 53.2302 102.205 52.8136 102.498 52.207L112.677 31.1165C113.395 29.628 115.609 29.6277 116.327 31.1162L126.506 52.2066C126.799 52.8132 127.398 53.2309 128.092 53.3096L152.226 56.0446C153.929 56.2376 154.611 58.2501 153.352 59.363L135.512 75.1334C134.999 75.587 134.77 76.2621 134.907 76.9173L139.641 99.6978C139.975 101.306 138.185 102.551 136.689 101.751L115.483 90.4033C114.874 90.077 114.133 90.0785 113.523 90.4048L92.3152 101.748C90.8187 102.548 89.0251 101.306 89.3594 99.6978L94.0947 76.9188C94.231 76.2635 94.0031 75.5868 93.4899 75.1333L75.6477 59.3624Z" stroke="#FFE55F" strokeWidth="6" strokeLinecap="round" />
                                </svg>
                            </div>

                            <ControlUnderTitle isCentered={true}>You can close this page</ControlUnderTitle>
                        </SequencePanelItem>
                    </SequencePanel>
                </AuthLayout>
            </div>
        </>
    );
}

