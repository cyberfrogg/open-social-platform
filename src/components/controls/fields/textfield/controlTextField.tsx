import React from 'react';
import classes from './controlTextField.module.css'
import undercontentclasses from '@/components/controls/shared/styles/controlundercontent.module.css';

interface IControlTextFieldProps {
    label: string,
    labelname: string,
    type: string,
    isRequired: boolean,
    value: string,
    isError: boolean,
    errorMessage: string,
    onChange: any,
    children: React.ReactNode
}

export const ControlTextField: React.FC<IControlTextFieldProps> = (props) => {
    let fieldRootClass = classes.fieldroot;
    let errorMessageText = " - " + props.errorMessage;

    if (props.isRequired)
        fieldRootClass += " " + classes.required;

    if (!props.isError)
        errorMessageText = "";

    if (props.isError)
        fieldRootClass += " " + classes.fielderror;


    const onFieldValueChanged = (e: React.FormEvent<HTMLInputElement>) => {
        const gottenValue = (e.target as HTMLInputElement).value;
        props.onChange(gottenValue);
    }

    return (
        <div className={fieldRootClass}>
            <div className={classes.field}>
                <input className={classes.inputfield} name={props.labelname} type={props.type} onChange={onFieldValueChanged} value={props.value} placeholder={props.label} />
            </div>
            <div className={classes.errorspace}>
                {errorMessageText}
            </div>
            <div className={undercontentclasses.undercontent}>
                {props.children}
            </div>
        </div>
    )
}
