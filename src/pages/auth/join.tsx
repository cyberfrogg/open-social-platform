import Head from 'next/head'
import React from 'react'
import { MainPageLayout } from '@/layouts/mainpage/MainPageLayout';

export default function Join() {
    return (
        <>
            <Head>
                <title>Sign in</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="pagecontainer">
                <MainPageLayout title={"Home"}>
                    text
                </MainPageLayout>
            </div>
        </>
    )
}
