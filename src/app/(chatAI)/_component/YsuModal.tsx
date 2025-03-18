"use client";

import styles from "./ysuTalk.module.css";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LanguageModal() {
    const router = useRouter();
    const [selectedLang, setSelectedLang] = useState("Korean"); // 초기 선택값
    const languages = [
        "Korean",
        "English (American)",
        "Vietnamese",
        "Arabic (Modern Standard)",
        "Indonesian",
        "Japanese",
        "Chinese (Simplified)",
    ];

    // 언어를 선택하는 함수
    const handleLanguageSelect = (lang: string) => {
        setSelectedLang(lang);
        router.push(`/chatbot/ysu/mobile/?selectedLang=${encodeURIComponent(lang)}`); // URL 업데이트
    };

    return(
        <>
            <div className={`${styles.modal} ${styles.show} ${styles.modal_evt}`}>
                <div className={styles.modal_wrap}>
                    <div className={styles.modal_content}>
                        <div className={styles.modal_tit}>
                            <h1>Language</h1>
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
                                <li className={styles.dis}>Chinese<span>(Traditional)</span></li>
                                <li className={styles.dis}>English<span>(British)</span></li>
                                <li className={styles.dis}>Dutch</li>
                                <li className={styles.dis}>German</li>
                                <li className={styles.dis}>Italian</li>
                                <li className={styles.dis}>French <span>(European)</span></li>
                                <li className={styles.dis}>Polish</li>
                                <li className={styles.dis}>Portuguese <span>(Brazilian)</span></li>
                                <li className={styles.dis}>Russian</li>
                                <li className={styles.dis}>Spanish <span>(European)</span></li>
                                <li className={styles.dis}>Thai</li>
                                <li className={styles.dis}>Turkish</li>
                                <li className={styles.dis}>Spanish <span>(Latin American)</span></li>
                                <li className={styles.dis}>Bulgarian</li>
                                <li className={styles.dis}>Catalan</li>
                                <li className={styles.dis}>Croatian</li>
                                <li className={styles.dis}>Czech</li>
                                <li className={styles.dis}>Danish</li>
                                <li className={styles.dis}>Filipino</li>
                                <li className={styles.dis}>Finnish</li>
                                <li className={styles.dis}>Greek</li>
                                <li className={styles.dis}>Hebrew</li>
                                <li className={styles.dis}>Hindi</li>
                                <li className={styles.dis}>Hungarian</li>
                                <li className={styles.dis}>Latvian</li>
                                <li className={styles.dis}>Lithuanian</li>
                                <li className={styles.dis}>Norwegian <span>(Bokmål)</span></li>
                                <li className={styles.dis}>Portuguese <span>(European)</span></li>
                                <li className={styles.dis}>Romanian</li>
                                <li className={styles.dis}>Serbian <span>(Cyrillic)</span></li>
                                <li className={styles.dis}>Slovak</li>
                                <li className={styles.dis}>Slovenian</li>
                                <li className={styles.dis}>Swedish</li>
                                <li className={styles.dis}>Ukrainian</li>
                                <li className={styles.dis}>Uzbek</li>
                                <li className={styles.dis}>Persian</li>
                                <li className={styles.dis}>Afrikaans</li>
                                <li className={styles.dis}>Bengali <span>(Bangla)</span></li>
                                <li className={styles.dis}>Estonian</li>
                                <li className={styles.dis}>Icelandic</li>
                                <li className={styles.dis}>Malay</li>
                                <li className={styles.dis}>Marathi</li>
                                <li className={styles.dis}>Swahili</li>
                                <li className={styles.dis}>Tamil</li>
                                <li className={styles.dis}>Albanian</li>
                                <li className={styles.dis}>Armenian</li>
                                <li className={styles.dis}>Azerbaijani</li>
                                <li className={styles.dis}>Burmese <span>(Myanmar)</span></li>
                                <li className={styles.dis}>Georgian</li>
                                <li className={styles.dis}>Kazakh</li>
                                <li className={styles.dis}>Khmer</li>
                                <li className={styles.dis}>Lao</li>
                                <li className={styles.dis}>Macedonian</li>
                                <li className={styles.dis}>Punjabi</li>
                                <li className={styles.dis}>Nepali</li>
                                <li className={styles.dis}>Sinhala</li>
                                <li className={styles.dis}>Amharic</li>
                                <li className={styles.dis}>Gujarati</li>
                                <li className={styles.dis}>Kannada</li>
                                <li className={styles.dis}>Malayalam</li>
                                <li className={styles.dis}>Telugu</li>
                                <li className={styles.dis}>Urdu</li>
                                <li className={styles.dis}>Kyrgyz</li>
                                <li className={styles.dis}>Serbian <span>(Latin)</span></li>
                                <li className={styles.dis}>French <span>(CA)</span></li>
                                <li className={styles.dis}>Mongolian</li>
                            </ul>
                        </div>
                        {/* <div className={styles.modal_btn}>
                            <button className={styles.ok_btn} onClick={() => save()}>
                                <Image src="/images/ico-ok.svg" alt="chat_logo" width={21} height={20} /> 저장된 답변
                            </button>
                            <button className={styles.setting_btn} onClick={() => save()}>
                                <Image src="/images/ico-setting.svg" alt="chat_logo" width={21} height={20} /> 대화 설정
                            </button>
                        </div> */}
                    </div>
                </div>
            </div> 
        </>
    )
}