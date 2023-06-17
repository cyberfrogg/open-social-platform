import React from 'react';
import classes from './controlFileField.module.css'
import undercontentclasses from '@/components/controls/shared/styles/controlundercontent.module.css';

interface IControlFileFieldProps {
    label: string,
    labelname: string,
    filename: string,
    accept: string,
    isRequired: boolean,
    isError: boolean,
    errorMessage: string,
    onChange: any,
    children: React.ReactNode
}

export const ControlFileField: React.FC<IControlFileFieldProps> = (props) => {
    let fieldRootClass = classes.fieldroot;
    let errorMessageText = " - " + props.errorMessage;

    if (props.isRequired)
        fieldRootClass += " " + classes.required;

    if (!props.isError)
        errorMessageText = "";

    if (props.isError)
        fieldRootClass += " " + classes.fielderror;

    const onFieldValueChanged = (e: React.FormEvent<HTMLInputElement>) => {
        props.onChange(e);
    }

    return (
        <div className={fieldRootClass}>
            <div className={classes.field}>
                <p className={classes.filename}>{props.filename}</p>
                <input
                    className={classes.inputfield}
                    name={props.labelname}
                    type={"file"}
                    accept={props.accept}
                    onChange={onFieldValueChanged}
                    placeholder={props.label}
                />
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
