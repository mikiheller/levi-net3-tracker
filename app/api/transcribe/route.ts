import { NextResponse } from "next/server";

// Transcribes a short voice note with OpenAI Whisper.
// Requires OPENAI_API_KEY (in .env.local locally, or Vercel env settings).
export async function POST(req: Request) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Dictation isn't set up yet — ask Miki to add the OpenAI key." },
      { status: 503 }
    );
  }

  const form = await req.formData();
  const audio = form.get("audio");
  if (!(audio instanceof File) || audio.size === 0) {
    return NextResponse.json({ error: "No audio received." }, { status: 400 });
  }

  const upstream = new FormData();
  upstream.append("file", audio);
  upstream.append("model", "whisper-1");
  upstream.append("language", "en");

  const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}` },
    body: upstream,
  });

  if (!res.ok) {
    console.error("Whisper error:", res.status, await res.text());
    return NextResponse.json(
      { error: "Transcription failed — please try again or type instead." },
      { status: 502 }
    );
  }

  const data = (await res.json()) as { text?: string };
  return NextResponse.json({ text: data.text ?? "" });
}
