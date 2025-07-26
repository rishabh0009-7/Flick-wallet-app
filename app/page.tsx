'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-4xl text-center">
        {/* Hero Section */}
        <div className="mb-16">
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold mb-8 text-white bg-gradient-to-r from-white via-zinc-300 to-white bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)] tracking-tight">
  Flick Wallet
</h1>

          <p className="text-xl sm:text-2xl text-zinc-300 font-light max-w-3xl mx-auto leading-relaxed mb-12">
            Generate secure crypto wallets instantly. Choose your blockchain and get started in seconds.
          </p>
        </div>

        {/* Blockchain Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Link href="/solana">
            <Button 
              size="lg"
              className="w-64 h-16 bg-purple-600 hover:bg-purple-700 text-white text-xl font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              Solana Wallet
            </Button>
          </Link>
          
          <Link href="/eth">
            <Button 
              size="lg"
              className="w-64 h-16 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Ethereum Wallet
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-8 text-zinc-400 text-sm">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Secure
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Fast
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Simple
          </span>
        </div>
      </div>
    </main>
  )
}