const express = require("express");
const router = express.Router();

router.post("/ask", async (req, res) => {
  try {
    const { message, csvData } = req.body;

    console.log("User question:", message);
    console.log("CSV rows:", csvData?.length);

    if (!message) {
      return res.json({ reply: "Ask something about your data." });
    }

    const prompt = `
You are a professional data analyst AI.

Dataset preview:
${JSON.stringify(csvData?.slice(0, 20), null, 2)}

User question:
${message}

Give clear insights about the dataset.
`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",


        messages: [
          {
            role: "system",
            content: "You are a helpful data analyst AI.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await response.json();
    console.log("🔥 GROQ RAW:", JSON.stringify(data, null, 2));

    const reply =
      data.choices?.[0]?.message?.content ||
      "No response from AI";

    res.json({ reply });
  } catch (err) {
    console.error("Groq error:", err);
    res.status(500).json({ reply: "AI server error" });
  }
});

module.exports = router;
