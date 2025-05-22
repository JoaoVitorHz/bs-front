'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LocalizationProvider } from '@mui/x-date-pickers';
// If you are using date-fns v2.x, please import `AdapterDateFns`
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
// If you are using date-fns v3.x, please import the v3 adapter
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { ptBR } from 'date-fns/locale/pt-BR';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
          {children}
      </LocalizationProvider>
      </body>
    </html>
  );
}
