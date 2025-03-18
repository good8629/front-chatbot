"use client";

import styles from "./talk.module.css";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTogievelabsModalStore } from "@/store/togievelabs/useModalStore";

export default function LanguageModal() {
    const router = useRouter();
    
    const languages = [
        "ChatGPT",
        "llama3.3:latest",
        "gemma2:27b",
        "gemma2:2b",
        "gemma3:4b",
        "gemma3:12b",
        "gemma3:27b",
        "deepseek-r1:70b",
        "granite3.1-dense:latest"
    ];
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    const agentList = [
        "Youtube",
        "맛집",
        "날씨"
    ];

    const { openTogievelabsModal } = useTogievelabsModalStore();
    const [selectedLLm, setSelectedLLm] = useState("ChatGPT");              // LLM 초기 선택값
    const [selectedAgents, setSelectedAgents] = useState<string[]>([]);

    // 확인 버튼 클릭 시 부모에게 값 전달 후 모달 닫기
    const handleConfirm = () => {
        openTogievelabsModal(selectedLLm, selectedAgents);
        router.push("/chatbot/togievelabs/mobile"); // URL 업데이트
        //closeTogievelabsModal();
    };

    // LLM 모델을 선택하는 함수
    const handleLanguageSelect = (lang: string) => {
        setSelectedLLm(lang);
        setIsDropDownOpen(false);
    };

    // Agent를 선택하는 함수
    const handleAgentSelect = (item: string) => {
        setSelectedAgents((prev: string[]) =>
            prev.includes(item) ? prev.filter((i: string) => i !== item) : [...prev, item]
        );
    }

    const { llm, agents }: {llm: string, agents: string[]} = useTogievelabsModalStore();
    //console.log(llm);
    //console.log(agents);
    // useEffect(() => {
    //     setSelectedLLm(llm);
    // }, []);

    return(
        <>
            <div className={`${styles.modal} ${styles.show} ${styles.modal_evt}`}>
                <div className={styles.modal_wrap}>
                    <div className={styles.modal_content}>
                        <div className={styles.modal_tit}>
                            <h1>LLM 모델 선택</h1><Image src="/images/ico-close.svg" alt="chat_logo" width={30} height={30} onClick={() => router.back()}/>
                        </div>
                        {
                            isDropDownOpen ? (
                                <>
                                    <div className={styles.lang_con}>
                                        <ul className={styles.lang_tab}>
                                            {
                                                languages.map((lang) => (
                                                    <li key={lang} onClick={() => handleLanguageSelect((lang))}>
                                                        {lang}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={styles.llm_btn} onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
                                        {selectedLLm}<Image src="/images/ico-dropdown.svg" alt="dropdown" width={15} height={15}/>
                                    </div>
                                    <div className={styles.modal_sub_tit}>
                                        <h1>Agent선택</h1><span>(복수 선택 가능)</span>
                                    </div>
                                    <div className={styles.agent_con}>
                                        <ul className={styles.agent_tab}>
                                            {
                                                agentList.map((agent) => (
                                                    <li key={agent} className={selectedAgents.includes(agent) ? styles.on : ""} onClick={() => handleAgentSelect(agent)}>
                                                        {agent}
                                                    </li>
                                                ))
                                            }
                                            <li className={styles.dis}>패션</li>
                                            <li className={styles.dis}>음악</li>
                                            <li className={styles.dis}>도서</li>
                                        </ul>
                                    </div>
                                    <div className={styles.modal_btn}>
                                        <button className={styles.ok_btn} onClick={() => handleConfirm()}>
                                            <Image src="/images/ico-ok.svg" alt="chat_logo" width={20} height={20} onClick={() => router.back()}/> 옵션 적용
                                        </button>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}