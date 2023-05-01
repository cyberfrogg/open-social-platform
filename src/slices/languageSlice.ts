import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface LanguageSliceState {
    language: string,
}

const initialState: LanguageSliceState = {
    language: "en",
}

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        },
    },
})

export const {
    setLanguage
} = languageSlice.actions

export default languageSlice.reducer