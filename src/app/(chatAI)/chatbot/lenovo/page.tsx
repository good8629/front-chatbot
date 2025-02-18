"use client";

import { useState, useEffect, useCallback} from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import styles from '@/app/(chatAI)/_component/talk.module.css';
import { useModalStore } from "@/store/useModalStore";

export default function Home() {
    const router = useRouter();
    const { openModel } = useModalStore();
    const [value, setValue] = useState("");

    const stableOpenModal = useCallback((data: string) => {
        openModel(data);
    }, [openModel])

    useEffect(() => {
        // 모바일 디바이스 감지
        const isMobile = /iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile|Windows Phone/i.test(navigator.userAgent);

        if (isMobile) {
            // 모바일 페이지로 리다이렉트
            router.push("/mobile");
        }

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === "modalData" && event.newValue) {
                const modalData = JSON.parse(event.newValue);
                if (modalData.type === "OPEN_MODAL") {
                    setValue(modalData.data);
                    openModel(modalData.data);
                }
            }
        };
    
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);

    }, [router, stableOpenModal]);

    const modelInfo = () => {
        if(value === "ChatGPT") {
            return (
                <Image src="/images/llm_gpt.png" alt="Chat AI Demo Version infomation" width={631} height={700}></Image>
            )
        } else if(value === "llama3.3:latest") {
            return (
                <Image src="/images/llm_llama.png" alt="Chat AI Demo Version infomation" width={631} height={700}></Image>
            )
        } else if(value === "gemma2:27b") {
            return (
                <Image src="/images/llm_gemma2-2b.png" alt="Chat AI Demo Version infomation" width={631} height={700}></Image>
            )
        } else if(value === "gemma2:2b") {
            return (
                <Image src="/images/llm_gemma2-27.png" alt="Chat AI Demo Version infomation" width={631} height={700}></Image>
            )
        } else if(value === "deepseek-r1:70b") {
            return (
                <Image src="/images/llm_deepseek.png" alt="Chat AI Demo Version infomation" width={631} height={700}></Image>
            )
        } else if(value === "granite3.1-dense:latest") {
            return (
                <Image src="/images/llm_granite.png" alt="Chat AI Demo Version infomation" width={631} height={700}></Image>
            )
        } else {
            return (
                <Image src="/images/llm_gpt.png" alt="Chat AI Demo Version infomation" width={631} height={700}></Image>
            )
        }
    };
 
    return(
        <>
            <div className={styles.pc_body}>
                <div className={styles.pc_container}>
                    <div className={styles.pc_left}>
                        {modelInfo()}
                        {/* <Image src="/images/info-techday.png" alt="Chat AI Demo Version infomation" width={631} height={700}></Image> */}
                    </div>
                    <div className={styles.pc_right}>
                        <iframe src="/" width="393" height="700" className={styles.pc_background}></iframe>
                    </div>
                </div>
            </div>
        </>
    )
}