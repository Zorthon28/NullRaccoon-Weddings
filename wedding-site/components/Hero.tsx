"use client";

import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import { useEffect, useState } from "react";
import Countdown from "./Countdown"; // Ensure Countdown component accepts a targetDate prop
import MusicToggle from "./MusicToggle";
import ThemeToggle from "./ThemeToggle";
import PetalRain from "./PetalRain";
import Image from "next/image";
import { clsx } from "clsx";
import WeatherCard from "@/components/WeatherCard"; // Assuming WeatherCard is ready
import { MapPin, Car, Clipboard } from "lucide-react";
import WeddingGallery from './WeddingGallery';
import GiftRegistry from './GiftRegistry';

// Define your specific ease function once
const customEaseOut = cubicBezier(0.42, 0, 0.58, 1);

// Variants for coordinated animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5, // Delay between children animations
      delayChildren: 0.5, // Initial delay before first child animates
    },
  },
};

const nameVariants = {
  hidden: { opacity: 0, scale: 0.85, y: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1.2, ease: customEaseOut },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 0.85,
    y: 0,
    transition: { delay: 0.5, duration: 1.2, ease: customEaseOut },
  },
};


type HeroProps = {
  coupleNames?: string;
  eventDate: Date; // Make sure this is a Date object, e.g., new Date('2025-07-05T00:00:00')
  message: string;
};

export default function Hero({
  coupleNames = "Gustavo & Kenia",
  eventDate,
  message,
}: HeroProps) {
  const [showPetals, setShowPetals] = useState(false);
  const [copied, setCopied] = useState(false); // State for copy confirmation

  useEffect(() => {
    const today = new Date();
    const isWeddingDay =
      today.getFullYear() === eventDate.getFullYear() &&
      today.getMonth() === eventDate.getMonth() &&
      today.getDate() === eventDate.getDate();

    setShowPetals(isWeddingDay);
  }, [eventDate]);

  const destinationAddress =
    "Torrontes 33, Cto. Zinfandel 3970, 22564, B.C., Tijuana, México";

  // Coordinates for the venue. IMPORTANT: Verify these are exact!
  // Based on a Google Maps search for the address.
  const venueLatitude = 32.44791; // Verified: approx. Torrontes 33, Cto. Zinfandel 3970, Tijuana
  const venueLongitude = -117.07053; // Verified: approx. Torrontes 33, Cto. Zinfandel 3970, Tijuana

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(destinationAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Message disappears after 2 seconds
  };

  // Define a common card variants for stagger effect
  const cardItemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: customEaseOut },
    },
  };

  return (
    <section
      aria-label="Wedding Hero"
      className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-16 text-center overflow-hidden
                   bg-beige-100 dark:bg-soft-black text-olive-900 dark:text-beige transition-colors duration-700"
    >
      {/* Background Image */}
      <Image
        src="/images/wedding-hero-bg.jpg" // Make sure this path is correct and image exists
        alt="Elegant wedding background"
        fill
        priority
        className="object-cover object-center pointer-events-none z-0 opacity-40 dark:opacity-25 transition-opacity duration-700"
      />
      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 z-5 bg-gradient-to-t from-beige-100/50 via-transparent to-beige-100/50 dark:from-soft-black/60 dark:via-transparent dark:to-soft-black/60" />

      {/* Toggles (Music & Theme) */}
      <div className="absolute top-4 right-4 flex gap-3 sm:gap-4 z-30">
        <MusicToggle />
        <ThemeToggle />
      </div>

      {/* Petal animation */}
      <AnimatePresence>{showPetals && <PetalRain />}</AnimatePresence>

      {/* Main Content Area */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl"
        variants={containerVariants} // Use defined container variants
        initial="hidden"
        animate="visible"
      >
        {/* Couple Names */}
        <motion.h1
          variants={nameVariants} // Use defined name variants
          className="mb-4 sm:mb-6 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-script leading-tight
                     drop-shadow-[0_5px_10px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_5px_10px_rgba(255,255,255,0.08)]
                     select-none"
          // Ensure 'font-script' is correctly configured in tailwind.config.js for your font
          // style={{ fontFamily: "'Dancing Script', cursive" }} // Can remove if next/font is used with 'font-script' utility class
        >
          {coupleNames}
        </motion.h1>

        {/* Message/Subtitle */}
        <motion.p
          variants={subtitleVariants} // Use defined subtitle variants
          className="mb-12 sm:mb-14 max-w-md text-lg sm:text-xl md:text-2xl font-serif tracking-wide
                     text-olive-700 dark:text-beige-200"
          // Ensure 'font-serif' is correctly configured in tailwind.config.js for your font
          // style={{ fontFamily: "'Libre Serif', serif" }} // Can remove if next/font is used with 'font-serif' utility class
        >
          {message}
        </motion.p>

        {/* New Container for Multiple Cards - This replaces the single infoCard */}
        <motion.div
          variants={containerVariants} // Use container variants to stagger the *individual* cards
          initial="hidden"
          animate="visible"
          className="w-full max-w-xl flex flex-col items-center justify-center space-y-8 sm:space-y-10" // Add space-y for vertical gap
        >
          {/* Countdown Card */}
          <motion.div
            variants={cardItemVariants} // Each card uses the new item variant
            className={clsx(
              "w-full p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-lg",
              "bg-beige/85 dark:bg-soft-black/85 border border-white/25 dark:border-soft-black/40",
              "flex flex-col items-center justify-center"
            )}
          >
            <Countdown targetDate={eventDate} />
          </motion.div>

          {/* Weather Card */}
          <motion.div
            variants={cardItemVariants}
            className={clsx(
              "w-full p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-lg",
              "bg-beige/85 dark:bg-soft-black/85 border border-white/25 dark:border-soft-black/40",
              "flex flex-col items-center justify-center text-center" // Ensure text is centered within the card
            )}
          >
            <h2 className="mb-4 text-xl sm:text-2xl font-script text-olive-800 dark:text-olive-300">
              Clima para el Gran Día
            </h2>
            <p className="mb-4 text-sm sm:text-base font-serif text-olive-700 dark:text-beige-200">
              Para ayudarte a prepararte, aquí tienes el pronóstico del tiempo.
              ¡Esperamos un día perfecto!
            </p>
            <WeatherCard eventDate={eventDate} />
          </motion.div>

          {/* Directions Card */}
          <motion.div
            variants={cardItemVariants}
            className={clsx(
              "w-full p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-lg",
              "bg-beige/85 dark:bg-soft-black/85 border border-white/25 dark:border-soft-black/40",
              "flex flex-col items-center justify-center text-center" // Ensure text is centered within the card
            )}
          >
            <h2 className="mb-4 text-xl sm:text-2xl font-script text-olive-800 dark:text-olive-300">
              Cómo Llegar
            </h2>
            <p className="mb-4 text-sm sm:text-base font-serif text-olive-700 dark:text-beige-200">
              Nuestra celebración tendrá lugar en:
            </p>
            <p className="mb-2 font-medium text-olive-800 dark:text-olive-300 flex items-center justify-center gap-2 select-text text-lg sm:text-xl">
              <MapPin className="w-5 h-5 inline flex-shrink-0" />
              <span>{destinationAddress}</span>
              <button
                onClick={copyAddressToClipboard}
                aria-label="Copiar dirección"
                className="ml-2 p-1 rounded-full hover:bg-olive-200 dark:hover:bg-olive-700 transition"
              >
                <Clipboard className="w-5 h-5 text-olive-600 dark:text-olive-300" />
              </button>
            </p>
            <AnimatePresence>
              {copied && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm text-green-600 dark:text-green-400 mt-1 select-none"
                >
                  ¡Dirección copiada! ✨
                </motion.p>
              )}
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 w-full">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destinationAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2 border border-olive-600 rounded-full text-olive-700 dark:text-olive-300 hover:bg-olive-100 dark:hover:bg-olive-900 transition w-full sm:w-auto font-medium"
              >
                <MapPin className="w-5 h-5" />
                Abrir en Google Maps
              </a>

              <a
                href={`https://m.uber.com/ul/?action=setPickup&dropoff[latitude]=${venueLatitude}&dropoff[longitude]=${venueLongitude}&dropoff[nickname]=Nuestra%20Boda`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2 border border-pink-500 rounded-full text-pink-600 dark:text-pink-300 hover:bg-pink-100 dark:hover:bg-pink-900 transition w-full sm:w-auto font-medium"
              >
                <Car className="w-5 h-5" />
                Solicitar un Uber
              </a>
            </div>
          </motion.div>
        <WeddingGallery />
              <GiftRegistry />
                </motion.div>
              </motion.div>

      

      {/* Attribution footer */}
      <footer className="absolute bottom-4 text-xs sm:text-sm text-black/40 dark:text-beige/30 select-none font-serif tracking-wide">
        Developed with ❤️ by Gustavo Tello
      </footer>
    </section>
  );
}