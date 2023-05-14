import React from "react";
import { useRef } from "react";

// https://stackoverflow.com/a/64658794/13728122
export const ContentEditableWithRef = (props: any) => {
    const defaultValue = useRef(props.value);

    const handleInput = (event: any) => {
        console.log(props);
        if (props.onChange) {
            props.onChange(event.target.innerHTML);
        }
    };

    return (
        <span
            contentEditable
            onInput={handleInput}
            className={props.className}
            dangerouslySetInnerHTML={{ __html: defaultValue.current }}
        />
    );
};
