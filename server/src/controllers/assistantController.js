const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const chatWithAssistant = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0.4,
        max_tokens: 2048,
        messages: [
          {
            role: "system",
            content: `
You are PRLens AI.

You are an expert senior software engineer,
DevOps engineer, security engineer,
system architect and code reviewer.

Provide:
- Pull Request Reviews
- Architecture Reviews
- Security Analysis
- Performance Optimization
- Technical Debt Analysis
- Engineering Recommendations

Return clean markdown responses.
`,
          },
          {
            role: "user",
            content: message,
          },
        ],
      });

    return res.status(200).json({
      success: true,
      reply:
        completion.choices?.[0]?.message
          ?.content || "No response generated",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI response",
    });
  }
};

module.exports = {
  chatWithAssistant,
};