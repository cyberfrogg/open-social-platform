import { configureStore } from '@reduxjs/toolkit';
import authLoginReducer from './slices/auth/authLoginSlice';
import authRegisterReducer from './slices/auth/authRegisterSlice';
import authEmailVerifyReducer from './slices/auth/authEmailVerifySlice';
import languageReducer from './slices/languageSlice';

export const store = configureStore({
    reducer: {
        authLogin: authLoginReducer,
        authRegister: authRegisterReducer,
        authEmailVerify: authEmailVerifyReducer,
        language: languageReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch