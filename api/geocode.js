function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: "Missing query" });
    }

    const key = process.env.OPENWEATHER_KEY;
    if (!key) return res.status(500).json({ error: "Missing OPENWEATHER_KEY" });

    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      q
    )}&limit=5&appid=${key}`;

    const r = await fetch(url);
    const data = await r.json();

    return res.status(r.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}
