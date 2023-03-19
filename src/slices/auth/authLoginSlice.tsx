import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthLoginSliceState {
    login: string,
    isLoginError: boolean,
    loginErrorMessage: string
    password: string,
    isPasswordError: boolean
    passwordErrorMessage: string,
    cfcaptcha: string
}

const initialState: AuthLoginSliceState = {
    login: "",
    isLoginError: false,
    loginErrorMessage: "asd",
    password: "",
    isPasswordError: false,
    passwordErrorMessage: "",
    cfcaptcha: ""
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
    },
})

export const { setLogin, setPassword, setCfCaptcha, setIsLoginError, setIsPasswordError, setLoginErrorMessage, setPasswordErrorMessage } = authLoginSlice.actions

export default authLoginSlice.reducer