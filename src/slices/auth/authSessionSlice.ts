import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import UserSessionData from '../../data/sessions/userSessionData';

export interface AuthSessionSliceState {
    session: UserSessionData | null
}

const initialState: AuthSessionSliceState = {
    session: null,
}

export const authSessionSlice = createSlice({
    name: 'authRegister',
    initialState,
    reducers: {
        setAuthSession: (state, action: PayloadAction<UserSessionData>) => {
            state.session = action.payload;
        },
    },
})

export const {
    setAuthSession
} = authSessionSlice.actions

export default authSessionSlice.reducer