import { configureStore } from '@reduxjs/toolkit';
import authLoginReducer from './slices/auth/authLoginSlice';

export const store = configureStore({
    reducer: {
        authLogin: authLoginReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch