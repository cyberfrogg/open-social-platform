import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import UserSessionData from '../../data/sessions/userSessionData';

export interface AuthSessionSliceState {
    session: UserSessionData | undefined,
    isSessionCollected: boolean
}

const initialState: AuthSessionSliceState = {
    session: undefined,
    isSessionCollected: false
}

export const authSessionSlice = createSlice({
    name: 'authSession',
    initialState,
    reducers: {
        setAuthSession: (state, action: PayloadAction<UserSessionData | undefined>) => {
            state.session = action.payload;
        },
        setIsSessionCollected: (state, action: PayloadAction<boolean>) => {
            state.isSessionCollected = action.payload;
        }
    },
})

export const {
    setAuthSession,
    setIsSessionCollected
} = authSessionSlice.actions

export default authSessionSlice.reducer