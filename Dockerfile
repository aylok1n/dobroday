# Dockerfile для приложения "Добродень" с Next.js и Ollama (gemma3)

# 1. Базовый образ для Node.js и Ollama
FROM ollama/ollama:latest AS ollama

# 2. Базовый образ для Next.js
FROM node:20-bullseye AS app

# Копируем ollama из предыдущего слоя
COPY --from=ollama /usr/bin/ollama /usr/bin/ollama
COPY --from=ollama /usr/share/ollama /usr/share/ollama

# Устанавливаем Ollama как сервис
RUN useradd -m ollama && mkdir -p /root/.ollama && chown -R ollama:ollama /root/.ollama

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --legacy-peer-deps

# Копируем остальные файлы приложения
COPY . .

# Скачиваем модель gemma3
RUN ollama pull gemma3

# Собираем Next.js приложение
RUN npm run build

# Экспонируем порты: 3000 (Next.js) и 11434 (Ollama)
EXPOSE 3000 11434

# Запускаем Ollama в фоне и Next.js в продакшн-режиме
CMD ollama serve & npm start
