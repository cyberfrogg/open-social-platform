import React from 'react';
import classes from './controlCfCaptcha.module.css'
import Turnstile from 'react-turnstile';


interface IControlCfCaptchaProps {
    isError: boolean,
    errorMessage: string,
    value: string,
    onChange: any
}

export const ControlCfCaptcha: React.FC<IControlCfCaptchaProps> = (props) => {
    const turnstilePublicKey = process.env.NEXT_PUBLIC_WEBSITE_TURNSTILE as string;
    let fieldRootClass = classes.fieldroot;
    let errorMessageText = " - " + props.errorMessage;

    if (!props.isError)
        errorMessageText = "";

    if (props.isError)
        fieldRootClass += " " + classes.fielderror;

    return (
        <div className={fieldRootClass}>
            <div className={classes.field}>
                <Turnstile sitekey={turnstilePublicKey} onVerify={props.onChange} onTimeout={() => { props.onChange("") }} />
            </div>
            <div className={classes.errorspace}>
                {errorMessageText}
            </div>
        </div>
    )
}
