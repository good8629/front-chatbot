import type { Metadata } from "next";
import "./globals.css";
import "./common.css"

export const metadata: Metadata = {
    title: "ChatAI",
    description: "영산대학교 챗봇입니다.",
    icons: {
        icon: "/favicon.ico"
    }
};

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
