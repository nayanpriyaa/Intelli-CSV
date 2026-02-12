const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

router.post("/ask", async (req, res) => {
  try {
    const { question, csvPreview } = req.body;

    if (!question) {
      return res.json({ answer: "Ask something first." });
    }

    const prompt = `
You are a professional data analyst AI inside a CSV dashboard web app.

Dataset preview:
${JSON.stringify(csvPreview, null, 2)}

User question:
${question}

Give a helpful, short, intelligent answer.
If user asks rows/columns/summary/trends — analyze properly.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AI gave no response.";

    res.json({ answer: reply });
  } catch (err) {
    console.error("Gemini error:", err);
    res.json({ answer: "Gemini failed. Check server console." });
  }
});

module.exports = router;
