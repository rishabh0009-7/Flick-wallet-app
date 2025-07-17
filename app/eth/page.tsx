'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import * as bip39 from "bip39";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { ethers } from "ethers";
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
    if (!mnemonic) {
      return toast.error("Generate seed phrase first");
    }

    try {
      const wallet = HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(mnemonic));
      setWallets((prev) => [
        ...prev,
        { address: wallet.address, privateKey: wallet.privateKey },
      ]);
      toast.success("Wallet added");
    } catch (error) {
      toast.error("Invalid mnemonic");
    }
  };

  const deleteWallet = (idx: number) => {
    setWallets(wallets.filter((_, i) => i !== idx));
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-zinc-900 text-zinc-100">
      <Toaster />
      <Card className="w-full max-w-xl p-6 md:p-8 bg-zinc-800 shadow-lg rounded-2xl flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center">Ethereum Wallet Generator</h1>

        <div className="flex justify-center">
          <Button onClick={generateMnemonic}>Generate Seed Phrase</Button>
        </div>

        {mnemonic && (
          <div className="space-y-4">
            <div className="bg-zinc-700 p-4 rounded-md text-sm break-all text-center">
              {mnemonic}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button variant="outline" onClick={copyMnemonic}>
                Copy Seed Phrase
              </Button>
              <Button onClick={addWallet}>Generate Wallet</Button>
            </div>
          </div>
        )}

        {wallets.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Generated Wallets</h2>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {wallets.map((w, i) => (
                <div
                  key={i}
                  className="bg-zinc-700 p-3 rounded-lg text-sm space-y-1"
                >
                  <div>
                    <span className="font-medium">Address:</span> {w.address}
                  </div>
                  <div>
                    <span className="font-medium">Private Key:</span>{" "}
                    {w.privateKey}
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
