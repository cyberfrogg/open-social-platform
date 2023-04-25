import React from 'react';
import classes from './controlCheckmarkField.module.css'
import undercontentclasses from '@/components/controls/shared/styles/controlundercontent.module.css';

interface IControlCheckmarkFieldProps {
    label: string,
    labelname: string,
    type: string,
    isRequired: boolean,
    value: boolean,
    isError: boolean,
    errorMessage: string,
    onClick: any,
    children: React.ReactNode
}

export const ControlCheckmarkField: React.FC<IControlCheckmarkFieldProps> = (props) => {
    let fieldRootClass = classes.fieldRootClass;
    let errorMessageText = " - " + props.errorMessage;

    if (props.isRequired)
        fieldRootClass += " " + classes.required;

    if (!props.isError)
        errorMessageText = "";

    if (props.isError)
        fieldRootClass += " " + classes.fielderror;

    if (props.value)
        fieldRootClass += " " + classes.isChecked;


    const onFieldClick = () => {
        props.onClick(!props.value);
    }

    return (
        <>
            <div className={fieldRootClass} onClick={onFieldClick}>
                <div className={classes.checkmarkwrapper}>
                    <div className={classes.checkmark}>
                        <div className={classes.checkmarkCheckedState}>
                            <svg width="14" height="14" viewBox="0 0 24 24"><path fill="white" fill-rule="evenodd" clip-rule="evenodd" d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z"></path></svg>
                        </div>
                    </div>
                </div>
                <div className={undercontentclasses.undercontent}>
                    {props.children}
                </div>
            </div>
            <div className={classes.errortext}>

            </div>
        </>
    )
}
