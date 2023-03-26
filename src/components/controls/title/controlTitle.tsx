import React from 'react';
import classes from './controlTitle.module.css'

interface IControlTitleProps {
    weight: number,
    isCentered: boolean,
    children: React.ReactNode
}

export const ControlTitle: React.FC<IControlTitleProps> = (props) => {
    let titleClass = classes.title;

    if (props.isCentered)
        titleClass += " " + classes.centered;


    switch (props.weight) {
        case 1:
            return (
                <h1 className={titleClass}>
                    {props.children}
                </h1>
            );
            break;
        case 2:
            return (
                <h2 className={titleClass}>
                    {props.children}
                </h2>
            );
            break;
        case 3:
            return (
                <h3 className={titleClass}>
                    {props.children}
                </h3>
            );
            break;
        case 4:
            return (
                <h4 className={titleClass}>
                    {props.children}
                </h4>
            );
            break;
        case 5:
            return (
                <h5 className={titleClass}>
                    {props.children}
                </h5>
            );
            break;
        default:
            return (
                <h2 className={titleClass}>
                    {props.children}
                </h2>
            );
            break;
    }
}
