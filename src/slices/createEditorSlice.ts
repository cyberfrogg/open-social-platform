import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import IPostContentNodeData from '../data/shared/postcontent/IPostContentNodeData';
import PostContentData from '../data/shared/postcontent/postContentData';
import PostContentNodeParagraphData from '@/data/shared/postcontent/nodes/PostContentNodeParagraphData';
import PostContentNodeTextData from '../data/shared/postcontent/nodes/PostContentNodeTextData';

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
            const payload = JSON.parse(action.payload) as IPostContentNodeData;
            postContentData.nodes.push(payload);
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

        deleteNode: (state, action: PayloadAction<number>) => {
            let postContentData = JSON.parse(state.postContentDataJson) as PostContentData;
            const nodeIndex = action.payload;

            postContentData.nodes.splice(nodeIndex, 1);

            postContentData = FixIndexes(postContentData);

            state.postContentDataJson = JSON.stringify(postContentData);
        },

        moveNode: (state, action: PayloadAction<string>) => {
            let postContentData = JSON.parse(state.postContentDataJson) as PostContentData;
            const nodeIndex = JSON.parse(action.payload).nodeIndex;
            const direction = JSON.parse(action.payload).direction;

            const node = postContentData.nodes.find((node) => { return node.editor.index == nodeIndex }) as PostContentNodeParagraphData;

            if (node == undefined) {
                console.error("Failed to move node for index " + action.payload);
                return;
            }

            switch (direction) {
                case "up":
                    let leftElement = postContentData.nodes[nodeIndex - 1];
                    if (leftElement == undefined) {
                        console.log("Failed to move node to the up");
                        return;
                    }

                    postContentData.nodes[node.editor.index - 1] = postContentData.nodes[node.editor.index];
                    postContentData.nodes[node.editor.index] = leftElement;
                    break;
                case "down":
                    let rightElement = postContentData.nodes[nodeIndex + 1];
                    if (rightElement == undefined) {
                        console.log("Failed to move node to the down");
                        return;
                    }

                    postContentData.nodes[node.editor.index + 1] = postContentData.nodes[node.editor.index];
                    postContentData.nodes[node.editor.index] = rightElement;
                    break;
                default:
                    console.error("Wrong direction to move node: " + direction)
                    return;
            }



            postContentData = FixIndexes(postContentData);

            state.postContentDataJson = JSON.stringify(postContentData);
        },

        selectParagraphInnerNode: (state, action: PayloadAction<string>) => {
            const postContentData = JSON.parse(state.postContentDataJson) as PostContentData;
            const nodeIndex = JSON.parse(action.payload).nodeIndex;
            const innerNodeIndex = JSON.parse(action.payload).innerNodeIndex;

            const node = postContentData.nodes.find((node) => { return node.editor.index == nodeIndex }) as PostContentNodeParagraphData;
            const innerNode = node.innerNodes.find((innerNode) => { return innerNode.editor.index == innerNodeIndex });

            if (node == undefined || innerNode == undefined) {
                console.error("Failed to select node for index " + action.payload);
                return;
            }

            innerNode.editor.isSelected = true;
            state.postContentDataJson = JSON.stringify(postContentData);
        },

        deselectAll: (state, action: PayloadAction) => {
            const postContentData = JSON.parse(state.postContentDataJson) as PostContentData;

            postContentData.nodes.forEach(node => {
                node.editor.isSelected = false;

                switch (node.type) {
                    case "paragraph":
                        let paragraphNode = node as PostContentNodeParagraphData;
                        paragraphNode.innerNodes.forEach(innerNode => {
                            innerNode.editor.isSelected = false;
                        });
                        break;
                    default:
                        break;
                }
            });
            state.postContentDataJson = JSON.stringify(postContentData);
        },

        changeParagraphInnerNode: (state, action: PayloadAction<string>) => {
            const postContentData = JSON.parse(state.postContentDataJson) as PostContentData;
            const payload = JSON.parse(action.payload) as PostContentNodeParagraphData;
            const node = postContentData.nodes.find((node) => { return node.editor.index == payload.editor.index }) as PostContentNodeParagraphData
            if (node == undefined) {
                console.error("Failed to select node for index " + action.payload);
                return;
            }

            node.innerNodes = payload.innerNodes;
            state.postContentDataJson = JSON.stringify(postContentData);
        },

        deleteParagraphInnerNode: (state, action: PayloadAction<string>) => {
            let postContentData = JSON.parse(state.postContentDataJson) as PostContentData;
            const nodeIndex = JSON.parse(action.payload).nodeIndex;
            const innerNodeIndex = JSON.parse(action.payload).innerNodeIndex;

            const node = postContentData.nodes.find((node) => { return node.editor.index == nodeIndex }) as PostContentNodeParagraphData;
            const innerNode = node.innerNodes.find((innerNode) => { return innerNode.editor.index == innerNodeIndex });

            if (node == undefined || innerNode == undefined) {
                console.error("Failed to delete node for index " + action.payload);
                return;
            }

            node.innerNodes.splice(innerNode.editor.index, 1);

            postContentData = FixIndexes(postContentData);

            state.postContentDataJson = JSON.stringify(postContentData);
        },

        addParagraphInnerNode: (state, action: PayloadAction<string>) => {
            const postContentData = JSON.parse(state.postContentDataJson) as PostContentData;
            const nodeIndex = JSON.parse(action.payload).nodeIndex;
            const innerNode = JSON.parse(action.payload).innerNode;

            const node = postContentData.nodes.find((node) => { return node.editor.index == nodeIndex }) as PostContentNodeParagraphData;

            if (node == undefined || innerNode == undefined) {
                console.error("Failed to delete node for index " + action.payload);
                return;
            }

            node.innerNodes.push(innerNode);

            state.postContentDataJson = JSON.stringify(postContentData);
        },

        moveParagraphInnerNode: (state, action: PayloadAction<string>) => {
            let postContentData = JSON.parse(state.postContentDataJson) as PostContentData;
            const nodeIndex = JSON.parse(action.payload).nodeIndex;
            const innerNodeIndex = JSON.parse(action.payload).innerNodeIndex;
            const direction = JSON.parse(action.payload).direction;

            const node = postContentData.nodes.find((node) => { return node.editor.index == nodeIndex }) as PostContentNodeParagraphData;
            const innerNode = node.innerNodes.find((innerNode) => { return innerNode.editor.index == innerNodeIndex });

            if (node == undefined || innerNode == undefined) {
                console.error("Failed to move node for index " + action.payload);
                return;
            }

            switch (direction) {
                case "left":
                    let leftElement = (postContentData.nodes[nodeIndex] as PostContentNodeParagraphData).innerNodes[innerNode.editor.index - 1];
                    if (leftElement == undefined) {
                        console.log("Failed to move inner node to the left");
                        return;
                    }

                    (postContentData.nodes[nodeIndex] as PostContentNodeParagraphData).innerNodes[innerNode.editor.index - 1] = (postContentData.nodes[nodeIndex] as PostContentNodeParagraphData).innerNodes[innerNode.editor.index];
                    (postContentData.nodes[nodeIndex] as PostContentNodeParagraphData).innerNodes[innerNode.editor.index] = leftElement;
                    break;
                case "right":
                    let rightElement = (postContentData.nodes[nodeIndex] as PostContentNodeParagraphData).innerNodes[innerNode.editor.index + 1];
                    if (rightElement == undefined) {
                        console.log("Failed to move inner node to the right");
                        return;
                    }

                    (postContentData.nodes[nodeIndex] as PostContentNodeParagraphData).innerNodes[innerNode.editor.index + 1] = (postContentData.nodes[nodeIndex] as PostContentNodeParagraphData).innerNodes[innerNode.editor.index];
                    (postContentData.nodes[nodeIndex] as PostContentNodeParagraphData).innerNodes[innerNode.editor.index] = rightElement;
                    break;
                default:
                    console.error("Wrong direction to move node: " + direction)
                    return;
            }



            postContentData = FixIndexes(postContentData);

            state.postContentDataJson = JSON.stringify(postContentData);
        },
    },
})

const FixIndexes = (data: PostContentData): PostContentData => {
    for (let i = 0; i < data.nodes.length; i++) {
        let node = data.nodes[i];
        node.editor.index = i;

        switch (node.type) {
            case "paragraph":
                let paragraphNode = node as PostContentNodeParagraphData;
                for (let j = 0; j < paragraphNode.innerNodes.length; j++) {
                    let innerNode = paragraphNode.innerNodes[j];
                    innerNode.editor.index = j;
                }
                break;
            default:
                break;
        }
    }
    return data;
}

export const {
    addEditorNodeToEnd,
    selectNode,
    deselectAll,
    deleteNode,
    moveNode,
    changeParagraphInnerNode,
    selectParagraphInnerNode,
    deleteParagraphInnerNode,
    addParagraphInnerNode,
    moveParagraphInnerNode,
} = createEditorSlice.actions

export default createEditorSlice.reducer