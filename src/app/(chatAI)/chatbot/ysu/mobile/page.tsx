"use client";

import Talk from '@/app/(chatAI)/_component/YsuTalk';
import styles from '@/app/(chatAI)/_component/ysuTalk.module.css';

export default function Home() {
    return(
        <>
            <div className={styles.body}>
                <Talk></Talk>
            </div>
        </>
    )
}