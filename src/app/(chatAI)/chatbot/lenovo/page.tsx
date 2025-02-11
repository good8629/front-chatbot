"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import styles from '@/app/(chatAI)/_component/talk.module.css';


export default function Home() {
    const router = useRouter();

    useEffect(() => {
        // 모바일 디바이스 감지
        const isMobile = /iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile|Windows Phone/i.test(navigator.userAgent);

        if (isMobile) {
            // 모바일 페이지로 리다이렉트
            router.push("/mobile");
        }
    }, [router]); 

    return(
        <>
            <div className={styles.pc_body}>
                <div className={styles.pc_container}>
                    <div className={styles.pc_left}>
                        <Image src="/images/info-techday.png" alt="Chat AI Demo Version infomation" width={631} height={700}></Image>
                    </div>
                    <div className={styles.pc_right}>
                        <iframe src="/" width="393" height="700" className={styles.pc_background}></iframe>
                    </div>
                </div>
            </div>
        </>
    )
}