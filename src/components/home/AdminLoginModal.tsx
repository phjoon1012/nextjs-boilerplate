"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLoginModal({ onClose, onLogin }: { onClose: () => void, onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError("Invalid credentials");
    else {
      onLogin();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form onSubmit={handleLogin} className="bg-white rounded-lg p-8 shadow-lg flex flex-col gap-4 min-w-[320px]">
        <h2 className="text-lg font-bold">Admin Login</h2>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="flex gap-2">
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Login</button>
          <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
        </div>
      </form>
    </div>
  );
} 