import React from 'react';
import classes from './controlLoginField.module.css'

interface IControlLoginFieldProps {
    label: string,
    isRequired: boolean,
    value: string,
    isError: boolean,
    errorMessage: string,
    onChange: any
}

export const ControlLoginField: React.FC<IControlLoginFieldProps> = (props) => {
    let loginFieldClass = classes.loginfield;
    let errorMessageText = " - " + props.errorMessage;

    if (props.isRequired)
        loginFieldClass += " " + classes.required;

    if (!props.isError)
        errorMessageText = "";

    if (props.isError)
        loginFieldClass += " " + classes.fielderror;


    const onFieldValueChanged = (e: React.FormEvent<HTMLInputElement>) => {
        const gottenValue = (e.target as HTMLInputElement).value;
        props.onChange(gottenValue);
    }

    return (
        <div className={loginFieldClass}>
            <label className={classes.label}>{props.label}{errorMessageText}</label>
            <div className={classes.field}>
                <input className={classes.inputfield} type={"login"} onChange={onFieldValueChanged} value={props.value} />
            </div>
        </div>
    )
}
