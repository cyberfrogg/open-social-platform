import Head from 'next/head';
import React from 'react';
import classes from './mainpagelayout.module.css'
import { SideBar } from '@/components/body/sidebar/sidebar';
import { Header } from '@/components/header/header';
import { RightBar } from '@/components/body/rightbar/rightbar';

interface IMainPageLayoutProps {
    title: string
    children: React.ReactNode 
}

export const MainPageLayout: React.FC<IMainPageLayoutProps> = (props) => {
    return (
        <div className={classes.mainpagelayout}>
            <Head>
                <title>{props.title + " - " + process.env.NEXT_PUBLIC_WEBSITE_NAME}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header/>
            <div className={classes.contentsplit}>
                <SideBar/>
                <div className={classes.maincontent}>

                </div>
                <RightBar/>
            </div>
        </div>
    );
}
