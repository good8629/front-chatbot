"use client";

import styles from './ysuTalk.module.css';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Message {
    message: string;
    autherType: number;         // 0: AI, 1: 사용자
    action: string;
    urls: string[];
    videos: YouTubes[];
}

interface YouTubes{
    title: string,
    url: string,
    thumbnails: string
}

interface responseMessage {
    question: string;
    answer: string;
    action: string;
    urls: string[];
    videos: YouTubes[];
}

export default function Talk() {
    const searchParams = useSearchParams();

    const [question, setQuestion] = useState("");
    const [language, setLanguageMessage] = useState("한국어");
    const [useMessage, setUseMessage] = useState("이용중");
    const [typingMessage, setTypingMessage] = useState<string>("");
    const [placeholderMessage, setPlaceholderMessage] = useState("대화를 입력 해보세요.");
    const [dropdownLanguage, setDropdownLanguage] = useState("Language");
    //const [isCheck, setIsCheck] = useState(false);
    
    const [isSend, setIsSend] = useState(true);             // 기본 보내기 가능

    const [Messages, setMessages] = useState<Message[]>([
        { 
            message: '반갑습니다! 저는 영산대학교 유학 상담 AI ‘영산이’ 입니다. 우리 대학에 대해서 무엇이든 물어보세요! 질문이 구체적일수록 정확한 답변을 받으실 수 있어요. 예를 들어, 학과 정보, 지원 절차, 장학금 안내 등이 있습니다.', 
            autherType: 0, 
            action: 'MS001', 
            urls: [],
            videos: []
        }
    ]);

    useEffect(() => {
        const lang = searchParams.get("selectedLang");
        if (lang == "Korean") {
            setLanguageMessage("한국어");
            setPlaceholderMessage("대화를 입력 해보세요.");
            setDropdownLanguage("Korean");
            setUseMessage("이용중");
            setMessages([]);
            setMessages([{
                message: '반갑습니다! 저는 영산대학교 유학 상담 AI ‘영산이’ 입니다. 우리 대학에 대해서 무엇이든 물어보세요! 질문이 구체적일수록 정확한 답변을 받으실 수 있어요. 예를 들어, 학과 정보, 지원 절차, 장학금 안내 등이 있습니다.',
                autherType: 0,
                action: 'MS001',
                urls: [],
                videos: []
            }])
        } else if(lang == "English (American)") {
            setLanguageMessage("미국 영어");
            setPlaceholderMessage("Enter a conversation.");
            setDropdownLanguage("English");
            setUseMessage("In use");
            setMessages([]);
            setMessages([{
                message: 'Hello! I am Yeongsan AI, a study abroad counseling AI at Yeongsand University. Ask me anything about our university! The more specific your question is, the more accurate your answer will be. For example, you can ask about department information, application procedures, scholarship information, and more',
                autherType: 0,
                action: 'MS001',
                urls: [],
                videos: []
            }])
        } else if(lang == "Vietnamese") {
            setLanguageMessage("베트남어");
            setPlaceholderMessage("Hãy nhập đoạn hội thoại.");
            setDropdownLanguage("Vietnamese");
            setUseMessage("Đang sử dụng");
            setMessages([]);
            setMessages([{
                message: 'Xin chào! Tôi là Youngsan AI, trợ lý tư vấn du học tại Đại học Youngsan. Bạn có thể hỏi tôi bất cứ điều gì về trường đại học của chúng tôi! Càng cụ thể câu hỏi của bạn, tôi càng cung cấp cho bạn câu trả lời chính xác hơn. Ví dụ như thông tin về khoa, thủ tục ứng tuyển, thông tin về học bổng, v.v.', 
                autherType: 0,
                action: 'MS001',
                urls: [],
                videos: []
            }]);
        } else if(lang == "Arabic (Modern Standard)") {
            setLanguageMessage("현대 표준 아랍어");
            setPlaceholderMessage("أدخل محادثة.");
            setDropdownLanguage("Arabic");
            setUseMessage("في الاستخدام");
            setMessages([]);
            setMessages([{
                message: "مرحبا! أنا \"يونغسان\" ، مساعد الذكاء الاصطناعي للاستشارات الدراسية في جامعة يونغسان. اسألني أي شيء عن جامعتنا! ستحصل على إجابات أكثر دقة إذا كانت أسئلتك محددة. على سبيل المثال، يمكنك سؤالي عن معلومات القسم، وإجراءات التقديم، ومعلومات المنح الدراسية، وغيرها الكثير.", 
                autherType: 0,
                action: 'MS001',
                urls: [],
                videos: []
            }]);
        } else if(lang == "Indonesian") {
            setLanguageMessage("인도네시아어");
            setUseMessage("Sedang digunakan");
            setPlaceholderMessage("Masukan percakapan Anda.");
            setDropdownLanguage("Indonesian");
            setMessages([]);
            setMessages([{
                message: 'Selamat siang! Saya adalah Youngsan AI Counselor, “Youngsani”, dari Youngsan University. Silakan bertanya tentang universitas kami. Semakin spesifik pertanyaan Anda, semakin akurat jawaban yang akan Anda dapatkan. \n\nContohnya, informasi tentang jurusan, prosedur pendaftaran, atau panduan beasiswa.',
                autherType: 0,
                action: 'MS001',
                urls: [],
                videos: []
            }]);
        } else if(lang == "Japanese") {
            setLanguageMessage("일본어");
            setUseMessage("使用中");
            setPlaceholderMessage("対話を入力してみてください.");
            setDropdownLanguage("Japanese");
            setMessages([]);
            setMessages([{
                message: 'こんにちは！私は英山大学留学相談AI「영산이」です。\n\n私たちの大学について、何でも質問してください！質問が具体的であればあるほど、正確な回答を得ることができます。 例えば、学科の情報、応募手続き、奨学金制度などの情報提供ができます',
                autherType: 0,
                action: 'MS001',
                urls: [],
                videos: []
            }]);
        } else if(lang == "Chinese (Simplified)") {
            setLanguageMessage("간체 중국어");
            setUseMessage("使用中");
            setPlaceholderMessage("请输入对话.");
            setDropdownLanguage("Chinese");
            setMessages([]);
            setMessages([{
                message: '你好！我是영산대학교留学咨询AI“영산이”。关于我们大学，你有什么问题都可以问我！问题越具体，你获得的答案就越准确。例如，你可以询问专业信息、申请流程、奖学金等内容。',
                autherType: 0,
                action: 'MS001',
                urls: [],
                videos: []
            }]);
        } else {
            //redirect('/');
            setLanguageMessage("한국어");
            setPlaceholderMessage("대화를 입력 해보세요.");
            setUseMessage("이용중");
            setMessages([]);
            setMessages([{
                message: '반갑습니다! 저는 영산대학교 유학 상담 AI ‘영산이’ 입니다. 우리 대학에 대해서 무엇이든 물어보세요! 질문이 구체적일수록 정확한 답변을 받으실 수 있어요. 예를 들어, 학과 정보, 지원 절차, 장학금 안내 등이 있습니다.',
                autherType: 0,
                action: 'MS001',
                urls: [],
                videos: []
            }])
        }

    }, [searchParams]); // searchParams가 변경될 때 실행

    const sendMessageToServer = async (userQuestion: string) => {
        try {
            setIsSend(false);

            const res = await fetch("/api/ysu", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: userQuestion, language }),
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }

            const data = await res.json();
            //console.log(data);
            
            let urls = [];
            if (data.info.action != 'MS001') {
                urls = data.info.sub_info.urls;
            }

            // 유튜브 틀어달라는 영상일때 전달받음
            let videos = [];
            if(data.info.action == "MS002") {
                videos = data.info.sub_info.videos;
            }

            const reMessage: responseMessage = {
                question: data.question,
                answer: data.info.message,
                action: data.info.action,
                urls: urls,
                videos: videos
            };

            // 3. AI 답변을 타이핑 효과로 표시하기 전에 빈 AI 메시지 블록 추가
            setMessages((prevMessages) => [
                ...prevMessages,
                { message: "", autherType: 0, action: data.info.action, urls: urls, videos: videos } // 빈 메시지 추가 후 타이핑
            ]);

            // 2. 입력 필드 초기화
            setQuestion("");
            typingEffect(reMessage);
        } catch (error) {
            setIsSend(true);
            console.error("Error while sending request:", error);
        } finally {
            setIsSend(false);
        }
    };

    // Enter 키 이벤트 핸들러
    const enterPressed = useRef(false);

    const handleSubmit = () => {
        if (!question.trim()) return;
        //question.indexOf("영산대") == -1 ? setIsCheck(true) : setIsCheck(false);
        
        // setTimeout을 사용하여 입력값 초기화 시점 조정
        setTimeout(() => {
            setQuestion("");
        }, 50);

        //enterPressed.current = false; // 다시 입력 가능하도록 초기화

        sendMessageToServer(question);

        // 1️. 사용자 질문 추가
        setMessages((prevMessages) => [
            ...prevMessages,
            { message: question, autherType: 1, action: 'MS001', urls: [], videos: [] }
        ]);

        // 2. 입력 필드 초기화
        setQuestion("");
    }

    const typingEffect = (reMessage: responseMessage) => {
        let index = 0;
        setTypingMessage(""); // 기존 텍스트 초기화
        const typingInterval = setInterval(() => {
            if (index < reMessage.answer.length - 1) {
                setTypingMessage((prev) => prev + reMessage.answer[index -1])
                index++;
            } else {
                clearInterval(typingInterval);
                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages];
                    updatedMessages[updatedMessages.length - 1] = {
                        message: reMessage.answer,
                        autherType: 0,
                        action: reMessage.action,
                        urls: reMessage.urls,
                        videos: reMessage.videos
                    };
                    
                    setIsSend(true);            // 입력 완료시점
                    return updatedMessages;
                });

                setTypingMessage(""); // 타이핑 메시지 제거
            }
        }, reMessage.answer.length > 100 ? 20 : 50);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && !enterPressed.current) {
            enterPressed.current = true;
            handleSubmit();         // Enter 키를 누르면 버튼 클릭 실행
            setTimeout(() =>{
                enterPressed.current = false;
            }, 500);
        }
    };

    const renderChatMessage = (msg: Message, index: number, typingMessage: string) => {
        if (msg.action == "MS001") {                    // 메세지
            if (index === Messages.length - 1 && typingMessage) {
                return (
                    <div className={styles.lef_chat_con}>
                        {typingMessage}
                    </div>
                );
            } else {
                return (
                    <div className={styles.lef_chat_con}>
                        {msg.message}
                    </div>
                );
            }
        } else if(msg.action == "MS002") {              // 유튜브 동작
            return (
                <div className={styles.lef_chat_con}>
                    {youtubeMessage(msg)}
                </div>
            )
        } else if(msg.action == "MS003") {              // 날씨
            // 이미지로 대체함
            return(
                <>
                    <div className={styles.lef_chat_con}>
                        <Image src="/images/img-weather-v1.png" alt="weather" width={292} height={205.26}></Image>
                    </div>
                </>
            )
        } else if(msg.action == "MS004") {              // 식당
            return(
                <>
                    <div className={styles.lef_chat_con}>
                        <Image src="/images/img-restr01.png" alt="weather" width={292} height={120.26}></Image>
                    </div>
                </>
            )
        } else{
            return(
                <>
                    <div className={styles.lef_chat_con}>
                        {msg.message}
                    </div>
                </>
            )
        }
    };

    const youtubeMessage = (msg: Message) => {
        return(
            msg.videos.map((item, index) => (
                <div className={`${styles.youtube_wrap} ${styles.mb15}`} key={`youtube-${index}`}>
                    <a className={styles.youtube_a} href={item.url} target='_blank'>
                        <img className={`${styles.youtube_image_container} ${styles.youtube_image_fit}`} src={item.thumbnails} alt="YouTube Thumbnail" width={116.8} height={64.34} />
                    </a>
                    <p className={styles.youtube_p}>
                        {item.title}
                    </p>
                </div>
            ))
        )
        // return(
        //     <div className={`${styles.youtube_wrap} ${styles.mb15}`} key={`youtube-${0}`}>
        //         {/* <Image src={msg.videos[0].thumbnails} alt="youtube" width={116.8} height={64.34} layout="intrinsic"></Image> */}
        //         <img src="https://i.ytimg.com/vi/yiRqq9KBhd4/hq720.jpg" alt="YouTube Thumbnail" width={116.8} height={64.34} />
        //         <p>
        //             {msg.videos[0].title}
        //         </p>
        //     </div>
        // )
    }

    const sendMessage = () => {
        if(isSend) {
            return (
                <button type="submit" onClick={handleSubmit}>
                    <Image src="/images/ysu/ico-send.svg" alt="send" width={50} height={40}/>
                </button>
            )
        } else {
            return (
                <button>
                    <Image src="/images/ico-send_non.svg" alt="send" width={50} height={40}/>
                </button>
            )
        }
    } 

    // 메시지가 추가될 때 스크롤을 맨 아래로 이동 (채팅 스크롤 최하단 유지기능)
    const chatEndRef = useRef<HTMLDivElement | null>(null); // 마지막 메시지 참조
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [Messages, typingMessage]); // messages 또는 typingMessage가 변경될 때 실행

    return(
        <>
            <header>
                <div className={styles.header_inner}>
                    <a>
                        <Image src="/images/img-logo-new.png" alt="logo" width={77} height={36}></Image>
                    </a>
                    <Link href="/chatbot/ysu/mobile/i/language" className={styles.lan_btn}>
                        {dropdownLanguage} <Image src="/images/ico-dropdown.svg" alt="dropdown" width={18} height={10}/>
                    </Link>
                </div>
            </header>
            <main>
                <div className={styles.main_inner}>
                    {Messages.map((msg, index) => (
                        msg.autherType === 0 ? (
                            <div className={styles.lef_chat} key={`ai-${index}`}>
                                <div className={styles.lef_chat_tit}>
                                    <Image src="/images/ysu/ico-chat.svg" alt="chat_logo" width={40} height={40} />
                                    <div className={styles.lef_chat_tit_txt}>
                                        <h2>Y'sU</h2>
                                        <p>영산대학교</p>
                                    </div>
                                </div>
                                {renderChatMessage(msg, index, typingMessage)}
                            </div>
                        ) : (
                            <div className={styles.rig_chat} key={`user-${index}`}>
                                <span>{msg.message}</span>
                            </div>
                        )
                    ))}
                </div>
                <div ref={chatEndRef} /> {/* 스크롤 이동을 위한 빈 div */}
            </main>
            <footer>
                <div className={styles.footer_inner}>
                    <div className={styles.using_txt}>
                        <Image src="/images/ico-smile.svg" alt="smile" width={16} height={15}/>
                        <p>Chat AI {useMessage}</p>
                    </div>
                    <div className={styles.chat_con}>
                        <input type="text" placeholder={placeholderMessage} value={question} onChange={(e) => setQuestion(e.target.value)} onKeyDown={handleKeyDown}/>
                        {sendMessage()}
                    </div>
                </div>
            </footer>
        </>
    )
}