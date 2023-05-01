import React from 'react';
import classes from './sequencePanel.module.css'

export interface ISequencePanelItemProps {
    children: React.ReactNode
}

export const SequencePanelItem: React.FC<ISequencePanelItemProps> = (props) => {
    return (
        <div className={classes.item}>
            {props.children}
        </div>
    )
}