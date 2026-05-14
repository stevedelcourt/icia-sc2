import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning className={inter.variable}>
      <body className="antialiased" style={{ fontFamily: 'Inter, sans-serif' }}>{children}</body>
    </html>
  )
}