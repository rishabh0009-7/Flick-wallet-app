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
  };

  const copyMnemonic = () => {
    if (!mnemonic) return;
    navigator.clipboard.writeText(mnemonic);
    toast.success("Seed phrase copied to clipboard");
  };

  const addWallet = async () => {
    if (!mnemonic) {
      return toast.error("Generate a seed phrase first");
    }

    try {
      const seed = await bip39.mnemonicToSeed(mnemonic);
      const path = "m/44'/501'/0'/0'";
      const derivedSeed = derivePath(path, seed.toString('hex'));
      const keypair = Keypair.fromSeed(derivedSeed.key);

      setWallets((prev) => [
        ...prev,
        {
          publicKey: keypair.publicKey.toBase58(),
          secretKey: Buffer.from(keypair.secretKey).toString('hex'),
        },
      ]);

      toast.success("Wallet added");
    } catch (error) {
      toast.error("Failed to add wallet");
      console.error(error);
    }
  };

  const deleteWallet = (idx: number) => setWallets(wallets.filter((_, i) => i !== idx));

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100 px-4 py-8">
      <Card className="w-full max-w-2xl bg-zinc-900 p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
        <h2 className="text-3xl font-bold text-center">Solana Wallet Generator</h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={generateMnemonic} className="w-full sm:w-auto">Generate Seed Phrase</Button>
          {mnemonic && (
            <>
              <Button variant="outline" onClick={copyMnemonic} className="w-full sm:w-auto">
                Copy Seed Phrase
              </Button>
              <Button onClick={addWallet} className="w-full sm:w-auto">
                Add Wallet
              </Button>
            </>
          )}
        </div>

        {mnemonic && (
          <div className="bg-zinc-800 p-4 rounded text-sm break-words font-mono border border-zinc-700">
            {mnemonic}
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-xl font-semibold border-b border-zinc-700 pb-2">Wallets</h3>
          {wallets.length === 0 ? (
            <p className="text-zinc-400 text-sm">No wallets created yet.</p>
          ) : (
            <div className="max-h-64 overflow-y-auto pr-1 space-y-3">
              {wallets.map((w, i) => (
                <div key={i} className="bg-zinc-800 rounded-lg p-4 text-sm border border-zinc-700 space-y-2">
                  <div className="truncate">
                    <span className="font-semibold text-zinc-300">Public:</span>{" "}
                    <span className="text-zinc-400">{w.publicKey}</span>
                  </div>
                  <div className="truncate">
                    <span className="font-semibold text-zinc-300">Secret:</span>{" "}
                    <span className="text-red-400">{w.secretKey}</span>
                  </div>
                  <Button size="sm" variant="destructive" onClick={() => deleteWallet(i)}>
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
      <Toaster richColors />
    </main>
  );
}
