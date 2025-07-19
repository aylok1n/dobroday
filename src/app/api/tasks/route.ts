import { NextRequest, NextResponse } from "next/server";

// Импортируем node-fetch для запросов к локальной LLM
import fetch from "node-fetch";

// Кэш заданий (в памяти)
let cachedTasks: { date: string; tasks: string } | null = null;

// Функция для генерации заданий через локальную LLM (Ollama)
async function generateTasks(): Promise<string> {
    // Пример prompt для LLM
    const prompt = `Придумай 5 простых заданий для поднятия настроения и улучшения эмоционального самочувствия. Примеры: сходить в кофейню, сделать комплимент прохожему, нарисовать что-то, позвонить другу, прогуляться в парке. Ответ верни в виде нумерованного списка.`;

    // Запрос к Ollama (замени порт и модель при необходимости)
    const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: "gemma3",
            prompt,
            stream: false,
        }),
    });

    const data = await response.json() as { response: string };

    return data.response;
}

export async function GET(req: NextRequest) {
    const today = new Date().toISOString().slice(0, 10);
    if (!cachedTasks || cachedTasks.date !== today) {
        const tasks = await generateTasks();
        cachedTasks = { date: today, tasks };
    }
    return NextResponse.json({ tasks: cachedTasks.tasks });
}
