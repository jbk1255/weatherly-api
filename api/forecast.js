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
    const { q, lat, lon } = req.query;

    if (!q && (!lat || !lon)) {
      return res.status(400).json({ error: "Missing params" });
    }

    const key = process.env.OPENWEATHER_KEY;
    if (!key) return res.status(500).json({ error: "Missing OPENWEATHER_KEY" });

    const url = q
      ? `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
          q
        )}&appid=${key}`
      : `https://api.openweathermap.org/data/2.5/forecast?lat=${encodeURIComponent(
          lat
        )}&lon=${encodeURIComponent(lon)}&appid=${key}`;

    const r = await fetch(url);
    const data = await r.json();

    return res.status(r.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}
