/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { Suspense } from "react";
import Talk from '@/app/(chatAI)/_component/Talk';
import styles from '@/app/(chatAI)/_component/talk.module.css';

export default function Home() {
    return(
        <Suspense fallback={<p>Loading...</p>}>
            <div className={styles.body}>
                <Talk></Talk>
            </div>
        </Suspense>
    )
}