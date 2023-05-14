import React from "react";
import { useRef } from "react";

// https://stackoverflow.com/a/64658794/13728122
export const ContentEditableWithRef = (props: any) => {
    const defaultValue = useRef(props.value);

    const handleInput = (event: any) => {
        if (props.onChange) {
            props.onChange(event.target.innerHTML);
        }
    };
    const handleClick = (event: any) => {
        if (props.onClick) {
            props.onClick(event.target)
        }
    }

    return (
        <span
            contentEditable
            onInput={handleInput}
            onClick={handleClick}
            className={props.className}
            dangerouslySetInnerHTML={{ __html: defaultValue.current }}
        />
    );
};
