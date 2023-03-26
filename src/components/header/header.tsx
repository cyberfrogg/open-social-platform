import Head from 'next/head';
import React from 'react';
import classes from "./header.module.css";

interface IHeaderProps {
    
}

export const Header: React.FC<IHeaderProps> = (props) => {
    return (
        <>
            <header className={classes.header}>
                <div className={classes.headercontainer}>
                    <div className={classes.sidebar}>

                    </div>
                    <div className={classes.maincontent}>

                    </div>
                    <div className={classes.rightbar}>

                    </div>
                </div>
            </header>
            <div className={classes.headeroffset}></div>
        </>
    );
}
