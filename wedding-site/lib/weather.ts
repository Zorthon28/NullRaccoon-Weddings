// lib/weather.ts
export async function getWeatherByCoords(lat: number, lon: number) {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  if (!apiKey) throw new Error("Missing OpenWeather API key");

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`
  );

  if (!res.ok) {
    throw new Error(`Weather API error: ${res.statusText}`);
  }

  return res.json();
}
