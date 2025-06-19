// app/friends/page.tsx
import Hero from '@/components/Hero'

export default function FriendsPage() {
  return (
    <Hero
      eventDate={new Date('2025-07-12')}
      message="Nos vemos el 12 de Julio, 2025 💌 ¡Gracias por celebrar con nosotros, amigos!"
    />
  )
}
