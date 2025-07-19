import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Добродень",
  description: "Ежедневные задания для хорошего настроения и эмоционального самочувствия.",
  keywords: [
    "добродень", "настроение", "эмоции", "задания дня", "мотивация", "психология", "wellbeing", "ежедневник", "позитив", "лайфхаки"
  ],
  authors: [{ name: "Добродень" }],
  openGraph: {
    title: "Добродень — задания для хорошего настроения",
    description: "Ежедневные простые задания для улучшения эмоционального состояния.",
    url: "https://dobroday.ru/",
    siteName: "Добродень",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/favicon.ico",
        width: 64,
        height: 64,
        alt: "Добродень"
      }
    ]
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f8fafc" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
