// src/components/GiftRegistry.tsx
"use client";

import { motion, cubicBezier } from "framer-motion"; // Import cubicBezier here
import Image from "next/image";
import { clsx } from "clsx";
// import { DollarSign } from "lucide-react"; // Uncomment if you use the cash contribution icon

// Define your specific ease function once (copied from Hero.tsx for consistency)
const customEaseOut = cubicBezier(0.42, 0, 0.58, 1);

// Define a common card variants for stagger effect
const cardItemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    // FIX: Use the 'customEaseOut' variable directly here
    transition: { duration: 0.8, ease: customEaseOut },
  },
};

export default function GiftRegistry() {
  return (
    <motion.div
      variants={cardItemVariants} // Use the same item variant for a staggered look
      className={clsx(
        "w-full max-w-xl p-6 sm:p-8 mt-8 sm:mt-10 rounded-3xl shadow-2xl backdrop-blur-lg",
        "bg-beige/85 dark:bg-soft-black/85 border border-white/25 dark:border-soft-black/40",
        "flex flex-col items-center text-center"
      )}
    >
      <h2 className="mb-6 text-xl sm:text-2xl font-script text-olive-800 dark:text-olive-300">
        Regalos
      </h2>
      <p className="mb-8 text-sm sm:text-base font-serif text-olive-700 dark:text-beige-200 max-w-prose">
        Su presencia en nuestro día especial es el regalo más grande. Sin
        embargo, si desean hacernos un obsequio, aquí tienen algunas
        sugerencias:
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md">
        {/* Example Registry Link 1 */}
        <a
          href="https://www.amazon.com/your-registry-link" // REPLACE WITH YOUR AMAZON REGISTRY LINK
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-pink-500 rounded-full text-pink-600 dark:text-pink-300 hover:bg-pink-100 dark:hover:bg-pink-900 transition w-full sm:w-auto font-medium"
        >
          <Image
            src="/icons/amazon.svg" // Create an SVG icon for Amazon in public/icons
            alt="Amazon Logo"
            width={20}
            height={20}
            className="dark:filter dark:invert" // Basic invert for dark mode if icon is dark
          />
          Lista de Amazon
        </a>

        {/* Example Registry Link 2 (e.g., Honeyfund, Zola, or a custom contribution) */}
        <a
          href="https://www.honeyfund.com/your-registry-link" // REPLACE WITH YOUR HONEYFUND/ZOLA/OTHER LINK
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-olive-600 rounded-full text-olive-700 dark:text-olive-300 hover:bg-olive-100 dark:hover:bg-olive-900 transition w-full sm:w-auto font-medium"
        >
          <Image
            src="/icons/honeyfund.svg" // Create an SVG icon for Honeyfund in public/icons
            alt="Honeyfund Logo"
            width={20}
            height={20}
            className="dark:filter dark:invert"
          />
          Nuestra Luna de Miel
        </a>

        {/* Optionally, for a cash gift/contribution */}
        {/* <a
          href="#" // You might link to a custom payment page or just explain here
          className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-purple-500 rounded-full text-purple-600 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900 transition w-full sm:w-auto font-medium"
        >
          <DollarSign className="w-5 h-5" />
          Contribución Monetaria
        </a> */}
      </div>
    </motion.div>
  );
}