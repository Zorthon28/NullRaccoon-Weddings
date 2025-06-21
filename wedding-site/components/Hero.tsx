"use client";

import {
  motion,
  AnimatePresence,
  cubicBezier,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import Countdown from "./Countdown";
import MusicToggle from "./MusicToggle";
import PetalRain from "./PetalRain";
import Image from "next/image";
import { clsx } from "clsx";
import WeatherCard from "@/components/WeatherCard";
import { MapPin, Car, Clipboard, Calendar, ChevronDown } from "lucide-react"; // Import ChevronDown for the icon
import WeddingGallery from "./WeddingGallery";
import GiftRegistry from "./GiftRegistry";
import { toast } from "sonner"; // Make sure Toaster is rendered in your layout.tsx

// Define your specific ease function once
const customEaseOut = cubicBezier(0.42, 0, 0.58, 1);

// Variants for other content (cards, gallery, etc.) to appear after names animate
const contentContainerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15, // Delay between children animations
      delayChildren: 0.8, // Initial delay before the first card animates in
      duration: 0.8,
      ease: customEaseOut,
    },
  },
};

// Variants for the scroll indicator
const scrollIndicatorVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 2, // Appear after hero animation
      duration: 1,
      ease: customEaseOut,
      repeat: Infinity, // Make it subtly bounce
      repeatType: "reverse",
      repeatDelay: 0.5,
    },
  },
  fadeOut: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.5,
      ease: customEaseOut,
    },
  },
};

type HeroProps = {
  coupleNames?: [string, string];
  eventDate: Date;
  message: string;
};

export default function Hero({
  coupleNames = ["Kenia", "Gustavo"],
  eventDate,
  message,
}: HeroProps) {
  const [showPetals, setShowPetals] = useState(false);

  const { scrollYProgress } = useScroll();

  const nameScale = useTransform(scrollYProgress, [0, 0.2], [1.2, 0.4]);
  const nameY = useTransform(scrollYProgress, [0, 0.2], ["0vh", "-45vh"]);
  const headerBgOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 0.2]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const nameOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.25],
    [1, 1, 0.9]
  );

  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // New transform for the scroll indicator opacity
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.1], // Fades out as soon as user scrolls a bit
    [1, 0]
  );

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

  const venueLatitude = 32.44791;
  const venueLongitude = -117.07053;

  const handleCopyAddressClick = () => {
    navigator.clipboard.writeText(destinationAddress);
    toast.success("¡Dirección copiada exitosamente!");
  };

  const handleUberButtonClick = () => {
    navigator.clipboard.writeText(destinationAddress);
    toast.success("Dirección copiada ✨ Abriendo Uber...", {
      duration: 3000,
    });

    setTimeout(() => {
      const uberURL = `https://m.uber.com/ul/?action=setPickup&dropoff[latitude]=${venueLatitude}&dropoff[longitude]=${venueLongitude}&dropoff[nickname]=Nuestra%20Boda`;
      window.open(uberURL, "_blank");
    }, 2500);
  };

  const cardItemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: customEaseOut },
    },
  };

  const generateGoogleCalendarUrl = () => {
    const title = "Boda de Kenia & Gustavo";
    const location = destinationAddress;
    const details = "¡Acompáñanos en nuestro gran día!";

    const start = new Date(eventDate);
    const end = new Date(eventDate);
    end.setHours(end.getHours() + 4);

    const format = (date: Date) =>
      date.toISOString().replace(/[-:]|\.\d{3}/g, "");

    const startTime = format(start);
    const endTime = format(end);

    const baseUrl = "https://www.google.com/calendar/render";
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      dates: `${startTime}/${endTime}`,
      details,
      location,
    });

    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden
                    bg-beige-100 dark:bg-soft-black text-olive-900 dark:text-beige transition-colors duration-700"
    >
      {/* Background Image - Covers the entire viewport */}
      <Image
        src="/images/wedding-hero-bg.jpg"
        alt="Elegant wedding background"
        fill
        priority
        className="object-cover object-center pointer-events-none z-0 opacity-40 dark:opacity-25 transition-opacity duration-700"
      />
      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 z-5 bg-gradient-to-t from-beige-100/50 via-transparent to-beige-100/50 dark:from-soft-black/60 dark:via-transparent dark:to-soft-black/60" />

      {/* Toggles (Music & Theme) - Fixed position, always visible */}
      <div className="fixed top-4 right-4 flex gap-3 sm:gap-4 z-50">
        <MusicToggle />
      </div>

      {/* Petal animation (if on wedding day) */}
      <AnimatePresence>{showPetals && <PetalRain />}</AnimatePresence>
      <motion.p
        style={{ opacity: titleOpacity }}
        className="fixed top-[300px] left-0 right-0
                   flex items-center justify-center
                   px-4 text-xl sm:text-2xl md:text-3xl
                   font-script tracking-wide
                   text-olive-800 dark:text-beige-300
                   z-40 pointer-events-none"
      >
        Welcome to the wedding of:
      </motion.p>

      {/* Couple Names - Fixed and animated on scroll */}
      <motion.h1
        style={{ scale: nameScale, y: nameY, opacity: nameOpacity }}
        className={clsx(
          "fixed top-0 left-0 right-0",
          "flex items-center justify-center",
          "h-screen px-4",
          "text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-script leading-tight",
          "drop-shadow-[0_5px_10px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_5px_10px_rgba(255,255,255,0.08)]",
          "select-none whitespace-nowrap z-40 pointer-events-none"
        )}
      >
        {/* Desktop only */}
        <span className="hidden sm:inline">{coupleNames}</span>

        {/* Mobile only */}
        <span className="inline sm:hidden text-center leading-tight">
          Kenia &<br />
          Gustavo
        </span>
      </motion.h1>

      {/* Message/Subtitle - Fixed and fades out with names */}
      <motion.p
        style={{ opacity: subtitleOpacity }}
        className="fixed top-0 left-0 right-0 flex items-center justify-center h-screen pt-[calc(50%+6rem)]
                        px-4  text-lg sm:text-xl md:text-2xl font-serif tracking-wide text-olive-700 dark:text-beige-200 z-40 pointer-events-none"
      >
        {message}
      </motion.p>

      {/* Scroll Down Indicator */}
      <motion.div
        variants={scrollIndicatorVariants}
        initial="hidden"
        animate="visible"
        exit="fadeOut" // Use exit when unmounting, though here we'll control opacity with useTransform
        style={{ opacity: scrollIndicatorOpacity }}
        className="fixed bottom-10 left-0 right-0 flex flex-col items-center justify-center
                   text-olive-700 dark:text-beige-200 z-40 pointer-events-none"
      >
        <ChevronDown className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
        <p className="text-sm sm:text-base font-serif mt-2">Scroll Down</p>
      </motion.div>

      {/* Main Scrollable Content Section */}
      <section
        aria-label="Wedding Details"
        className="relative z-10
                    min-h-[200vh]
                    pt-[90vh] // Keep this to push content down
                    flex flex-col items-center w-full max-w-4xl mx-auto px-4 sm:px-6 py-16
                    "
      >
        {/* Background that darkens on scroll */}
        <motion.div
          style={{ opacity: headerBgOpacity }}
          className={clsx(
            "fixed top-0 left-0 right-0 h-20 sm:h-24 z-30 px-6 sm:px-12 flex items-center justify-center",
            "bg-beige/85 dark:bg-soft-black/85 border border-white/25 dark:border-soft-black/40",
            "backdrop-blur-lg shadow-2xl transition-all duration-500 ease-in-out"
          )}
        ></motion.div>

        {/* Container for Cards - Animates in after initial scroll */}
        <motion.div
          variants={contentContainerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center justify-center space-y-8 sm:space-y-10"
        >
          {/* Countdown Card */}
          <motion.div
            variants={cardItemVariants}
            className={clsx(
              "w-full p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-lg",
              "bg-beige/85 dark:bg-soft-black/85 border border-white/25 dark:border-soft-black/40",
              "flex flex-col items-center justify-center"
            )}
          >
            <>
              <Countdown targetDate={eventDate} />
              <a
                href={generateGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-2 border border-green-600 rounded-full text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900 transition font-medium"
              >
                <Calendar className="w-5 h-5" />
                Agregar a Google Calendar
              </a>
            </>
          </motion.div>

          {/* Weather Card */}
          <motion.div
            variants={cardItemVariants}
            className={clsx(
              "w-full p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-lg",
              "bg-beige/85 dark:bg-soft-black/85 border border-white/25 dark:border-soft-black/40",
              "flex flex-col items-center justify-center text-center"
            )}
          >
            <h2 className="mb-4 text-xl sm:text-2xl font-script text-olive-800 dark:text-olive-300">
              Clima para el Gran Día
            </h2>
            <p className="mb-4 text-sm sm:text-base font-serif text-olive-700 dark:text-beige-200">
              Para ayudarte a prepararte, aquí tienes el pronóstico del tiempo.
              ¡Esperamos un día lleno de amor!
            </p>
            <WeatherCard eventDate={eventDate} />
          </motion.div>

          {/* Directions Card */}
          <motion.div
            variants={cardItemVariants}
            className={clsx(
              "w-full p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-lg",
              "bg-beige/85 dark:bg-soft-black/85 border border-white/25 dark:border-soft-black/40",
              "flex flex-col items-center justify-center text-center"
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
                onClick={handleCopyAddressClick}
                aria-label="Copiar dirección"
                className="ml-2 p-1 rounded-full hover:bg-olive-200 dark:hover:bg-olive-700 transition"
              >
                <Clipboard className="w-5 h-5 text-olive-600 dark:text-olive-300" />
              </button>
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 w-full">
              <a
                href={`http://google.com/maps/search/?api=1&query=${encodeURIComponent(
                  destinationAddress
                )}&travelmode=driving`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2 border border-olive-600 rounded-full text-olive-700 dark:text-olive-300 hover:bg-olive-100 dark:hover:bg-olive-900 transition w-full sm:w-auto font-medium"
              >
                <MapPin className="w-5 h-5" />
                Abrir en Google Maps
              </a>

              <button
                onClick={handleUberButtonClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-2 border border-pink-500 rounded-full text-pink-600 dark:text-pink-300 hover:bg-pink-100 dark:hover:bg-pink-900 transition w-full sm:w-auto font-medium"
              >
                <Car className="w-5 h-5" />
                Solicitar un Uber
              </button>
            </div>
          </motion.div>
          <WeddingGallery />
          <GiftRegistry />
        </motion.div>
      </section>

      {/* Attribution footer */}
      <footer className="relative bottom-4 mt-12 text-xs sm:text-sm text-black/40 dark:text-beige/30 select-none font-serif tracking-wide z-10">
        Developed with ❤️ by Gustavo Tello
      </footer>
    </div>
  );
}