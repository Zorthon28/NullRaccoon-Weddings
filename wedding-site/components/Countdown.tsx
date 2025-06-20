"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

// Helper function to calculate time difference
const calculateTimeLeft = (targetDate: Date) => {
  const now = new Date().getTime();
  const difference = targetDate.getTime() - now;

  if (difference <= 0) {
    return null;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

export default function Countdown({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl text-center font-script text-pink-600 dark:text-pink-300"
      >
        ¡Hoy es el gran día! 💍
      </motion.div>
    );
  }

  const timeUnits = [
    { label: "Días", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl sm:text-2xl font-script text-olive-800 dark:text-olive-300 mb-4">
        ¡La cuenta regresiva ha comenzado!
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className={clsx(
              "flex flex-col items-center justify-center",
              "bg-white/70 dark:bg-olive-800/60 backdrop-blur-md rounded-xl shadow-md",
              "w-24 h-24 sm:w-28 sm:h-28 border border-white/20 dark:border-olive-700"
            )}
          >
            <span className="text-2xl sm:text-3xl font-bold text-olive-900 dark:text-beige">
              {unit.value.toString().padStart(2, "0")}
            </span>
            <span className="text-xs sm:text-sm font-serif text-olive-700 dark:text-beige-200">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
