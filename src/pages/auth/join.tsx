import React from 'react'
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
import { setCfCaptcha, setEmail, setNickname, setPassword, setPasswordConfirm, setTosAccepted } from '@/slices/auth/authRegisterSlice';

export default function Join() {
    const dispatch = useDispatch()

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


    const OnNicknameFieldChange = (value: string) => {
        dispatch(setNickname(value));
    }
    const OnEmailFieldChange = (value: string) => {
        dispatch(setEmail(value));
    }

    const OnPasswordFieldChange = (value: string) => {
        dispatch(setPassword(value));
    }
    const OnPasswordConfirmFieldChange = (value: string) => {
        dispatch(setPasswordConfirm(value));
    }

    const OnCfCaptchaFieldChange = (value: string) => {
        dispatch(setCfCaptcha(value));
    }

    const OnTosCheckarmClick = (value: boolean) => {
        dispatch(setTosAccepted(value));
    }

    const OnSubmitButtonClick = () => {
        if (!isButtonEnabled) {

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
                </AuthLayout>
            </div>
        </>
    )
}
