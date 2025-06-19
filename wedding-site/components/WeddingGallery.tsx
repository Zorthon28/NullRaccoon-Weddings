// src/components/WeddingGallery.tsx
"use client";

import { motion, cubicBezier } from "framer-motion"; // Import cubicBezier here
import Image from "next/image";
import { clsx } from "clsx";

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

export default function WeddingGallery() {
  // Replace with your actual image paths
  const images = [
    "/images/gallery/photo-1.jpg",
    "/images/gallery/photo-2.jpg",
    "/images/gallery/photo-3.jpg",
    "/images/gallery/photo-4.jpg",
    "/images/gallery/photo-5.jpg",
    "/images/gallery/photo-6.jpg",
    // Add more images as needed
  ];

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
        Nuestra Historia en Fotos
      </h2>
      <p className="mb-8 text-sm sm:text-base font-serif text-olive-700 dark:text-beige-200 max-w-prose">
        Recorre algunos de nuestros momentos especiales y mira un adelanto de
        lo que está por venir.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {images.map((src, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
            className="relative w-full aspect-square overflow-hidden rounded-lg shadow-md group cursor-pointer"
          >
            <Image
              src={src}
              alt={`Nuestra Historia ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover object-center transition-transform duration-300 group-hover:scale-110"
            />
            {/* Optional Overlay on Hover */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
          </motion.div>
        ))}
      </div>
      {/* A button to view more photos, if you have a larger gallery */}
      {/* <a
        href="/gallery" // Link to a dedicated gallery page if needed
        className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 border border-olive-600 rounded-full text-olive-700 dark:text-olive-300 hover:bg-olive-100 dark:hover:bg-olive-900 transition font-medium"
      >
        Ver Más Fotos
      </a> */}
    </motion.div>
  );
}