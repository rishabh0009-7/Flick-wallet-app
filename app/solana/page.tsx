'use client';

import { useState } from "react";
import * as bip39 from "bip39";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast, Toaster } from "sonner";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";

export default function Sol() {
  const [mnemonic, setMnemonic] = useState("");
  const [wallets, setWallets] = useState<{ publicKey: string; secretKey: string }[]>([]);

  const generateMnemonic = () => {
    setMnemonic(bip39.generateMnemonic());
    toast.success("Seed phrase generated");
  };

  const copyMnemonic = () => {
    if (!mnemonic) return;
    navigator.clipboard.writeText(mnemonic);
    toast.success("Seed phrase copied");
  };

  const addWallet = async () => {
    if (!mnemonic) {
      return toast.error("Generate a seed phrase first");
    }

    try {
      const seed = await bip39.mnemonicToSeed(mnemonic);
      const path = "m/44'/501'/0'/0'";
      const derivedSeed = derivePath(path, seed.toString("hex"));
      const keypair = Keypair.fromSeed(derivedSeed.key);

      setWallets((prev) => [
        ...prev,
        {
          publicKey: keypair.publicKey.toBase58(),
          secretKey: Buffer.from(keypair.secretKey).toString("hex"),
        },
      ]);

      toast.success("Wallet added");
    } catch (error) {
      toast.error("Failed to add wallet");
      console.error(error);
    }
  };

  const deleteWallet = (idx: number) =>
    setWallets(wallets.filter((_, i) => i !== idx));

  const clearWallets = () => setWallets([]);

  return (
    <main className="min-h-screen bg-black text-white px-4 py-12 flex flex-col items-center gap-12">
      <Toaster />

      <div className="w-full max-w-3xl bg-zinc-900 rounded-2xl p-8 shadow-xl border border-zinc-800">
        <h1 className="text-3xl font-bold mb-6">Your Secret Phrase</h1>

        {mnemonic ? (
          <>
            <div
              onClick={copyMnemonic}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 cursor-pointer"
            >
              {mnemonic.split(" ").map((word, index) => (
                <div
                  key={index}
                  className="bg-zinc-800 text-white rounded-md px-4 py-2 text-center text-sm font-medium border border-zinc-700"
                >
                  {word}
                </div>
              ))}
            </div>
            <p className="text-sm text-zinc-400 mb-4">
              📋 Click anywhere to copy
            </p>
          </>
        ) : (
          <div className="text-center mb-6">
            <Button onClick={generateMnemonic}>Generate Seed Phrase</Button>
          </div>
        )}
      </div>

      {mnemonic && (
        <div className="w-full max-w-3xl">
          <div className="flex gap-4 justify-end mb-4">
            <Button onClick={addWallet}>Add Wallet</Button>
            <Button variant="destructive" onClick={clearWallets}>
              Clear Wallets
            </Button>
          </div>

          {wallets.length > 0 && (
            <div className="space-y-4">
              {wallets.map((w, i) => (
                <div
                  key={i}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-2"
                >
                  <h2 className="font-semibold text-lg">Wallet {i + 1}</h2>
                  <p className="text-sm text-purple-300">
                    <span className="font-medium">Public:</span> {w.publicKey}
                  </p>
                  <p className="text-sm text-red-400">
                    <span className="font-medium">Secret:</span> {w.secretKey}
                  </p>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteWallet(i)}
                    className="mt-2"
                  >
                    Delete Wallet
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
