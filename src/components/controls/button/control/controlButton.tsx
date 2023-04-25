import React from 'react';
import classes from './controlButton.module.css'
import undercontentclasses from '@/components/controls/shared/styles/controlundercontent.module.css';

interface IControlButtonProps {
    label: string,
    onClick: any,
    isEnabled: boolean,
    children: React.ReactNode
}

export const ControlButton: React.FC<IControlButtonProps> = (props) => {
    const onButtonClick = () => {
        props.onClick();
    }

    let fieldRootClass = classes.button;

    if (!props.isEnabled)
        fieldRootClass += " " + classes.disabled;

    return (
        <>
            <button className={fieldRootClass} onClick={onButtonClick}>
                <div className={classes.label}>{props.label}</div>
            </button>
            <div className={undercontentclasses.undercontent + " " + classes.undercontent}>
                {props.children}
            </div>
        </>
    )
}
