import { Inter, Dancing_Script } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from 'sonner'
import './styles/globals.css'

// Load both fonts
const inter = Inter({ subsets: ['latin'] })
const dancing = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-dancing',
})

export const metadata = {
  title: 'Gustavo & Kenia 💍',
  description: 'Nuestra boda - Julio 5, 2025',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={dancing.variable}>
      <body className={`${inter.className} bg-white text-black dark:bg-neutral-900 dark:text-white`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Toaster position="top-right" richColors />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
