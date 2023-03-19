import React from 'react'
import { AuthLayout } from '@/layouts/auth/AuthLayout';
import { ControlTitle } from '@/components/controls/title/controlTitle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ControlButton } from '@/components/controls/button/control/controlButton';
import Link from 'next/link';
import { ControlTextField } from '@/components/controls/fields/textfield/controlTextField';
import { ControlCheckmarkField } from '../../components/controls/fields/checkmark/controlCheckmark';

export default function Join() {
    const dispatch = useDispatch()

    const loginValue = "";
    const isLoginError = false;
    const loginErrorMessage = "";

    const passwordValue = "";
    const isPasswordError = false;
    const passwordErrorMessage = "";

    const tosAcceptedValue = false;
    const isTosAcceptedError = false;
    const tosAcceptedErrorMessage = "";


    const OnLoginFieldChange = (value: string) => {

    }
    const OnPasswordFieldChange = (value: string) => {

    }
    const OnTosCheckarmClick = () => {

    }
    const OnSubmitButtonClick = (value: string) => {

    }

    return (
        <>
            <div className="pagecontainer">
                <AuthLayout title={"Home"}>
                    <ControlTitle weight={1} isCentered={true}>Join open community!</ControlTitle>

                    <ControlTextField
                        label={"Username"}
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
                        label={"Email"}
                        labelname={"email"}
                        type={"email"}
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

                    </ControlTextField>

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
                        I agree <Link href={"/policy/terms-of-use"}>Terms of Use</Link> and <Link href={"/policy/privacy-policy"}>Privacy Policy</Link>
                    </ControlCheckmarkField>

                    <ControlButton
                        label={"Create account"}
                        onClick={OnSubmitButtonClick}
                    >
                        Already have an account? <Link href={"/auth/signin"}>Sign in</Link>
                    </ControlButton>
                </AuthLayout>
            </div>
        </>
    )
}
