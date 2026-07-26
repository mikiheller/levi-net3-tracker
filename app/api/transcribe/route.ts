export const dynamic = "force-dynamic";

// Transcribes a recorded audio clip with OpenAI Whisper.
export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Dictation isn't set up yet (missing OPENAI_API_KEY)." },
      { status: 503 }
    );
  }

  const form = await req.formData();
  const audio = form.get("audio");
  if (!(audio instanceof File) || audio.size === 0) {
    return Response.json({ error: "No audio received." }, { status: 400 });
  }

  const upstream = new FormData();
  upstream.append("file", audio, audio.name || "note.webm");
  upstream.append("model", "whisper-1");

  const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: upstream,
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Whisper transcription failed:", res.status, detail);
    return Response.json(
      { error: "Transcription failed — please try again or type instead." },
      { status: 502 }
    );
  }

  const data = (await res.json()) as { text?: string };
  return Response.json({ text: data.text ?? "" });
}
