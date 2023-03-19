import React from 'react';
import classes from './controlPasswordField.module.css'

interface IControlPasswordFieldProps {
    label: string,
    isRequired: boolean,
    value: string,
    isError: boolean,
    errorMessage: string,
    onChange: any
}

export const ControlPasswordField: React.FC<IControlPasswordFieldProps> = (props) => {
    let passwordFieldClass = classes.passwordfield;
    let errorMessageText = " - " + props.errorMessage;

    if (props.isRequired)
        passwordFieldClass += " " + classes.required;

    if (!props.isError)
        errorMessageText = "";

    if (props.isError)
        passwordFieldClass += " " + classes.fielderror;


    const onFieldValueChanged = (e: React.FormEvent<HTMLInputElement>) => {
        const gottenValue = (e.target as HTMLInputElement).value;
        props.onChange(gottenValue);
    }

    return (
        <div className={passwordFieldClass}>
            <label className={classes.label}>{props.label}{errorMessageText}</label>
            <div className={classes.field}>
                <input className={classes.inputfield} type={"password"} onChange={onFieldValueChanged} value={props.value} />
            </div>
        </div>
    )
}
