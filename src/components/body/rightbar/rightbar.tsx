import Head from 'next/head';
import React from 'react';
import classes from './rightbar.module.css'

interface IRightBarProps {
    
}

export const RightBar: React.FC<IRightBarProps> = (props) => {
    return (
        <aside className={classes.rightbar}>
            
        </aside>
    );
}
