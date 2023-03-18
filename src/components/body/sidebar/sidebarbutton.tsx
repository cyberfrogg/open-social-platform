import Head from 'next/head';
import React from 'react';
import classes from './sidebarbutton.module.css'
import Link from 'next/link';
import { Icon } from '@/components/controls/icon/icon';

interface ISideBarButtonProps {
    href: string
    children: React.ReactNode 
    iconType: string
}

export const SideBarButton: React.FC<ISideBarButtonProps> = (props) => {
    return (
        <li className={classes.button}>
            <Link href={props.href} className={classes.link}>
                <Icon iconType={props.iconType}/><div className={classes.content}>{props.children}</div>                
            </Link>
        </li>
    );
}
