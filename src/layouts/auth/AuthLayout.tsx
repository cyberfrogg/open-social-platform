import Head from 'next/head';
import React from 'react';
import classes from './authlayout.module.css'
import Image from 'next/image';

interface IAuthLayoutProps {
    title: string
    children: React.ReactNode
}

export const AuthLayout: React.FC<IAuthLayoutProps> = (props) => {
    const authImageSrc = process.env.NEXT_PUBLIC_WEBSITE_AUTH_IMAGE as string;

    return (
        <div className={classes.authlayout}>
            <Head>
                <title>{props.title + " - " + process.env.NEXT_PUBLIC_WEBSITE_NAME}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className={classes.backgroundimage}>
                <Image loading='lazy' className={classes.image} src={authImageSrc} alt="Authorize on platform background image" fill quality={100} />
            </div>
            <div className={classes.container}>
                {props.children}
            </div>
        </div>
    );
}
