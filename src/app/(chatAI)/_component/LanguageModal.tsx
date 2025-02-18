"use client";

import styles from "./talk.module.css";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useModalStore } from "@/store/useModalStore";

export default function LanguageModal() {
    const router = useRouter();
    const [selectedLang, setSelectedLang] = useState("ChatGPT"); // 초기 선택값
    const languages = [
        "ChatGPT",
        "llama3.3:latest",
        "gemma2:27b",
        "gemma2:2b",
        "deepseek-r1:70b",
        "granite3.1-dense:latest"
    ];

    // 언어를 선택하는 함수
    const handleLanguageSelect = (lang: string) => {
        setSelectedLang(lang);
        router.push(`/?selectedLang=${encodeURIComponent(lang)}`); // URL 업데이트
    };

    const { isOpen, data } = useModalStore();
    if(data !== '') {
        useEffect(() => {
            setSelectedLang(data);
        }, []);
    }

    return(
        <>
            <div className={`${styles.modal} ${styles.show} ${styles.modal_evt}`}>
                <div className={styles.modal_wrap}>
                    <div className={styles.modal_content}>
                        <div className={styles.modal_tit}>
                            <Image src="/images/ico-close.svg" alt="chat_logo" width={30} height={30} onClick={() => router.back()}/>
                        </div>
                        <div className={styles.lang_con}>
                            <ul className={styles.lang_tab}>
                                {
                                    languages.map((lang) => (
                                        <li key={lang} className={selectedLang === lang ? styles.on : ""} onClick={() => handleLanguageSelect((lang))}>
                                            {lang}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    )
}