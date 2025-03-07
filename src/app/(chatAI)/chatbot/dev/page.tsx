import Image from 'next/image';
import styles from '@/app/(chatAI)/_component/talk.module.css';

export default function Home() {
    return(
        <div className={styles.pc_body}>
            <div className={styles.pc_container}>
                <div className={styles.pc_left}>
                </div>
                <div className={styles.pc_right}>
                    <iframe src="/" width="393" height="700" className={styles.pc_background}></iframe>
                </div>
            </div>
        </div>
    )
}