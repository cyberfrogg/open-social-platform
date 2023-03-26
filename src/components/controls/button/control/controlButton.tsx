import React from 'react';
import classes from './controlButton.module.css'
import undercontentclasses from '@/components/controls/shared/styles/controlundercontent.module.css';

interface IControlButtonProps {
    label: string,
    onClick: any,
    children: React.ReactNode
}

export const ControlButton: React.FC<IControlButtonProps> = (props) => {
    const onButtonClick = () => {
        props.onClick();
    }

    return (
        <>
            <button className={classes.button} onClick={onButtonClick}>
                <div className={classes.label}>{props.label}</div>
            </button>
            <div className={undercontentclasses.undercontent}>
                {props.children}
            </div>
        </>
    )
}
