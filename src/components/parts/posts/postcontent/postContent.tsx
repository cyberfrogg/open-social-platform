import React from 'react';
import classes from './postContent.module.css'
import PostContentData from '@/data/shared/postcontent/postContentData';
import IPostContentNodeData from '@/data/shared/postcontent/IPostContentNodeData';
import { PostContentNodeParagraph } from './nodes/postContentNodeParagraph';
import PostContentNodeParagraphData from '@/data/shared/postcontent/nodes/PostContentNodeParagraphData';
import PostContentNodeImageData from '@/data/shared/postcontent/nodes/PostContentNodeImageData';
import { PostContentNodeImage } from './nodes/postContentNodeImage';

export interface IPostContentProps {
    content: PostContentData
}

export const PostContent: React.FC<IPostContentProps> = (props) => {
    let nodeIndex = 0;

    return (
        <div className={classes.postcontent}>
            {
                props.content.nodes.map((node: IPostContentNodeData) => {
                    nodeIndex++;
                    switch (node.type) {
                        case "paragraph":
                            const paragraphNode = node as PostContentNodeParagraphData;
                            return (
                                <PostContentNodeParagraph
                                    key={nodeIndex}
                                    data={paragraphNode}
                                />
                            )
                        case "image":
                            const imageNode = node as PostContentNodeImageData;
                            return (
                                <PostContentNodeImage
                                    key={nodeIndex}
                                    data={imageNode}
                                />
                            )
                        default:
                            break;
                    }
                })
            }
        </div>
    );
}