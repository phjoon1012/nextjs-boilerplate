'use client';
import { useState } from "react";

export default function ChatbotPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "system", content: "Hello! How can I help you today?" },
  ]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      const data = await res.json();
      setMessages((msgs) => [...msgs, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { role: "assistant", content: "Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Chatbot</h1>
      <div className="w-full max-w-md border rounded p-4 bg-white shadow">
        <div className="h-64 overflow-y-auto mb-4 bg-gray-50 p-2 rounded">
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === "user" ? "text-right" : "text-left"}>
              <span className={msg.role === "user" ? "text-blue-600" : "text-green-700"}>
                <b>{msg.role === "user" ? "You" : msg.role === "assistant" ? "Bot" : "System"}:</b> {msg.content}
              </span>
            </div>
          ))}
          {loading && <div className="text-gray-400">Bot is typing...</div>}
        </div>
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            className="flex-1 border rounded px-2 py-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded" disabled={loading}>
            Send
          </button>
        </form>
      </div>
    </main>
  );
} 