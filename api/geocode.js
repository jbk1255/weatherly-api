export default async function handler(req, res) {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: "Missing query" });
  }

  const key = process.env.OPENWEATHER_KEY;

  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    q
  )}&limit=5&appid=${key}`;

  const r = await fetch(url);
  const data = await r.json();

  res.status(r.status).json(data);
}
