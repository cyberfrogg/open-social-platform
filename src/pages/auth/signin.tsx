import React from 'react'
import { AuthLayout } from '@/layouts/auth/AuthLayout';
import { ControlTitle } from '@/components/controls/title/controlTitle';
import { useDispatch, useSelector } from 'react-redux';
import { ControlButton } from '@/components/controls/button/control/controlButton';
import { RootState } from '@/store';
import Link from 'next/link';
import { setLogin, setPassword } from '@/slices/auth/authLoginSlice';
import { ControlTextField } from '@/components/controls/fields/textfield/controlTextField';

export default function SignIn() {
    const dispatch = useDispatch()

    const loginValue = useSelector((state: RootState) => state.authLogin.login);
    const isLoginError = useSelector((state: RootState) => state.authLogin.isLoginError);
    const loginErrorMessage = useSelector((state: RootState) => state.authLogin.loginErrorMessage);

    const passwordValue = useSelector((state: RootState) => state.authLogin.password);
    const isPasswordError = useSelector((state: RootState) => state.authLogin.isPasswordError);
    const passwordErrorMessage = useSelector((state: RootState) => state.authLogin.passwordErrorMessage);


    const OnLoginFieldChange = (value: string) => {
        dispatch(setLogin(value));
    }
    const OnPasswordFieldChange = (value: string) => {
        dispatch(setPassword(value));
    }
    const OnSubmitButtonClick = (value: string) => {
        console.log("click");
    }

    return (
        <>
            <div className="pagecontainer">
                <AuthLayout title={"Home"}>
                    <ControlTitle weight={1} isCentered={true}>Welcome back!</ControlTitle>

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
                        <Link href={"/auth/restore-password"}>Forgor your password?</Link>
                    </ControlTextField>

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
