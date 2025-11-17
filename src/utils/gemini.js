import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

export async function checkJapanese(indo, japan) {
  // USE THIS MODEL — 100% VALID
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
Periksa apakah kalimat Jepang benar sesuai arti bahasa Indonesia.

Kalimat Indonesia: ${indo}
Kalimat Jepang: ${japan}

Analisis:
1. apakah makna sudah cocok
2. partikel benar atau tidak
3. grammar benar atau tidak
4. kalau salah, berikan koreksi
5. kalau benar, berikan versi natural

Balas dalam format JSON:
{
  "status": "",
  "penjelasan": "",
  "koreksi": "",
  "natural": ""
}
  `;

  const result = await model.generateContent(prompt);

  const clean = result.response.text().replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}
