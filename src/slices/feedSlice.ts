import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import PostFeedItemData from '@/data/post/PostFeedItemData';

export interface FeedSliceState {
    isServerLoadComplete: boolean;
    isLoadingNewPosts: boolean;
    postsOnPage: Array<PostFeedItemData>;
}

const initialState: FeedSliceState = {
    isServerLoadComplete: false,
    isLoadingNewPosts: false,
    postsOnPage: new Array<PostFeedItemData>()
}

export const languageSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        setPostsOnPage: (state, action: PayloadAction<string>) => {
            const deserializedJson = JSON.parse(action.payload) as Array<PostFeedItemData>;
            state.postsOnPage = deserializedJson;
            state.postsOnPage = FixIndexes(state.postsOnPage);
        },
        replacePostAtIndex: (state, action: PayloadAction<string>) => {
            const deserializedJson = JSON.parse(action.payload);
            const index = deserializedJson.index;
            const postFeedItem = deserializedJson.postFeedItem;
            state.postsOnPage[index] = postFeedItem;
            state.postsOnPage = FixIndexes(state.postsOnPage);
        },
        addPostsOnPage: (state, action: PayloadAction<string>) => {
            const deserializedJson = JSON.parse(action.payload) as Array<PostFeedItemData>;
            state.postsOnPage = state.postsOnPage.concat(deserializedJson);
            state.postsOnPage = FixIndexes(state.postsOnPage);
        },
        addPostOnPage: (state, action: PayloadAction<string>) => {
            let deserializedJson = JSON.parse(action.payload) as PostFeedItemData;
            state.postsOnPage.push(deserializedJson);
            state.postsOnPage = FixIndexes(state.postsOnPage);
        },
        setIsServerLoadComplete: (state, action: PayloadAction<boolean>) => {
            state.isServerLoadComplete = action.payload;
        },
        setIsLoadingNewPosts: (state, action: PayloadAction<boolean>) => {
            state.isLoadingNewPosts = action.payload;
        },
    },
});

const FixIndexes = (data: Array<PostFeedItemData>): Array<PostFeedItemData> => {
    for (let i = 0; i < data.length; i++) {
        data[i].Index = i;
    }
    return data;
}

export const {
    setPostsOnPage,
    replacePostAtIndex,
    addPostsOnPage,
    addPostOnPage,
    setIsServerLoadComplete,
    setIsLoadingNewPosts
} = languageSlice.actions

export default languageSlice.reducer