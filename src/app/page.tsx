"use client";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

function TaskList() {
  const [markdown, setMarkdown] = useState<string>("");

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        setMarkdown(String(data.tasks));
      });
  }, []);

  if (!markdown) return <div style={{textAlign: 'center', marginTop: '3rem', color: '#888'}}>Загружаем задания...</div>;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '60vh',
        padding: '2rem 0',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '1.25rem',
          boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)',
          padding: '2.5rem 2rem 2rem 2rem',
          maxWidth: 480,
          width: '100%',
          animation: 'fadeIn 0.7s cubic-bezier(.4,0,.2,1)',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            fontWeight: 700,
            fontSize: '1.7rem',
            marginBottom: '1.5rem',
            letterSpacing: '0.01em',
            color: '#2d3748',
            fontFamily: 'Fira Sans, Arial, sans-serif',
          }}
        >
          Задания дня для хорошего настроения
        </h2>
        <div
          style={{
            fontFamily: 'Fira Sans, Arial, sans-serif',
            fontSize: '1.15rem',
            lineHeight: 1.7,
            color: '#374151',
            marginBottom: '0.5rem',
          }}
        >
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  return (
    <div >
      <main >
        <TaskList />
      </main>
    </div>
  );
}
