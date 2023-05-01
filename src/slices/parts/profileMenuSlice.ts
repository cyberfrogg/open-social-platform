import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ProfileMenuSliceState {
    isLoaded: boolean,
    nickname: string
}


const initialState: ProfileMenuSliceState = {
    isLoaded: false,
    nickname: ""
}

export const profileMenuSlice = createSlice({
    name: 'profileMenu',
    initialState,
    reducers: {
        setIsLoaded: (state, action: PayloadAction<boolean>) => {
            state.isLoaded = action.payload;
        },
        setNickname: (state, action: PayloadAction<string>) => {
            state.nickname = action.payload;
        }
    },
})

export const {
    setIsLoaded,
    setNickname
} = profileMenuSlice.actions

export default profileMenuSlice.reducer