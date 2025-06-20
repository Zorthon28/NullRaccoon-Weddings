"use client";
import { useEffect, useState } from "react";
import {
  CloudSun,
  CloudRain,
  AlertTriangle,
  CalendarDays,
  ThermometerSun,
  ThermometerSnowflake,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";

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

  const LAT = 32.44791;
  const LON = -117.07053;

  useEffect(() => {
    const fetchForecast = async () => {
      const today = new Date();
      const diffTime = Math.abs(eventDate.getTime() - today.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 16) {
        setError(
          "🌦️ El pronóstico solo está disponible para los próximos 16 días."
        );
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&forecast_days=16&timezone=auto&temperature_unit=celsius`
        );
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();

        const target = eventDate.toISOString().split("T")[0];
        const idx = data.daily.time.findIndex((d: string) => d === target);

        if (idx === -1) {
          setError("No hay pronóstico para esa fecha aún.");
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
        if (e instanceof Error) {
          setError("Error al cargar el pronóstico: " + e.message);
        } else {
          setError("Error desconocido.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [LON, eventDate]);

  const getIconForWeatherCode = (code: number) => {
    if ([0, 1, 2].includes(code))
      return <CloudSun size={28} className="text-yellow-500" />;
    if ([3, 45, 48].includes(code))
      return <AlertTriangle size={28} className="text-orange-500" />;
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code))
      return <CloudRain size={28} className="text-blue-500" />;
    if ([71, 73, 75, 77, 85, 86].includes(code))
      return <ThermometerSnowflake size={28} className="text-cyan-500" />;
    if ([95, 96, 99].includes(code))
      return <CloudRain size={28} className="text-purple-500" />;
    return <CloudSun size={28} className="text-gray-500" />;
  };

  const getLabelForWeatherCode = (code: number) => {
    if ([0].includes(code)) return "Cielo despejado";
    if ([1, 2].includes(code)) return "Parcialmente nublado";
    if ([3].includes(code)) return "Nublado";
    if ([45, 48].includes(code)) return "Niebla";
    if ([51, 53, 55].includes(code)) return "Llovizna";
    if ([61, 63, 65].includes(code)) return "Lluvia moderada";
    if ([80, 81, 82].includes(code)) return "Lluvia intensa";
    if ([71, 73, 75, 77].includes(code)) return "Nieve ligera";
    if ([85, 86].includes(code)) return "Nieve fuerte";
    if ([95, 96, 99].includes(code)) return "Tormenta eléctrica";
    return "Condición desconocida";
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-MX", options);
  };

  if (loading)
    return (
      <div className="text-center py-4 animate-pulse">
        <Loader2 className="mx-auto h-5 w-5 animate-spin text-olive-600" />
        <p className="text-sm text-gray-500 mt-2">Cargando pronóstico...</p>
      </div>
    );

  if (error)
    return (
      <p className="text-center text-sm text-red-500 font-serif mt-2">
        {error}
      </p>
    );

  if (!forecast) return null;

  return (
    <motion.div
      className="text-center space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Date */}
      <div className="flex items-center justify-center gap-2 text-olive-900 dark:text-beige-100 text-xl font-serif">
        <CalendarDays className="w-5 h-5 stroke-olive-600 dark:stroke-beige-200" />
        <span>{`Pronóstico para el ${formatDate(forecast.date)}`}</span>
      </div>

      {/* Icon & Description */}
      <div className="flex items-center justify-center gap-2 text-base text-olive-800 dark:text-beige-300">
        <span title={`Código: ${forecast.weatherCode}`}>
          {getIconForWeatherCode(forecast.weatherCode)}
        </span>
        <span>{getLabelForWeatherCode(forecast.weatherCode)}</span>
        {forecast.precipitation > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-base text-olive-800 dark:text-beige-300">
            {getIconForWeatherCode(forecast.weatherCode)}

            <span className="font-medium">
              {forecast.precipitation.toFixed(1)} mm –{" "}
              {forecast.precipitation < 2
                ? "Baja probabilidad de lluvia 🌤️"
                : forecast.precipitation < 5
                ? "Probabilidad moderada de lluvia 🌦️"
                : forecast.precipitation < 10
                ? "Alta probabilidad de lluvia 🌧️"
                : "Muy alta probabilidad de lluvia ⛈️"}
            </span>
          </div>
        )}
      </div>

      {/* Temperature Range */}
      <div className="flex items-center justify-center gap-4 text-2xl font-semibold text-rose-700 dark:text-pink-300">
        <div className="flex items-center gap-1">
          <ThermometerSnowflake className="w-5 h-5 stroke-blue-500" />
          <span>{forecast.tempMin.toFixed(1)}°C</span>
        </div>
        <span className="text-gray-400 dark:text-gray-600">–</span>
        <div className="flex items-center gap-1">
          <ThermometerSun className="w-5 h-5 stroke-orange-500" />
          <span>{forecast.tempMax.toFixed(1)}°C</span>
        </div>
      </div>
    </motion.div>
  );
}
