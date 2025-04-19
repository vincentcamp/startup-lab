"use client"

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/ui/theme-provider"
import { useEffect } from 'react'
import Clarity from '@microsoft/clarity'
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DareBet - Bet with Friends, Win or Face Punishment',
  description: 'Make sports predictions with your friends, win their money, or pay the price with hilarious punishments.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    Clarity.init("r6bo2k7cq8");
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}