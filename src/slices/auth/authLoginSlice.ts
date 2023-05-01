import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthLoginSliceState {
    login: string,
    isLoginError: boolean,
    loginErrorMessage: string

    password: string,
    isPasswordError: boolean
    passwordErrorMessage: string,

    cfCaptcha: string,
    isCfCaptchaError: boolean,
    cfCaptchaErrorMessage: string,

    isButtonEnabled: boolean,
    responseErrorMessage: string,
    isSuccess: boolean
}

const initialState: AuthLoginSliceState = {
    login: "",
    isLoginError: false,
    loginErrorMessage: "asd",

    password: "",
    isPasswordError: false,
    passwordErrorMessage: "",

    cfCaptcha: "",
    isCfCaptchaError: false,
    cfCaptchaErrorMessage: "",

    isButtonEnabled: true,
    responseErrorMessage: "",
    isSuccess: false
}

export const authLoginSlice = createSlice({
    name: 'authLogin',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<string>) => {
            state.login = action.payload;
        },
        setIsLoginError: (state, action: PayloadAction<boolean>) => {
            state.isLoginError = action.payload;
        },
        setLoginErrorMessage: (state, action: PayloadAction<string>) => {
            state.loginErrorMessage = action.payload;
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

        setCfCaptcha: (state, action: PayloadAction<string>) => {
            state.cfCaptcha = action.payload;
        },
        setIsCfCaptchaError: (state, action: PayloadAction<boolean>) => {
            state.isCfCaptchaError = action.payload;
        },
        setCfCaptchaErrorMessage: (state, action: PayloadAction<string>) => {
            state.cfCaptchaErrorMessage = action.payload;
        },

        setIsButtonEnabled: (state, action: PayloadAction<boolean>) => {
            state.isButtonEnabled = action.payload;
        },

        setResponseErrorMessage: (state, action: PayloadAction<string>) => {
            state.responseErrorMessage = action.payload
        },

        setIsSuccess: (state, action: PayloadAction<boolean>) => {
            state.isSuccess = action.payload
        }
    },
})

export const {
    setLogin,
    setIsLoginError,
    setLoginErrorMessage,

    setPassword,
    setIsPasswordError,
    setPasswordErrorMessage,

    setCfCaptcha,
    setIsCfCaptchaError,
    setCfCaptchaErrorMessage,

    setIsButtonEnabled,
    setResponseErrorMessage,
    setIsSuccess

} = authLoginSlice.actions

export default authLoginSlice.reducer