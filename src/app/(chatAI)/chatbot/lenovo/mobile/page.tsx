"use client";

import Talk from '@/app/(chatAI)/_component/LenovoTalk';
import styles from '@/app/(chatAI)/_component/lenovoTalk.module.css';

export default function Home() {
    return(
        <>
            <div className={styles.body}>
                <Talk></Talk>
            </div>
        </>
    )
}