import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SidebarSliceState {
    isOpened: boolean
}

const initialState: SidebarSliceState = {
    isOpened: false
}

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setIsOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpened = action.payload;
        },
        toggle: (state) => {
            state.isOpened = !state.isOpened;
        },
    },
})

export const {
    setIsOpen,
    toggle
} = sidebarSlice.actions

export default sidebarSlice.reducer