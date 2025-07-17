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
    toast.success("Seed phrase generated");
  };

  const copyMnemonic = () => {
    if (!mnemonic) return;
    navigator.clipboard.writeText(mnemonic);
    toast.success("Copied to clipboard");
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
      toast.error("Invalid mnemonic");
    }
  };

  const deleteWallet = (idx: number) => {
    setWallets(wallets.filter((_, i) => i !== idx));
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-900 px-4 py-12 text-zinc-100">
      <Toaster />
      <Card className="w-full max-w-2xl p-6 sm:p-8 bg-zinc-800 rounded-2xl shadow-2xl flex flex-col gap-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-purple-400">
          Generate Your Ethereum Wallet
        </h1>

        <div className="flex justify-center">
          <Button size="lg" onClick={generateMnemonic}>
            Generate Seed Phrase
          </Button>
        </div>

        {mnemonic && (
          <div className="space-y-4">
            <div className="bg-zinc-700 p-4 rounded-md text-sm break-words text-center border border-zinc-600">
              {mnemonic}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" onClick={copyMnemonic}>
                Copy Phrase
              </Button>
              <Button onClick={addWallet}>Create Wallet</Button>
            </div>
          </div>
        )}

        {wallets.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center text-zinc-200">Your Wallets</h2>
            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
              {wallets.map((w, i) => (
                <div
                  key={i}
                  className="bg-zinc-700 p-4 rounded-lg border border-zinc-600 space-y-2 text-sm"
                >
                  <div>
                    <span className="font-medium text-purple-300">Address:</span> {w.address}
                  </div>
                  <div>
                    <span className="font-medium text-red-300">Private Key:</span> {w.privateKey}
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="mt-2"
                    onClick={() => deleteWallet(i)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </main>
  );
}
