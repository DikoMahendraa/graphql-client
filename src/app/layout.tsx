
"use client"

import { Inter } from 'next/font/google'
import './globals.css'

import createApolloClient from "@/services/graphql-env"
import { ApolloProvider } from '@apollo/client'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const client = createApolloClient();


  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProvider client={client}>
        {children}
        </ApolloProvider>
      </body>
    </html>
  )
}
