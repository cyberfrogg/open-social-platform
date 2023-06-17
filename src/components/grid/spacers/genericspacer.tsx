import React from 'react';

export interface IGenericSpacerProps {
    height: number
}

export const GenericSpacer: React.FC<IGenericSpacerProps> = (props) => {
    return (
        <div style={{ height: props.height }}>

        </div>
    )
}