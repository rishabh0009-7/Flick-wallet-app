'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import * as bip39 from "bip39";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { ethers } from "ethers";
import { HDNodeWallet , Mnemonic } from "ethers";

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
    toast.success("Seed phrase copied to clipboard");
  };

  const addWallet = () => {
    if (!mnemonic) {
      return toast.error("Generate seed phrase first");
    }

    try {
        const wallet = HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(mnemonic));
      setWallets((prev) => [...prev, { address: wallet.address, privateKey: wallet.privateKey }]);
      toast.success("Wallet added");
    } catch (error) {
      toast.error("Invalid mnemonic");
    }
  };

  const deleteWallet= (idx:number)=>{
    setWallets(wallets.filter((_,i) => i!== idx))

  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 bg-zinc-900 text-zinc-100">
      <Toaster />
      <Card className="p-8 w-full max-w-md flex flex-col gap-4 bg-zinc-800">
        <h2 className="text-2xl font-bold mb-2">Ethereum Wallet</h2>

        <Button onClick={generateMnemonic}>Generate Seed Phrase</Button>

        {mnemonic && (
          <div className="flex flex-col gap-2">
            <div className="bg-zinc-700 p-3 rounded text-sm break-all">{mnemonic}</div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={copyMnemonic}>
                Copy Seed Phrase
              </Button>
              <Button onClick={addWallet}>Add Wallet</Button>
            </div>
          </div>
        )}

        {wallets.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="font-semibold text-lg">Generated Wallets:</h3>
            {wallets.map((w, i) => (
              <div
                key={i}
                className="text-sm bg-zinc-700 p-2 rounded"
              >
                <div><strong>Address:</strong> {w.address}</div>
                <div><strong>Private Key:</strong> {w.privateKey}</div>
                <Button size="sm" variant="destructive" onClick={() => deleteWallet(i)}>Delete</Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </main>
  );
}
