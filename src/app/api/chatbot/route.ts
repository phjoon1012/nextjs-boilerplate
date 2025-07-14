import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY || "sk-..."; // Replace with your actual key or use env

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
        max_tokens: 100,
      }),
    });
    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content || "No response from OpenAI.";
    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ reply: "Error contacting OpenAI API." }, { status: 500 });
  }
} 