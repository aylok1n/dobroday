import fetch from "node-fetch";
import fs from "fs";

async function main() {
  const prompt = `Придумай 5 простых заданий для поднятия настроения и улучшения эмоционального самочувствия. Примеры: сходить в кофейню, сделать комплимент прохожему, нарисовать что-то, позвонить другу, прогуляться в парке. Ответ верни в виде markdown-нумерованного списка.`;

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gemma3",
      prompt,
      stream: false,
    }),
  });
  const data = await response.json();
  const text = data.response;

  
  fs.writeFileSync("public/tasks.md", text, "utf-8");
  console.log("Tasks saved to public/tasks.md");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
