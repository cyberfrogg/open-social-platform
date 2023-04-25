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
import { setCfCaptcha, setCfCaptchaErrorMessage, setEmail, setEmailErrorMessage, setIsButtonEnabled, setIsEmailError, setIsNicknameError, setIsPasswordConfirmError, setIsPasswordError, setIsSuccess, setIsTosAcceptedError, setNickname, setNicknameErrorMessage, setPassword, setPasswordConfirm, setPasswordConfirmErrorMessage, setPasswordErrorMessage, setResponseErrorMessage, setTosAccepted, setTosAcceptedErrorMessage } from '@/slices/auth/authRegisterSlice';
import IsFieldValid from '@/utils/shared/fieldvalidation';
import GetTextTranslation from '@/localization/allTranslations';
import GetApiUrlForAction from '@/utils/shared/getApiUrlForAction';
import ReqResponse from '@/data/shared/reqResponse';
import { ControlSimpleError } from '@/components/controls/errors/controlSimpleError';

export default function Join() {
    const dispatch = useDispatch();

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
        dispatch(setIsPasswordConfirmError(!fieldValidationResult.success));
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
                <AuthLayout title={"Home"}>
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
                </AuthLayout>
            </div>
        </>
    );
}

