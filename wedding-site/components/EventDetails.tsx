'use client'

import { MapPin, Car } from "lucide-react";

export default function EventDetails() {
  const venue = {
    lat: 32.4479,
    lng: -117.0705,
    address: "Torrontes 33, Cto. Zinfandel 3970, 22564, B.C."
  };

  return (
    <section className="px-6 py-16 text-center text-soft-black dark:text-beige bg-white dark:bg-neutral-900">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-serif mb-4">Información del Evento 📍</h2>
        <p className="text-lg mb-6 font-light">
          Celebración en: <strong>{venue.address}</strong>
        </p>

        <div className="rounded-lg overflow-hidden shadow-md mb-8">
          <iframe
            title="Mapa del evento"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3363.342231883036!2d-117.07299898454297!3d32.44795108106166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d94cbcf8d2b3df%3A0x2b2f7e7d3db9c6e4!2sCto.%20Zinfandel%2033%2C%2022564%20Tijuana%2C%20B.C.!5e0!3m2!1ses!2smx!4v1718823059210!5m2!1ses!2smx"
            width="100%"
            height="400"
            allowFullScreen
            loading="lazy"
            className="border-0 w-full"
          ></iframe>
        </div>


        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${venue.lat},${venue.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 border border-olive-600 rounded-full text-olive-700 dark:text-olive-300 hover:bg-olive-100 dark:hover:bg-olive-900 transition"
          >
            <MapPin className="w-5 h-5" />
            Ver en Google Maps
          </a>

          <a
            href={`https://m.uber.com/ul/?action=setPickup&dropoff[latitude]=${venue.lat}&dropoff[longitude]=${venue.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 border border-pink-500 rounded-full text-pink-600 dark:text-pink-300 hover:bg-pink-100 dark:hover:bg-pink-900 transition"
          >
            <Car className="w-5 h-5" />
            Solicitar Uber
          </a>
        </div>
      </div>
    </section>
  )
}
