import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthRegisterSliceState {
    nickname: string
    isNicknameError: boolean
    nicknameErrorMessage: string

    email: string
    isEmailError: boolean
    emailErrorMessage: string

    password: string
    isPasswordError: boolean
    passwordErrorMessage: string

    passwordConfirm: string
    isPasswordConfirmError: boolean
    passwordConfirmErrorMessage: string

    cfCaptcha: string
    isCfCaptchaError: boolean
    cfCaptchaErrorMessage: string

    tosAccepted: boolean
    isTosAcceptedError: boolean
    tosAcceptedErrorMessage: string,

    isButtonEnabled: boolean
}

const initialState: AuthRegisterSliceState = {
    nickname: "",
    isNicknameError: false,
    nicknameErrorMessage: "",

    email: "",
    isEmailError: false,
    emailErrorMessage: "",

    password: "",
    isPasswordError: false,
    passwordErrorMessage: "",

    passwordConfirm: "",
    isPasswordConfirmError: false,
    passwordConfirmErrorMessage: "",

    cfCaptcha: "",
    isCfCaptchaError: false,
    cfCaptchaErrorMessage: "",

    tosAccepted: false,
    isTosAcceptedError: false,
    tosAcceptedErrorMessage: "",

    isButtonEnabled: false
}

export const authRegisterSlice = createSlice({
    name: 'authRegister',
    initialState,
    reducers: {
        setNickname: (state, action: PayloadAction<string>) => {
            state.nickname = action.payload;
        },
        setIsNicknameError: (state, action: PayloadAction<boolean>) => {
            state.isNicknameError = action.payload;
        },
        setNicknameErrorMessage: (state, action: PayloadAction<string>) => {
            state.nicknameErrorMessage = action.payload;
        },

        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setIsEmailError: (state, action: PayloadAction<boolean>) => {
            state.isEmailError = action.payload;
        },
        setEmailErrorMessage: (state, action: PayloadAction<string>) => {
            state.emailErrorMessage = action.payload;
        },

        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setIsPasswordError: (state, action: PayloadAction<boolean>) => {
            state.isPasswordError = action.payload;
        },
        setPasswordErrorMessage: (state, action: PayloadAction<string>) => {
            state.passwordErrorMessage = action.payload;
        },

        setPasswordConfirm: (state, action: PayloadAction<string>) => {
            state.passwordConfirm = action.payload;
        },
        setIsPasswordConfirmError: (state, action: PayloadAction<boolean>) => {
            state.isPasswordConfirmError = action.payload;
        },
        setPasswordConfirmErrorMessage: (state, action: PayloadAction<string>) => {
            state.passwordConfirmErrorMessage = action.payload;
        },

        setCfCaptcha: (state, action: PayloadAction<string>) => {
            state.cfCaptcha = action.payload;
        },
        setCfCaptchaError: (state, action: PayloadAction<boolean>) => {
            state.isCfCaptchaError = action.payload;
        },
        setCfCaptchaErrorMessage: (state, action: PayloadAction<string>) => {
            state.cfCaptchaErrorMessage = action.payload;
        },

        setTosAccepted: (state, action: PayloadAction<boolean>) => {
            state.tosAccepted = action.payload;
        },
        setIsTosAcceptedError: (state, action: PayloadAction<boolean>) => {
            state.isTosAcceptedError = action.payload;
        },
        setTosAcceptedErrorMessage: (state, action: PayloadAction<string>) => {
            state.tosAcceptedErrorMessage = action.payload;
        },

        setIsButtonEnabled: (state, action: PayloadAction<boolean>) => {
            state.isButtonEnabled = action.payload;
        },
    },
})

export const {
    setNickname,
    setIsNicknameError,
    setNicknameErrorMessage,

    setEmail,
    setIsEmailError,
    setEmailErrorMessage,

    setPassword,
    setIsPasswordError,
    setPasswordErrorMessage,

    setPasswordConfirm,
    setIsPasswordConfirmError,
    setPasswordConfirmErrorMessage,

    setCfCaptcha,
    setCfCaptchaError,
    setCfCaptchaErrorMessage,

    setTosAccepted,
    setIsTosAcceptedError,
    setTosAcceptedErrorMessage,

    setIsButtonEnabled
} = authRegisterSlice.actions

export default authRegisterSlice.reducer