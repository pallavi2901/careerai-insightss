import axios from "axios";

async function testGroq() {
  const key = import.meta.env.VITE_GROQ_API_KEY;

  console.log("Testing Groq key:", key ? "✅ Found" : "❌ Missing");

  if (!key) {
    console.error("❌ No Groq API key found. Please add it to your .env file as VITE_GROQ_API_KEY");
    return;
  }

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: "Say hello from Groq!" }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
      }
    );

    console.log("✅ Groq API response:", response.data.choices[0].message.content);
  } catch (error: any) {
    console.error(
      "❌ Groq API test failed:",
      error.response?.status,
      error.response?.data || error.message
    );
  }
}

testGroq();
