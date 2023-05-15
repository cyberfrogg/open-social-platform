import React from 'react';
import classes from './createeditorpanel.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addEditorNodeToEnd, addParagraphInnerNode, changeParagraphInnerNode, deleteParagraphInnerNode, deselectAll, moveParagraphInnerNode, selectNode, selectParagraphInnerNode } from '@/slices/createEditorSlice';
import IPostContentNodeData from '../../../data/shared/postcontent/IPostContentNodeData';
import PostContentNodeParagraphData from '../../../data/shared/postcontent/nodes/PostContentNodeParagraphData';
import PostContentNodeImageData from '../../../data/shared/postcontent/nodes/PostContentNodeImageData';
import PostContentNodeLinkData from '@/data/shared/postcontent/nodes/PostContentNodeLinkData';
import PostContentNodeTextData from '@/data/shared/postcontent/nodes/PostContentNodeTextData';
import PostContentData from '@/data/shared/postcontent/postContentData';
import { ContentEditableWithRef } from '../../parts/contenteditablewithref/contentEditableWithRef';
import Sleep from '@/utils/shared/sleep';

interface ICreateEditorPanelProps {

}

export const CreateEditorPanel: React.FC<ICreateEditorPanelProps> = (props) => {
    const dispatch = useDispatch();
    const postContentDataJson = useSelector((state: RootState) => state.createEditor.postContentDataJson);
    const postContentData = JSON.parse(postContentDataJson) as PostContentData;

    console.log("-----------------------");
    if (postContentData != undefined) {
        if (postContentData.nodes[0] != undefined) {
            (postContentData.nodes[0] as PostContentNodeParagraphData).innerNodes.forEach((item) => {
                console.log(item.text)
            });
        }
    }
    console.log("-----------------------");

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

    const OnNodeSelect = (node: IPostContentNodeData) => {
        if (!node.editor.isSelected) {
            dispatch(deselectAll());
            dispatch(selectNode(node.editor.index));
        }
    }

    const OnParagraphNodeSelect = (paragraphNode: PostContentNodeParagraphData, innerNode: PostContentNodeTextData | PostContentNodeLinkData) => {
        if (!innerNode.editor.isSelected) {
            dispatch(deselectAll());
            dispatch(selectNode(paragraphNode.editor.index));
            dispatch(selectParagraphInnerNode(JSON.stringify({ nodeIndex: paragraphNode.editor.index, innerNodeIndex: innerNode.editor.index })));
        }
    }

    const OnParagraphInnerNodeChange = (paragraphNode: PostContentNodeParagraphData, innerNode: PostContentNodeTextData | PostContentNodeLinkData, textContent: string) => {
        innerNode.text = textContent;
        dispatch(changeParagraphInnerNode(JSON.stringify(paragraphNode)));
    }

    const OnParagraphInnerNodeDelete = async (paragraphNode: PostContentNodeParagraphData, innerNode: PostContentNodeTextData | PostContentNodeLinkData) => {
        dispatch(deleteParagraphInnerNode(JSON.stringify({ nodeIndex: paragraphNode.editor.index, innerNodeIndex: innerNode.editor.index })));

        await Sleep(100); // dispatch works like shit, so we need this sleep

        if (paragraphNode.innerNodes.length <= 1) {
            let newElement = new PostContentNodeTextData("text", "Text here...");
            let payload = { nodeIndex: paragraphNode.editor.index, innerNode: newElement };
            dispatch(addParagraphInnerNode(JSON.stringify(payload)));
        }
    }

    const OnParagraphInnerNodeAddLink = async (paragraphNode: PostContentNodeParagraphData) => {
        let newElement = new PostContentNodeLinkData("link", "Link here", "example.com");
        newElement.editor.index = paragraphNode.innerNodes.length       // setting editorIndexId to the next index of array
        let payload = { nodeIndex: paragraphNode.editor.index, innerNode: newElement };

        dispatch(addParagraphInnerNode(JSON.stringify(payload)));
    }

    const OnParagraphInnerNodeAddText = async (paragraphNode: PostContentNodeParagraphData) => {
        let newElement = new PostContentNodeTextData("text", "Text here");
        newElement.editor.index = paragraphNode.innerNodes.length       // setting editorIndexId to the next index of array
        let payload = { nodeIndex: paragraphNode.editor.index, innerNode: newElement };

        dispatch(addParagraphInnerNode(JSON.stringify(payload)));
    }

    const OnParagraphInnerNodeMove = async (paragraphNode: PostContentNodeParagraphData, innerNode: PostContentNodeTextData | PostContentNodeLinkData, dir: string) => {
        let payload = { nodeIndex: paragraphNode.editor.index, innerNodeIndex: innerNode.editor.index, direction: dir };

        dispatch(moveParagraphInnerNode(JSON.stringify(payload)));
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
                    <React.Fragment key={innerNode.editor.index}>
                        <div className={classes.editorpanel + " " + (textNode.editor.isSelected ? classes.selected : "")}>
                            <button className={classes.editorpanelbutton} onClick={() => { OnParagraphInnerNodeAddLink(paragraphNode) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" style={{ transform: "translateY(2px)" }} width="19" height="19" viewBox="0 0 24 24" fill="none">
                                    <g id="Interface / Link">
                                        <path id="Vector" d="M9.1718 14.8288L14.8287 9.17192M7.05086 11.293L5.63664 12.7072C4.07455 14.2693 4.07409 16.8022 5.63619 18.3643C7.19829 19.9264 9.7317 19.9259 11.2938 18.3638L12.7065 16.9498M11.2929 7.05L12.7071 5.63579C14.2692 4.07369 16.8016 4.07397 18.3637 5.63607C19.9258 7.19816 19.9257 9.73085 18.3636 11.2929L16.9501 12.7071" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                </svg>
                            </button>
                            <button className={classes.editorpanelbutton} onClick={() => { OnParagraphInnerNodeMove(paragraphNode, textNode, "left") }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ transform: "rotate(0deg) translateY(2px)" }}>
                                    <g>
                                        <path d="M19 12H5M5 12L11 18M5 12L11 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                </svg>
                            </button>
                            <button className={classes.editorpanelbutton} onClick={() => { OnParagraphInnerNodeMove(paragraphNode, textNode, "right") }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ transform: "rotate(180deg) translateY(-2px)" }}>
                                    <g>
                                        <path d="M19 12H5M5 12L11 18M5 12L11 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                </svg>
                            </button>
                            <button className={classes.editorpanelbutton} onClick={() => { OnParagraphInnerNodeDelete(paragraphNode, textNode) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 18 20" fill="none">
                                    <path d="M11 8V15M7 8V15M3 4V15.8C3 16.9201 3 17.4798 3.21799 17.9076C3.40973 18.2839 3.71547 18.5905 4.0918 18.7822C4.5192 19 5.07899 19 6.19691 19H11.8031C12.921 19 13.48 19 13.9074 18.7822C14.2837 18.5905 14.5905 18.2839 14.7822 17.9076C15 17.4802 15 16.921 15 15.8031V4M3 4H5M3 4H1M5 4H13M5 4C5 3.06812 5 2.60241 5.15224 2.23486C5.35523 1.74481 5.74432 1.35523 6.23438 1.15224C6.60192 1 7.06812 1 8 1H10C10.9319 1 11.3978 1 11.7654 1.15224C12.2554 1.35523 12.6447 1.74481 12.8477 2.23486C12.9999 2.6024 13 3.06812 13 4M13 4H15M15 4H17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <ContentEditableWithRef
                            className={classes.paragraphinput + " " + (textNode.editor.isSelected ? classes.selected : "")}
                            value={textNode.text}
                            onClick={(e: any) => { OnParagraphNodeSelect(paragraphNode, innerNode); }}
                            onChange={(innerText: string) => {
                                OnParagraphInnerNodeChange(paragraphNode, innerNode, innerText);
                            }}
                        />
                    </React.Fragment>
                )
            case "link":
                const linkNode = innerNode as PostContentNodeLinkData;
                return (
                    // Why "new Date().getTime()" next to all keys of "ContentEditableWithRef" component? Why react is shit? https://stackoverflow.com/questions/30242530/dangerouslysetinnerhtml-doesnt-update-during-render
                    <React.Fragment key={innerNode.editor.index + "_" + new Date().getTime()}>
                        <div className={classes.editorpanel + " " + (linkNode.editor.isSelected ? classes.selected : "")}>
                            <button className={classes.editorpanelbutton} onClick={() => { OnParagraphInnerNodeAddText(paragraphNode) }} style={{ transform: "rotate(0deg) translateY(-2px)" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 14 16" fill="none">
                                    <path d="M5 15H7M7 15H9M7 15V1M7 1H1V2M7 1H13V2" stroke="#8685C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button className={classes.editorpanelbutton} onClick={() => { OnParagraphInnerNodeMove(paragraphNode, linkNode, "left") }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ transform: "rotate(0deg) translateY(2px)" }}>
                                    <g>
                                        <path d="M19 12H5M5 12L11 18M5 12L11 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                </svg>
                            </button>
                            <button className={classes.editorpanelbutton} onClick={() => { OnParagraphInnerNodeMove(paragraphNode, linkNode, "right") }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ transform: "rotate(180deg) translateY(-2px)" }}>
                                    <g>
                                        <path d="M19 12H5M5 12L11 18M5 12L11 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                </svg>
                            </button>
                            <button className={classes.editorpanelbutton} onClick={() => { OnParagraphInnerNodeDelete(paragraphNode, linkNode) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 18 20" fill="none">
                                    <path d="M11 8V15M7 8V15M3 4V15.8C3 16.9201 3 17.4798 3.21799 17.9076C3.40973 18.2839 3.71547 18.5905 4.0918 18.7822C4.5192 19 5.07899 19 6.19691 19H11.8031C12.921 19 13.48 19 13.9074 18.7822C14.2837 18.5905 14.5905 18.2839 14.7822 17.9076C15 17.4802 15 16.921 15 15.8031V4M3 4H5M3 4H1M5 4H13M5 4C5 3.06812 5 2.60241 5.15224 2.23486C5.35523 1.74481 5.74432 1.35523 6.23438 1.15224C6.60192 1 7.06812 1 8 1H10C10.9319 1 11.3978 1 11.7654 1.15224C12.2554 1.35523 12.6447 1.74481 12.8477 2.23486C12.9999 2.6024 13 3.06812 13 4M13 4H15M15 4H17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <ContentEditableWithRef
                            className={classes.linkinput + " " + (linkNode.editor.isSelected ? classes.selected : "")}
                            key={innerNode.editor.index + "_" + new Date().getTime()}
                            value={linkNode.text}
                            onClick={(e: any) => { OnParagraphNodeSelect(paragraphNode, innerNode); }}
                            onChange={(innerText: string) => {
                                OnParagraphInnerNodeChange(paragraphNode, innerNode, innerText);
                            }}
                        />
                    </React.Fragment>
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
                                onClick={() => { OnNodeSelect(node) }}
                            >
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


