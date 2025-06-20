"use client";

import { motion, cubicBezier } from "framer-motion";
import Image from "next/image";
import { clsx } from "clsx";

// Define a custom cubic-bezier ease-out for smoother animations
const customEaseOut = cubicBezier(0.42, 0, 0.58, 1);

// Animation variants for the main card container
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: customEaseOut },
  },
};

export default function GiftRegistry() {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden" // Start hidden
      animate="visible" // Animate to visible when component mounts
      className={clsx(
        "w-full max-w-xl p-6 sm:p-8 mt-10 sm:mt-12 rounded-3xl shadow-2xl backdrop-blur-lg",
        "bg-beige/85 dark:bg-soft-black/85 border border-white/25 dark:border-soft-black/40", // Using beige/soft-black with transparency
        "flex flex-col items-center text-center"
      )}
    >
      <h2 className="mb-4 text-2xl sm:text-3xl font-script text-olive-800 dark:text-olive-300">
        Gracias por acompañarnos en este viaje
      </h2>

      <p className="mb-6 text-base sm:text-lg font-serif text-olive-700 dark:text-beige-200 max-w-prose">
        Tu presencia en nuestra boda es el regalo más valioso. Si deseas
        contribuir con algo especial para nuestro nuevo hogar, te dejamos
        algunas opciones:
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md">
        {/* Amazon Button - using baby-blue styling */}
        <a
          href="https://www.amazon.com/your-registry-link" // REMEMBER: Replace with your actual Amazon registry link
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full transition transform duration-300 ease-in-out w-full sm:w-auto font-medium whitespace-nowrap",
            // Baby-blue styling
            "border border-baby-blue-500 text-baby-blue-600 hover:bg-baby-blue-100 hover:scale-105 hover:shadow-lg",
            "dark:border-baby-blue-300 dark:text-baby-blue-300 dark:hover:bg-baby-blue-900 dark:hover:scale-105 dark:hover:shadow-lg"
          )}
        >
          <Image
            src="/images/icons/amazon.jpg" // Make sure this path is correct
            alt="Amazon Logo"
            width={20}
            height={20}
            className="dark:invert" // Inverts colors for dark mode visibility
          />
          Lista de Amazon
        </a>

        {/* Costco Registry Button - NOW using the SAME baby-blue styling */}
        <a
          href="YOUR_COSTCO_REGISTRY_LINK_HERE" // IMPORTANT: Replace with your actual Costco registry link
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full transition transform duration-300 ease-in-out w-full sm:w-auto font-medium whitespace-nowrap",
            // Applied the SAME baby-blue styling as Amazon
            "border border-baby-blue-500 text-baby-blue-600 hover:bg-baby-blue-100 hover:scale-105 hover:shadow-lg",
            "dark:border-baby-blue-300 dark:text-baby-blue-300 dark:hover:bg-baby-blue-900 dark:hover:scale-105 dark:hover:shadow-lg"
          )}
        >
          <Image
            src="/images/icons/costco.jpg" // Make sure this path and file exist
            alt="Costco Logo"
            width={20}
            height={20}
            // If your Costco logo has specific colors, remove `dark:invert`.
            // If it's a simple black/white icon, `dark:invert` will work for dark mode.
            // Adjust based on your actual icon.
            // className="dark:invert"
          />
          Lista de Costco
        </a>
      </div>

      <p className="mt-6 text-xs text-olive-600 dark:text-beige-400 font-serif opacity-70">
        ¡Gracias por tu amor y apoyo en este nuevo capítulo!
      </p>
    </motion.div>
  );
}