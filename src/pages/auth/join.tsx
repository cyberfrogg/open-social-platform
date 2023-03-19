import React from 'react'
import { AuthLayout } from '@/layouts/auth/AuthLayout';
import { ControlTitle } from '@/components/controls/title/controlTitle';
import { ControlLoginField } from '@/components/controls/fields/loginfield/controlLoginField';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setLogin, setPassword } from '@/slices/auth/authLoginSlice';
import { ControlPasswordField } from '@/components/controls/fields/passwordfield/controlPasswordField';

export default function Join() {
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

    return (
        <>
            <div className="pagecontainer">
                <AuthLayout title={"Home"}>
                    <ControlTitle weight={1} isCentered={true}>Join open community!</ControlTitle>
                    <ControlLoginField label={"Email or login name"} isRequired={true} isError={isLoginError} errorMessage={loginErrorMessage} onChange={OnLoginFieldChange} value={loginValue} />
                    <ControlPasswordField label={"Password"} isRequired={true} isError={isPasswordError} errorMessage={passwordErrorMessage} onChange={OnPasswordFieldChange} value={passwordValue} />
                </AuthLayout>
            </div>
        </>
    )
}
