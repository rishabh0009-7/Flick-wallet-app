'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20 min-h-screen items-center justify-center bg-zinc-900 text-zinc-100'>
      <Card className="p-8 flex flex-col items-center gap-6 shadow-xl bg-zinc-800 border border-zinc-700 rounded-2xl">
        <h1 className="text-4xl font-extrabold">Flick Wallet</h1>
        <div className="flex gap-6">
          <Link href="/eth">
            <Button size="lg" className="hover:scale-105 transition-transform duration-200">
              Ethereum
            </Button>
          </Link>
          <Link href="/solana">
            <Button variant="destructive" size="lg" className="hover:scale-105 transition-transform duration-200">
              Solana
            </Button>
          </Link>
        </div>
      </Card>
    </main>
  )
}
