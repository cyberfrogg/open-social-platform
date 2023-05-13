import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import IPostContentNodeData from '../data/shared/postcontent/IPostContentNodeData';
import PostContentData from '../data/shared/postcontent/postContentData';

export interface CreateEditorSliceState {
    postContentDataJson: string,
}

const initialState: CreateEditorSliceState = {
    postContentDataJson: JSON.stringify(new PostContentData())
}

export const createEditorSlice = createSlice({
    name: 'createEditor',
    initialState,
    reducers: {
        addEditorNodeToEnd: (state, action: PayloadAction<string>) => {
            const postContentData = JSON.parse(state.postContentDataJson) as PostContentData;
            const paylaod = JSON.parse(action.payload) as IPostContentNodeData;
            postContentData.nodes.push(paylaod);
            state.postContentDataJson = JSON.stringify(postContentData);
        },
        selectNode: (state, action: PayloadAction<number>) => {
            const postContentData = JSON.parse(state.postContentDataJson) as PostContentData;

            const node = postContentData.nodes.find((node) => { return node.editor.index == action.payload });
            if (node == undefined) {
                console.error("Failed to select node for index " + action.payload);
                return;
            }

            node.editor.isSelected = true;
            state.postContentDataJson = JSON.stringify(postContentData);
        },
        deselectAll: (state, action: PayloadAction) => {
            const postContentData = JSON.parse(state.postContentDataJson) as PostContentData;
            postContentData.nodes.forEach(node => {
                node.editor.isSelected = false;
            });
            state.postContentDataJson = JSON.stringify(postContentData);
        },
    },
})

export const {
    addEditorNodeToEnd,
    selectNode,
    deselectAll
} = createEditorSlice.actions

export default createEditorSlice.reducer