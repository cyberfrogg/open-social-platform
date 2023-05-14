import React from 'react';
import classes from './createeditorpanel.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addEditorNodeToEnd, changeParagraphInnerNode, deselectAll, selectNode } from '@/slices/createEditorSlice';
import IPostContentNodeData from '../../../data/shared/postcontent/IPostContentNodeData';
import PostContentNodeParagraphData from '../../../data/shared/postcontent/nodes/PostContentNodeParagraphData';
import PostContentNodeImageData from '../../../data/shared/postcontent/nodes/PostContentNodeImageData';
import PostContentNodeLinkData from '@/data/shared/postcontent/nodes/PostContentNodeLinkData';
import PostContentNodeTextData from '@/data/shared/postcontent/nodes/PostContentNodeTextData';
import PostContentData from '@/data/shared/postcontent/postContentData';
import { ContentEditableWithRef } from '../../parts/contenteditablewithref/contentEditableWithRef';

interface ICreateEditorPanelProps {

}

export const CreateEditorPanel: React.FC<ICreateEditorPanelProps> = (props) => {
    const dispatch = useDispatch();
    const postContentDataJson = useSelector((state: RootState) => state.createEditor.postContentDataJson);
    const postContentData = JSON.parse(postContentDataJson) as PostContentData;

    const OnAddElementClick = (type: string) => {
        console.log("Adding element - " + type);
        let newElement: IPostContentNodeData;

        switch (type) {
            case "paragraph":
                newElement = new PostContentNodeParagraphData("paragraph", [new PostContentNodeTextData("text", "Text here...")]);
                break;
            case "image":
                newElement = new PostContentNodeImageData("image", "Image description here", "https://example.com/")
                break;
            default:
                console.error("Failed to create new element for type " + type);
                return;
        }

        newElement.editor.index = postContentData.nodes.length;    // setting editorIndexId to the next index of array

        dispatch(addEditorNodeToEnd(JSON.stringify(newElement)))
    }

    const OnElementSelect = (node: IPostContentNodeData) => {
        if (!node.editor.isSelected) {
            dispatch(deselectAll());
            dispatch(selectNode(node.editor.index));
        }
    }

    const OnParagraphInnerNodeChange = async (paragraphNode: PostContentNodeParagraphData, innerNode: PostContentNodeTextData | PostContentNodeLinkData, textContent: string) => {
        innerNode.text = textContent;
        console.log(textContent);
        dispatch(changeParagraphInnerNode(JSON.stringify(paragraphNode)));
    }




    const RenderPostContentNodeContent = (node: IPostContentNodeData) => {
        switch (node.type) {
            case "paragraph":
                const paragraphNode = node as PostContentNodeParagraphData;
                return (
                    <div
                        key={node.editor.index}
                        className={classes.nodeContentParagraph}
                    >
                        {
                            paragraphNode.innerNodes.map((innerNode) => {
                                return RenderPostContentInnerParagraphNode(paragraphNode, innerNode);
                            })
                        }
                    </div>
                )
            case "image":
                return (
                    <p>image</p>
                )
            default:
                break;
        }
    }

    const RenderPostContentInnerParagraphNode = (paragraphNode: PostContentNodeParagraphData, innerNode: PostContentNodeTextData | PostContentNodeLinkData) => {
        switch (innerNode.type) {
            case "text":
                const textNode = innerNode as PostContentNodeTextData;
                return (
                    <ContentEditableWithRef
                        className={classes.paragraphinput}
                        key={innerNode.editor.index}
                        value={textNode.text}
                        onChange={(innerText: string) => {
                            OnParagraphInnerNodeChange(paragraphNode, innerNode, innerText);
                        }}
                    />
                )
            case "link":
                const linkNode = innerNode as PostContentNodeLinkData;
                return (
                    <ContentEditableWithRef
                        className={classes.paragraphinput}
                        key={innerNode.editor.index}
                        onChange={(innerText: string) => {
                            OnParagraphInnerNodeChange(paragraphNode, innerNode, innerText);
                        }}
                    />
                )
            default:
                break;
        }
    }

    return (
        <div className={classes.createeditorpanel}>
            <div className={classes.node}>
                {
                    postContentData.nodes.map((node) => {
                        return (
                            <div
                                key={node.editor.index}
                                className={classes.nodeitem + " " + (node.editor.isSelected ? classes.selected : "")}
                                onClick={() => { OnElementSelect(node) }}
                            >
                                <nav className={classes.nodeeditor}>

                                </nav>
                                <div className={classes.nodeContent}>
                                    {RenderPostContentNodeContent(node)}
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <nav className={classes.addelementcontainer}>
                <button className={classes.button} onClick={() => { OnAddElementClick("paragraph") }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                        <path d="M5 15H7M7 15H9M7 15V1M7 1H1V2M7 1H13V2" stroke="#8685C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p>Add Text</p>
                </button>
                <div className={classes.line}></div>
                <button className={classes.button} onClick={() => { OnAddElementClick("image") }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M1.00005 16.0001C1 15.9355 1 15.8689 1 15.8002V4.2002C1 3.08009 1 2.51962 1.21799 2.0918C1.40973 1.71547 1.71547 1.40973 2.0918 1.21799C2.51962 1 3.08009 1 4.2002 1H15.8002C16.9203 1 17.4801 1 17.9079 1.21799C18.2842 1.40973 18.5905 1.71547 18.7822 2.0918C19 2.5192 19 3.07899 19 4.19691V15.8031C19 16.2881 19 16.6679 18.9822 16.9774M1.00005 16.0001C1.00082 16.9884 1.01337 17.5058 1.21799 17.9074C1.40973 18.2837 1.71547 18.5905 2.0918 18.7822C2.5192 19 3.07899 19 4.19691 19H15.8036C16.9215 19 17.4805 19 17.9079 18.7822C18.2842 18.5905 18.5905 18.2837 18.7822 17.9074C18.9055 17.6654 18.959 17.3813 18.9822 16.9774M1.00005 16.0001L5.76798 10.4375L5.76939 10.436C6.19227 9.9426 6.40406 9.69551 6.65527 9.60645C6.87594 9.52821 7.11686 9.53004 7.33643 9.61133C7.58664 9.70397 7.79506 9.95387 8.21191 10.4541L10.8831 13.6595C11.269 14.1226 11.463 14.3554 11.6986 14.4489C11.9065 14.5313 12.1357 14.5406 12.3501 14.4773C12.5942 14.4053 12.8091 14.1904 13.2388 13.7607L13.7358 13.2637C14.1733 12.8262 14.3921 12.6076 14.6397 12.5361C14.8571 12.4734 15.0896 12.4869 15.2988 12.5732C15.537 12.6716 15.7302 12.9124 16.1167 13.3955L18.9822 16.9774M18.9822 16.9774L19 16.9996M13 7C12.4477 7 12 6.55228 12 6C12 5.44772 12.4477 5 13 5C13.5523 5 14 5.44772 14 6C14 6.55228 13.5523 7 13 7Z" stroke="#8685C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p>Add Image</p>
                </button>
            </nav>
        </div>
    );
}


