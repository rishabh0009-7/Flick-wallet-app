'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import * as bip39 from "bip39";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { HDNodeWallet, Mnemonic } from "ethers";

export default function Eth() {
  const [mnemonic, setMnemonic] = useState("");
  const [wallets, setWallets] = useState<{ address: string; privateKey: string }[]>([]);

  const generateMnemonic = () => {
    setMnemonic(bip39.generateMnemonic());
    toast.success("New seed phrase generated");
  };

  const copyMnemonic = () => {
    if (!mnemonic) return;
    navigator.clipboard.writeText(mnemonic);
    toast.success("Seed phrase copied");
  };

  const addWallet = () => {
    if (!mnemonic) return toast.error("Generate seed phrase first");

    try {
      const wallet = HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(mnemonic));
      setWallets((prev) => [
        ...prev,
        { address: wallet.address, privateKey: wallet.privateKey },
      ]);
      toast.success("Wallet added");
    } catch {
      toast.error("Invalid seed phrase");
    }
  };

  const clearWallets = () => setWallets([]);

  const deleteWallet = (idx: number) =>
    setWallets(wallets.filter((_, i) => i !== idx));

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
                    <span className="font-medium">Address:</span> {w.address}
                  </p>
                  <p className="text-sm text-red-400">
                    <span className="font-medium">Private Key:</span>{" "}
                    {w.privateKey}
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
