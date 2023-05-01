import React from 'react';
import classes from './controlSimpleError.module.css'

interface IControlSimpleErrorProps {
    isCentered: boolean,
    children: React.ReactNode
}

export const ControlSimpleError: React.FC<IControlSimpleErrorProps> = (props) => {
    let errorClass = classes.errorText;

    if (props.isCentered)
        errorClass += " " + classes.centered;


    return (
        <p className={errorClass}>
            {props.children}
        </p>
    );
}
