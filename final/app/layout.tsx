import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bug tracking App',
  description: 'Created by IT-Crouwd',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
