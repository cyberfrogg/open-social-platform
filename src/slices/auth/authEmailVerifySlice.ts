import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthEmailVerifySliceState {
    token: string
    isTokenError: boolean
    tokenErrorMessage: string

    cfCaptcha: string
    isCfCaptchaError: boolean
    cfCaptchaErrorMessage: string

    isButtonEnabled: boolean,
    responseErrorMessage: string,
    isSuccess: boolean
}

const initialState: AuthEmailVerifySliceState = {
    token: "",
    isTokenError: false,
    tokenErrorMessage: "",

    cfCaptcha: "",
    isCfCaptchaError: false,
    cfCaptchaErrorMessage: "",

    isButtonEnabled: true,
    responseErrorMessage: "",
    isSuccess: false
}

export const authEmailVerifySlice = createSlice({
    name: 'authEmailVerify',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setIsTokenError: (state, action: PayloadAction<boolean>) => {
            state.isTokenError = action.payload;
        },
        setTokenErrorMessage: (state, action: PayloadAction<string>) => {
            state.tokenErrorMessage = action.payload;
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
    setToken,
    setIsTokenError,
    setTokenErrorMessage,

    setCfCaptcha,
    setIsCfCaptchaError,
    setCfCaptchaErrorMessage,

    setIsButtonEnabled,

    setResponseErrorMessage,
    setIsSuccess
} = authEmailVerifySlice.actions

export default authEmailVerifySlice.reducer