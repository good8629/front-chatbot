/* eslint-disable react/no-unescaped-entities */

"use client";

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from "next/navigation";
import { useTogievelabsModalStore } from "@/store/togievelabs/useModalStore";
import styles from './talk.module.css';
import Image from 'next/image';
import Link from "next/link";

interface Message {
    message: string;
    autherType: number;         // 0: AI, 1: 사용자
    action: string;
    urls: string[];
    videos: YouTubes[];
    sub_info?: SubInfo;
    recommendation_image: FashionImages[];
}

interface YouTubes{
    title: string,
    url: string,
    thumbnails: string
}

interface FashionImages{
    brand: string,
    category_middle: string,
    category_sub: string,
    category_top: string,
    discount_price: number,
    image_url: string,
    price: number,
    price_rate: number,
    product: string,
    product_code: string,
    product_url: string,
    review_count: number,
    review_score: number
}

interface responseMessage {
    question: string;
    answer: string;
    action: string;
    urls: string[];
    videos: YouTubes[];
    sub_info: SubInfo;
    recommendation_image: FashionImages[];
}

interface SubInfo {
    location: string;
    restaurant: string;
}

export default function Talk() {
    const searchParams = useSearchParams();
    const [question, setQuestion] = useState("");
    const [typingMessage, setTypingMessage] = useState<string>("");
    const [placeholderMessage, setPlaceholderMessage] = useState("대화를 입력 해보세요.");
    const [isSend, setIsSend] = useState(true);             // 기본 보내기 가능
    const initMessage = "AI Qurator 입니다. 무엇이든 물어보세요.";
    const [randomKey, setRandomKey] = useState<number | null>(null);
    const [Messages, setMessages] = useState<Message[]>([
        { 
            message: initMessage, 
            autherType: 0, 
            action: "MS001", 
            urls: [],
            videos: [],
            recommendation_image: []
        }
    ]);

    const { llm, agents, openTogievelabsModal } = useTogievelabsModalStore();

    const sendMessageToServer = async (userQuestion: string) => {
        const mapping = new Map<string, string>([
            ["맛집", "restaurant_tool"],
            ["날씨", "weather_tool"],
            ["Youtube", "youtube_tool"],
            ["패션", "fashion_tool"],
        ]);

        const replacedAgents = agents.map(item => mapping.get(item) || item);

        try {
            const res = await fetch("/api/chatbot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                //body: JSON.stringify({ question: userQuestion, llmModel: dropdownLanguage, key: randomKey}),
                body: JSON.stringify({ question: userQuestion, llmModel: llm, key: randomKey, agents: replacedAgents}),
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }

            const data = await res.json();
            console.log(data);

            let urls = [];
            if (data.info.action !== 'MS001') {
                urls = data.info.sub_info.urls;
            }

            // 유튜브 영상일때 전달받음
            let videos = [];
            if (data.info.action === "MS002") {
                videos = data.info.sub_info.videos;
            }

            // 맛집
            let eats = [];
            let location = '';
            let restaurant = '';
            if (data.info.action === "MS004") {
                eats = data.info.sub_info;
                location = data.info.sub_info.location;
                restaurant = data.info.sub_info.restaurant;
            }

            // 패션
            let fashions = [];
            if(data.info.action === "MS006") {
                fashions = data.info.sub_info.recommendation_image;
                let randomFashion = getTopElements(fashions, 5);
                //console.log(randomFashion);
                fashions = randomFashion;
                //console.log(fashions);
            }

            // 3. AI 답변을 타이핑 효과로 표시하기 전에 빈 AI 메시지 블록 추가
            setMessages((prevMessages) => [
                ...prevMessages,
                { message: "", autherType: 0, action: data.info.action, urls: urls, videos: [], recommendation_image: [] } // 빈 메시지 추가 후 타이핑
            ]);

            const reMessage: responseMessage = {
                question: data.question,
                answer: data.info.message,
                action: data.info.action,
                urls: urls,
                videos: videos,
                sub_info: eats,
                recommendation_image: fashions
            };

            if (data.info.action === "MS001" || data.info.action === "MS002" || data.info.action === "MS003" || data.info.action === "MS006") {
                typingEffect(reMessage);
            } else if(data.info.action === "MS004") {
                restaurantInfo(location, restaurant, reMessage);
            }

            // 4. 입력 필드 초기화
            setQuestion("");

        } catch (error) {
            setIsSend(false);
            console.error("Error while sending request:", error);
        } finally {
            setIsSend(false);
        }
    };

    // Enter 키 이벤트 핸들러
    const enterPressed = useRef(false);

    const handleSubmit = () => {
        if (!question.trim()) return;
        
        setIsSend(false);

        // setTimeout을 사용하여 입력값 초기화 시점 조정
        setTimeout(() => {
            setQuestion("");
        }, 50);

        //enterPressed.current = false; // 다시 입력 가능하도록 초기화
        sendMessageToServer(question);

        // 사용자 질문 추가
        setMessages((prevMessages) => [
            ...prevMessages,
            { message: question, autherType: 1, action: 'MS001', urls: [], videos: [], recommendation_image: [] }
        ]);

        // 입력 필드 초기화
        setQuestion("");
    }

    // 글자 효과를 줍니다.
    const typingEffect = (reMessage: responseMessage) => {
        let index = 0;
        setTypingMessage(""); // 기존 텍스트 초기화
        const typingInterval = setInterval(() => {
            if (index < reMessage.answer.length - 1) {
                setTypingMessage((prev) => prev + (reMessage.answer[index - 1] == undefined ? reMessage.answer[index] : reMessage.answer[index - 1]));
                //setTypingMessage((prev) => prev + reMessage.answer[index - 1]);
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
                        videos: reMessage.videos,
                        sub_info: reMessage.sub_info,
                        recommendation_image: reMessage.recommendation_image
                    };
                    
                    setIsSend(true);            // 입력 완료시점
                    return updatedMessages;
                });

                setTypingMessage(""); // 타이핑 메시지 제거
            }
        }, reMessage.answer.length > 100 ? 20 : 50);
    };

    // action의 정보가 음식 정보이면 식당정보를 만들어 줍니다.
    const restaurantInfo = async (location: string, restaurant: string, reMessage: responseMessage) => {
        try {
            const res = await fetch("/api/agent/restaurants", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ location: location, restaurant: restaurant})
            });

            const data = await res.json();

            if(data.places.length > 0) {
                // 4.5점 이상의 음식점 필터링
                //const filteredPlaces = data.places.filter((place: any) => parseFloat(place.rating) >= 4.5).sort((a: any, b: any) => parseFloat(b.rating) - parseFloat(a.rating));
                // ✅ 4.5 이상 평점 필터링 & 내림차순 정렬 (문자형 방지)
                const filteredPlaces = data.places.filter((place: any) => parseFloat(place.rating) >= 4.5).sort((a: any, b: any) => parseFloat(b.rating) - parseFloat(a.rating)); // 🔽 내림차순 정렬
                
                if(filteredPlaces.length == 0) {
                    reMessage.answer = "평점 4.5 이상의 맛집 음식점만 노출되도록 필터링이 되어있습니다.";
                } else {
                    // reMessage.answer = `🔎 ${location}에서 추천하는 ${restaurant} 맛집:\n${filteredPlaces
                    //     .map((place: any, index: number) => `🍽️ ${index + 1}. ${place.displayName.text} (⭐ ${place.rating})`)
                    //     .join("\n")}`;

                    reMessage.answer = `🔎 ${location}에서 추천하는 ${restaurant} 맛집:\n${filteredPlaces
                        .map((place: any, index: number) => `🍽️ ${index + 1}. ${place.displayName.text} (⭐ ${place.rating})`)
                        .join("\n")}`;
                }
                
                typingEffect(reMessage);
            }

            if (!res.ok) {
                throw new Error(`Error: `);
            }
            
        } catch (e) {

        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && !enterPressed.current) {
            enterPressed.current = true;
            handleSubmit();         // Enter 키를 누르면 버튼 클릭 실행
            setTimeout(() => {
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
            return(
                <>
                    <div className={styles.lef_chat_con}>
                        <Image src="/images/img-weather.png" alt="weather" width={292} height={205.26}></Image>
                    </div>
                </>
            )
        } else if(msg.action == "MS004") {              // 식당
            // return(
            //     <>
            //         <div className={styles.lef_chat_con}>
            //             {msg.message}
            //         </div>
            //     </>
            // )
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
        } else if(msg.action == "MS006") {
            return (
                <div className={styles.lef_chat_con}>
                    {fashionMessage(msg)}
                </div>
            )
        } else {
            return(
                <>
                    <div className={styles.lef_chat_con}>
                        {msg.message}
                    </div>
                </>
            )
        }
    };

    // youtube action
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
    }

    // fashion action
    const fashionMessage = (msg: Message) => {
        return(
            msg.recommendation_image.map((item, index) => (
                <a className={`${styles.fashion_wrap} ${styles.mb15}`} key={`fashion-${index}`} target='_blank' href={item.product_url}>
                    <span className={styles.fashion_left}>
                        <img className={styles.fastion_image_container} src={item.image_url} alt="YouTube Thumbnail" width={116.8} height={64.34} />
                    </span>
                    <span className={styles.fashion_right}>
                        <div className={styles.fashion_brand}>{item.brand}</div>
                        <div className={styles.fashion_product}>{item.product}</div>
                        {
                            item.price_rate > 0 ? 
                            <div className={styles.fashion_price_container}><span className={styles.fashion_rate}>{Math.floor(item.price_rate)}%</span> <span className={styles.fashion_price}>{Math.floor(item.discount_price).toLocaleString("ko-KR")}</span></div> : 
                            <div className={styles.fashion_price_container}><span className={styles.fashion_price}>{Math.floor(item.price).toLocaleString("ko-KR")}</span></div>
                        }
                    </span>
                </a>
            ))
        )
    }

    const sendMessage = () => {
        if(isSend) {
            return (
                <button type="submit" onClick={handleSubmit}>
                    <Image src="/images/ico-send.svg" alt="send" width={50} height={40}/>
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
    
    // 값 전달
    const sendMessageToParent = (data: string) => {
        localStorage.setItem("modalData", JSON.stringify({ type: "OPEN_MODAL", data }));
    };

    // 메시지가 추가될 때 스크롤을 맨 아래로 이동 (채팅 스크롤 최하단 유지기능)
    const chatEndRef = useRef<HTMLDivElement | null>(null); // 마지막 메시지 참조
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }

        // 특정 드롭다운 값 선택 시 부모에게 메시지 전송
        sendMessageToParent(llm); 

    }, [Messages, typingMessage]); // messages 또는 typingMessage가 변경될 때 실행

    //
    //const openModal = useModalStore((state) => state.openModel);

    useEffect(() => {
        //setMessages([]);

        // setMessages([{
        //     message: initMessage,
        //     autherType: 0,
        //     action: 'MS001',
        //     urls: [],
        //     videos: []
        // }])

        if (randomKey === null) {
            setRandomKey(Math.floor(Math.random() * 1000000));
        }

    }, [searchParams, randomKey]); // searchParams가 변경될 때 실행

    // zustand 상태관리
    const openModal = useTogievelabsModalStore((state) => state.openTogievelabsModal);

    function getRandomElements<T>({ arr, count }: { arr: T[]; count: number; }): any {
        const shuffled = [...arr]; // 원본 배열을 복사하여 수정 방지
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // 요소 교환
        }
        return shuffled.slice(0, count); // 앞에서 count 개수만큼 추출
    }

    function getTopElements(arr: any[], count: number): any {
        const sortedProducts = arr.sort((a, b) => {
            if (b.reviews !== a.reviews) {
              return b.reviews - a.reviews; // 1. 리뷰 수 기준 내림차순
            }
            return b.price - a.price;       // 2. 리뷰 수가 같으면 금액 기준 내림차순
        });

        return sortedProducts.slice(0, count); // 배열의 첫 `count` 개 요소 반환
    }
      
    return(
        <>
            <header>
                <div className={styles.header_inner}>
                    <Image src="/images/togievelabs/icon-qurator-logo.svg" alt="logo" width={116} height={35}></Image>
                    <p className={styles.wrap_width}>
                    </p>
                    <Link href="/chatbot/togievelabs/mobile/i/language" className={styles.lan_btn} onClick={() => openModal(llm, agents)}>
                        <Image src="/images/togievelabs/ico-option.png" alt="dropdown" width={15} height={15}/> Options
                    </Link>
                </div>
            </header>
            <main>
                <div className={styles.main_inner}>
                    {Messages.map((msg, index) => (
                        msg.autherType === 0 ? (
                            <div className={styles.lef_chat} key={`ai-${index}`}>
                                <div className={styles.lef_chat_tit}>
                                    <Image src="/images/togievelabs/icon-chat.svg" alt="chat_logo" width={40} height={40} />
                                    <div className={styles.lef_chat_tit_txt}>
                                        <h2>Qurator</h2>
                                        <p>TOGIEVE Labs</p>
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
                        <p>Chat AI 이용중</p>
                    </div>
                    <div className={styles.chat_con}>
                        <input type="text" placeholder={placeholderMessage} value={question} onChange={(e) => setQuestion(e.target.value)} onKeyDown={handleKeyDown}/>
                        {sendMessage()}
                    </div>
                    {/* <button type="submit" onClick={placeTestButton}>
                        <Image src="/images/ico-send.svg" alt="send" width={50} height={40}/>
                    </button> */}
                </div>
            </footer>
        </>
    )
}