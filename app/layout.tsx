import { Work_Sans } from 'next/font/google'
import './globals.css'

const workSans = Work_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-work-sans',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={workSans.variable}>
      <body className="antialiased bg-transparent text-text" style={{ fontFamily: 'Work Sans, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
