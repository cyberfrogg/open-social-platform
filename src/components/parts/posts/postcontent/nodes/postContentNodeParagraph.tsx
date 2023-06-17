import React from 'react';
import classes from './postContentNodeStyles.module.css'
import PostContentNodeParagraphData from '@/data/shared/postcontent/nodes/PostContentNodeParagraphData';
import IPostContentNodeData from '@/data/shared/postcontent/IPostContentNodeData';
import PostContentNodeTextData from '@/data/shared/postcontent/nodes/PostContentNodeTextData';
import PostContentNodeLinkData from '@/data/shared/postcontent/nodes/PostContentNodeLinkData';
import Link from 'next/link';

export interface IPostContentNodeParagraphProps {
    data: PostContentNodeParagraphData
}

export const PostContentNodeParagraph: React.FC<IPostContentNodeParagraphProps> = (props) => {
    let nodeIndex = 0;

    return (
        <p className={classes.paragraph}>
            {
                props.data.innerNodes.map((node: IPostContentNodeData) => {
                    nodeIndex++;
                    switch (node.type) {
                        case "text":
                            const textNode = node as PostContentNodeTextData;
                            return (
                                <React.Fragment key={nodeIndex}>
                                    {textNode.text}
                                </React.Fragment>
                            );
                        case "link":
                            const linkNode = node as PostContentNodeLinkData;
                            return (
                                <Link href={linkNode.url} key={nodeIndex} className={classes.paragraphlink}>
                                    {linkNode.text}
                                </Link>
                            );
                        default:
                            break;
                    }
                })
            }
        </p>
    );
}