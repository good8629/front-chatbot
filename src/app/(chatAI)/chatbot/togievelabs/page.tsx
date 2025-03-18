
"use client";

import { useState, useEffect, useCallback} from "react";
import { useRouter } from "next/navigation";
import styles from '@/app/(chatAI)/_component/lenovoTalk.module.css';
import { useModalStore } from "@/store/lenovo/useModalStore";

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
            router.push("./togievelabs/mobile");
            //router.push("/");
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
    
    return(
        <div className={styles.pc_body}>
            <div className={styles.pc_container}>
                <div className={styles.pc_left}>
                </div>
                <div className={styles.pc_right}>
                    <iframe src="./togievelabs/mobile" width="393" height="700" className={styles.pc_background}></iframe>
                </div>
            </div>
        </div>
    )
}