// app/friends/page.tsx
import Hero from '@/components/Hero'

export default function FriendsPage() {
  return (
      <Hero
        coupleNames={["Kenia &", "Gustavo"]}
        eventDate={new Date("2025-07-04T00:00:00")} // ← Updated here
        message="¡Nos casamos el 4 de julio de 2025! 🎉"
      />
    );
  }
  