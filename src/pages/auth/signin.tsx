import React from 'react'
import { AuthLayout } from '@/layouts/auth/AuthLayout';
import { ControlTitle } from '@/components/controls/title/controlTitle';
import { useDispatch, useSelector } from 'react-redux';
import { ControlButton } from '@/components/controls/button/control/controlButton';
import { RootState } from '@/store';
import Link from 'next/link';
import { setLogin, setPassword } from '@/slices/auth/authLoginSlice';
import { ControlTextField } from '@/components/controls/fields/textfield/controlTextField';
import { ControlUnderTitle } from '@/components/controls/title/controlUnderTitle';
import { ControlCfCaptcha } from '@/components/controls/fields/cfcaptcha/controlCfCaptcha';

export default function SignIn() {
    const dispatch = useDispatch()

    const loginValue = useSelector((state: RootState) => state.authLogin.login);
    const isLoginError = useSelector((state: RootState) => state.authLogin.isLoginError);
    const loginErrorMessage = useSelector((state: RootState) => state.authLogin.loginErrorMessage);

    const passwordValue = useSelector((state: RootState) => state.authLogin.password);
    const isPasswordError = useSelector((state: RootState) => state.authLogin.isPasswordError);
    const passwordErrorMessage = useSelector((state: RootState) => state.authLogin.passwordErrorMessage);

    const cfCaptchaValue = useSelector((state: RootState) => state.authLogin.cfCaptcha);
    const isCfCaptchaError = useSelector((state: RootState) => state.authLogin.isCfCaptchaError);
    const cfCaptchaErrorMessage = useSelector((state: RootState) => state.authLogin.cfCaptchaErrorMessage);


    const OnLoginFieldChange = (value: string) => {
        dispatch(setLogin(value));
    }
    const OnPasswordFieldChange = (value: string) => {
        dispatch(setPassword(value));
    }
    const OnCfCaptchaFieldChange = (value: string) => {
        console.log("cf catpcha complete");
    }
    const OnSubmitButtonClick = (value: string) => {
        console.log("click");
    }

    return (
        <>
            <div className="pagecontainer">
                <AuthLayout title={"Home"}>
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
                        onChange={OnCfCaptchaFieldChange}
                    />

                    <ControlButton
                        label={"Sign in"}
                        onClick={OnSubmitButtonClick}
                    >
                        Need an account? <Link href={"/auth/join"}>Register</Link>
                    </ControlButton>
                </AuthLayout>
            </div>
        </>
    )
}
