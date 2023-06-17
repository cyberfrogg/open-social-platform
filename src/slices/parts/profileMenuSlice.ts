import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ProfileMenuSliceState {
    isLoaded: boolean,
    isOpened: boolean,
    nickname: string
}


const initialState: ProfileMenuSliceState = {
    isLoaded: false,
    isOpened: false,
    nickname: ""
}

export const profileMenuSlice = createSlice({
    name: 'profileMenu',
    initialState,
    reducers: {
        setIsLoaded: (state, action: PayloadAction<boolean>) => {
            state.isLoaded = action.payload;
        },
        setIsOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpened = action.payload;
        },
        setNickname: (state, action: PayloadAction<string>) => {
            state.nickname = action.payload;
        }
    },
})

export const {
    setIsLoaded,
    setNickname,
    setIsOpen
} = profileMenuSlice.actions

export default profileMenuSlice.reducer