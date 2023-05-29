import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import classes from './sidebarhamburger.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { toggle } from '@/slices/parts/sidebarSlice';

interface ISideBarHamburgerProps {

}

export const SideBarHamburger: React.FC<ISideBarHamburgerProps> = (props) => {
    const dispatch = useDispatch();
    const isOpened = useSelector((state: RootState) => state.sidebar.isOpened);

    const onClick = () => {
        dispatch(toggle());
    }

    return (
        <button
            className={classes.button + " " + (isOpened ? classes.opened : "")}
            onClick={onClick}
        >
            <svg className={classes.hamsvg} xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path d="M1 11H15M1 6H15M1 1H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg className={classes.closesvg} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g id="Menu / Close_MD">
                    <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
            </svg>
        </button>
    );
}
