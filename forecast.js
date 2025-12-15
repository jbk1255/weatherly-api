export default async function handler(req, res) {
  const { q, lat, lon } = req.query;
  if (!q && (!lat || !lon)) return res.status(400).json({ error: "Missing params" });

  const key = process.env.OPENWEATHER_KEY;

  const url = q
    ? `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(q)}&appid=${key}`
    : `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`;

  const r = await fetch(url);
  const data = await r.json();
  return res.status(r.status).json(data);
}
