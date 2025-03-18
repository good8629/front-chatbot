"use client";
import { useEffect } from "react";
import { useRouter, redirect } from "next/navigation";
import Image from 'next/image';
import styles from '@/app/(chatAI)/_component/talk.module.css';


export default function Home() {
    const router = useRouter();

    useEffect(() => {
        // 모바일 디바이스 감지
        const isMobile = /iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile|Windows Phone/i.test(navigator.userAgent);

        if (isMobile) {
            // 모바일 페이지로 리다이렉트
            redirect('/');
        }
    }, [router]); 

    return(
        <>
            <div className={styles.pc_body}>
                <div className={styles.pc_container}>
                    <div className={styles.pc_left}>
                        <Image src="/images/demo_info_v1.png" alt="Chat AI Demo Version infomation" width={800} height={852}></Image>
                    </div>
                    <div className={styles.pc_right}>
                        <iframe src="./ysu/mobile" width="393" height="852" className={styles.pc_background} scrolling="yes"></iframe>
                    </div>
                </div>
            </div>
        </>
    )
}