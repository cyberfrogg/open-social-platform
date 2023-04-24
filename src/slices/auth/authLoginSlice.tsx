import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthLoginSliceState {
    login: string,
    isLoginError: boolean,
    loginErrorMessage: string

    password: string,
    isPasswordError: boolean
    passwordErrorMessage: string,

    cfcaptcha: string,
    isCfCaptchaError: boolean,
    cfCaptchaErrorMessage: string
}

const initialState: AuthLoginSliceState = {
    login: "",
    isLoginError: false,
    loginErrorMessage: "asd",

    password: "",
    isPasswordError: false,
    passwordErrorMessage: "",

    cfcaptcha: "",
    isCfCaptchaError: false,
    cfCaptchaErrorMessage: ""
}

export const authLoginSlice = createSlice({
    name: 'authLogin',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<string>) => {
            state.login = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setCfCaptcha: (state, action: PayloadAction<string>) => {
            state.cfcaptcha = action.payload;
        },

        setIsLoginError: (state, action: PayloadAction<boolean>) => {
            state.isLoginError = action.payload;
        },
        setLoginErrorMessage: (state, action: PayloadAction<string>) => {
            state.loginErrorMessage = action.payload;
        },

        setIsPasswordError: (state, action: PayloadAction<boolean>) => {
            state.isPasswordError = action.payload;
        },
        setPasswordErrorMessage: (state, action: PayloadAction<string>) => {
            state.passwordErrorMessage = action.payload;
        },

        setCfCaptchaError: (state, action: PayloadAction<boolean>) => {
            state.isCfCaptchaError = action.payload;
        },
        setCfCaptchaErrorMessage: (state, action: PayloadAction<string>) => {
            state.cfCaptchaErrorMessage = action.payload;
        },
    },
})

export const {
    setLogin,
    setPassword,
    setCfCaptcha,

    setIsLoginError,
    setLoginErrorMessage,

    setIsPasswordError,
    setPasswordErrorMessage,

    setCfCaptchaError,
    setCfCaptchaErrorMessage
} = authLoginSlice.actions

export default authLoginSlice.reducer