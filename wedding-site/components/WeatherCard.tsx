"use client";
import { useEffect, useState } from "react";
import {
  CloudSun,
  CloudRain,
  AlertTriangle,
  CalendarDays,
  ThermometerSun, // Used for max temp
  ThermometerSnowflake, // Used for min temp
} from "lucide-react";

type Forecast = {
  date: string;
  tempMax: number;
  tempMin: number;
  precipitation: number;
  weatherCode: number;
};

type Props = {
  eventDate: Date;
};

export default function WeatherCard({ eventDate }: Props) {
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const LAT = 32.44791; // Using the latitude from Hero.tsx for consistency
  const LON = -117.07053; // Using the longitude from Hero.tsx for consistency

  useEffect(() => {
    const fetchForecast = async () => {
      // Check if eventDate is more than 16 days in the future (Open-Meteo's limit)
      const today = new Date();
      const diffTime = Math.abs(eventDate.getTime() - today.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 16) {
        setError(
          "El pronóstico del tiempo solo está disponible para los próximos 16 días. Por favor, revisa más cerca de la fecha de la boda."
        );
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
            `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode` +
            `&forecast_days=16&timezone=auto&temperature_unit=celsius` // Explicitly request Celsius
        );
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();

        const target = eventDate.toISOString().split("T")[0]; // e.g. '2025-07-05'
        const idx = data.daily.time.findIndex((d: string) => d === target);

        if (idx === -1) {
          setError(
            "Pronóstico no disponible para esta fecha. Intenta de nuevo más cerca del día del evento."
          );
        } else {
          setForecast({
            date: data.daily.time[idx],
            tempMax: data.daily.temperature_2m_max[idx],
            tempMin: data.daily.temperature_2m_min[idx],
            precipitation: data.daily.precipitation_sum[idx],
            weatherCode: data.daily.weathercode[idx],
          });
        }
      } catch (e) {
        // FIX 1: Type the error object more specifically
        if (e instanceof Error) {
          setError("Error al cargar el pronóstico: " + e.message);
        } else {
          setError("Error desconocido al cargar el pronóstico.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [eventDate, LAT, LON]); // Add LAT, LON to dependency array for best practice

  // FIX 2: This function will now be used
  const getIconForWeatherCode = (code: number) => {
    // Open-Meteo Weather Codes: https://www.open-meteo.com/en/docs/api-docs
    if ([0].includes(code)) return <CloudSun size={28} />; // Clear sky
    if ([1, 2, 3].includes(code)) return <CloudSun size={28} />; // Mainly clear, partly cloudy, overcast
    if ([45, 48].includes(code)) return <AlertTriangle size={28} />; // Fog and depositing fog
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return <CloudRain size={28} />; // Drizzle, Rain
    if ([71, 73, 75, 77, 85, 86].includes(code)) return <ThermometerSnowflake size={28} />; // Snow fall, Snow grains
    if ([95, 96, 99].includes(code)) return <CloudRain size={28} />; // Thunderstorm, with hail
    return <CloudSun size={28} />; // Default to sun if code is unexpected
  };

  // Helper to format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-MX", options); // Format for Mexico/Spanish
  };

  if (loading)
    return <p className="text-sm text-gray-500">Cargando pronóstico...</p>;
  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (!forecast) return null; // Should not happen if error is handled

  return (
    <div className="text-center space-y-3">
      {/* Date */}
      <div className="flex items-center justify-center gap-2 text-olive-900 dark:text-beige-100 text-xl font-serif">
        <CalendarDays className="w-5 h-5 stroke-olive-600 dark:stroke-beige-200" />
        <span>
          Pronóstico para <strong>{formatDate(forecast.date)}</strong>
        </span>
      </div>

      {/* Temperature Range */}
      <div className="flex items-center justify-center gap-4 text-2xl font-semibold text-rose-700 dark:text-pink-300">
        <div className="flex items-center gap-1">
          <ThermometerSnowflake className="w-5 h-5 stroke-blue-500" />
          {/* FIX 3: Use forecast data */}
          <span>{forecast.tempMin.toFixed(1)}°C</span>
        </div>
        <span className="text-gray-400 dark:text-gray-600">–</span>
        <div className="flex items-center gap-1">
          <ThermometerSun className="w-5 h-5 stroke-orange-500" />
          {/* FIX 3: Use forecast data */}
          <span>{forecast.tempMax.toFixed(1)}°C</span>
        </div>
      </div>

      {/* Current Weather Icon & Description (Optional, based on weatherCode) */}
      <div className="flex items-center justify-center gap-2 text-base text-olive-800 dark:text-beige-300">
        {getIconForWeatherCode(forecast.weatherCode)} {/* FIX 2: Use the icon */}
        <span>Precipitación:</span>
        {/* FIX 3: Use forecast data */}
        <span className="font-medium">{forecast.precipitation.toFixed(1)} mm</span>
      </div>
    </div>
  );
}