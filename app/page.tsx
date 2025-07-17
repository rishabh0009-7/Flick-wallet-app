'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-4xl text-left">
        <div className="mb-10">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
            Welcome to Flick Wallet 
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400">
          Choose your blockchain to get started. Fast, secure, and seamless wallet experience.
          </p>
        </div>

        <div className="flex gap-4">
          <Link href="/solana">
            <Button
              size="lg"
              className="rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition"
            >
              Solana
            </Button>
          </Link>
          <Link href="/eth">
            <Button
              size="lg"
              className="rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition"
            >
              Ethereum
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
