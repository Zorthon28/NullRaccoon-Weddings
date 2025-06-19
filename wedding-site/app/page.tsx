import Hero from '@/components/Hero'

export default function Home() {
  return (
    <Hero
      eventDate={new Date('2025-07-05')}
      message="Nos casamos el 5 de Julio, 2025"
    />
  )
}
