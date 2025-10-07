"use client";import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { useState } from "react";

export default function Home() {
  const [q, setQ] = useState("");
  const [a, setA] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function ask() {
    setLoading(true);
    setError(null);
    setA(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Błąd zapytania.");
      setA(data.answer);
    } catch (e: any) {
      setError(e.message || "Coś poszło nie tak.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 16 }}>
      <h1 style={{ marginBottom: 8 }}>lexumi — asystent prawny (MVP)</h1>
      <p style={{ opacity: 0.8, marginBottom: 16 }}>
        Zadaj pytanie prawne. Odpowiedź będzie zwięzła i — jeśli możliwe — z podstawą prawną.
      </p>
      <textarea
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Np. Jak wypowiedzieć umowę najmu, gdy…"
        rows={6}
        style={{ width: "100%", padding: 12 }}
      />
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button onClick={ask} disabled={loading || !q.trim()}>
          {loading ? "Myślę…" : "Wyślij"}
        </button>
        <button onClick={() => { setQ(""); setA(null); setError(null); }}>
          Wyczyść
        </button>
      </div>

      {error && <div style={{ marginTop: 12, color: "crimson" }}>{error}</div>}

      {a && (
        <section style={{ marginTop: 16, background: "#f6f6f6", padding: 12, borderRadius: 8, whiteSpace: "pre-wrap" }}>
          {a}
        </section>
      )}
    </main>
  );
}
