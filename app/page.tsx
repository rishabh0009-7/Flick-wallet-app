'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20 min-h-screen items-center justify-center'>
      <Card className="p-8 flex flex-col items-center gap-6 shadow-lg bg-zinc-800">
        <h1 className="text-4xl font-extrabold text-zinc-100 mb-4">Flick Wallet</h1>
        <div className="flex gap-4">
          <Link href="/eth">
            <Button size="lg">Ethereum</Button>
          </Link>
          <Link href="/solana">
            <Button variant="destructive" size="lg">Solana</Button>
          </Link>
        </div>
      </Card>
    </main>
  )
}