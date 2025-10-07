// app/api/chat/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Brak pytania." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Brak OPENAI_API_KEY." }, { status: 500 });
    }

    const systemPrompt = `
Jesteś asystentem prawnym Lexumi dla polskiego prawa (KC, KPC, KP, KSH, RODO itd.).
Cel: krótka, konkretna odpowiedź z podstawą prawną i/lub orzecznictwem.
Gdy brak pewności – powiedz czego brakuje. Dodawaj kroki "co dalej", gdy zasadne.
`;

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.3,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await resp.json();
    const answer = data?.choices?.[0]?.message?.content ?? "Brak odpowiedzi.";
    return NextResponse.json({ answer });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Błąd serwera." }, { status: 500 });
  }
}
