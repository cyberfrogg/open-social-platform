import React from 'react';
import classes from './controlUnderTitle.module.css'

interface IControlUnderTitleProps {
    isCentered: boolean,
    children: React.ReactNode
}

export const ControlUnderTitle: React.FC<IControlUnderTitleProps> = (props) => {
    let titleClass = classes.title;

    if (props.isCentered)
        titleClass += " " + classes.centered;


    return (
        <p className={titleClass}>
            {props.children}
        </p>
    );
}
