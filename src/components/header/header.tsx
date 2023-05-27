import Head from 'next/head';
import React from 'react';
import classes from "./header.module.css";
import { ProfileMenu } from '../parts/profilemenu/profilemenu';
import Link from 'next/link';

interface IHeaderProps {

}

export const Header: React.FC<IHeaderProps> = (props) => {
    return (
        <>
            <header className={classes.header}>
                <div className={classes.headercontainer}>
                    <div className={classes.sidebar}>
                        <Link className={classes.logo} href={"/"}>
                            <div className={classes.small}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="35" viewBox="0 0 36 35" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M35.0194 -3.27919e-06L17.472 34.9709L0 -3.27919e-06L17.472 15.0175L35.0194 -3.27919e-06ZM12.7134 9.63289L17.5097 4.85692L22.372 9.65568L17.5456 13.7686L12.7134 9.63289Z" fill="url(#paint0_linear_109_337)" />
                                    <defs>
                                        <linearGradient id="paint0_linear_109_337" x1="9.66088" y1="19.2937" x2="25.1482" y2="19.2937" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#8D57FF" />
                                            <stop offset="1" stopColor="#E065FF" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <div className={classes.wide}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="35" viewBox="0 0 36 35" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M35.0194 -3.27919e-06L17.472 34.9709L0 -3.27919e-06L17.472 15.0175L35.0194 -3.27919e-06ZM12.7134 9.63289L17.5097 4.85692L22.372 9.65568L17.5456 13.7686L12.7134 9.63289Z" fill="url(#paint0_linear_109_337_wide)" />
                                    <defs>
                                        <linearGradient id="paint0_linear_109_337_wide" x1="9.66088" y1="19.2937" x2="25.1482" y2="19.2937" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#8D57FF" />
                                            <stop offset="1" stopColor="#E065FF" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <span className={classes.logotitle}>
                                    VANAKARIS
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div className={classes.maincontent}>

                    </div>
                    <div className={classes.rightbar}>
                        <ProfileMenu />
                    </div>
                </div>
            </header>
            <div className={classes.headeroffset}></div>
        </>
    );
}
