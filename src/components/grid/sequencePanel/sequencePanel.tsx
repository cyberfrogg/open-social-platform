import React from 'react';
import classes from './sequencePanel.module.css'
import { ISequencePanelItemProps } from './sequencePanelItem';
import { Children } from "react";

interface ISequencePanelProps {
    panelIndex: number,
    children: React.ReactElement<ISequencePanelItemProps> | React.ReactElement<ISequencePanelItemProps>[]
}

export const SequencePanel: React.FC<ISequencePanelProps> = (props) => {
    const arrayChildren = Children.toArray(props.children);

    return (
        <div className={classes.panel}>
            {
                Children.map(arrayChildren, (child, index) => {
                    if (props.panelIndex == index) {
                        return (
                            <>
                                {child}
                            </>
                        )
                    }
                })
            }
        </div>
    );
}
