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
    toast.success("Seed phrase generated successfully");
  };

  const copyMnemonic = () => {
    if (!mnemonic) return;
    navigator.clipboard.writeText(mnemonic);
    toast.success("Seed phrase copied to clipboard");
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard`);
  };

  const addWallet = () => {
    if (!mnemonic) return toast.error("Generate seed phrase first");

    try {
      const mnemonicObj = Mnemonic.fromPhrase(mnemonic);
      const wallet = HDNodeWallet.fromMnemonic(mnemonicObj, `m/44'/60'/0'/0/${wallets.length}`);
      
      setWallets((prev) => [
        ...prev,
        { address: wallet.address, privateKey: wallet.privateKey },
      ]);
      toast.success("New wallet generated successfully");
    } catch {
      toast.error("Invalid seed phrase");
    }
  };

  const clearWallets = () => {
    setWallets([]);
    toast.success("All wallets cleared");
  };

  const deleteWallet = (idx: number) => {
    setWallets(wallets.filter((_, i) => i !== idx));
    toast.success("Wallet deleted");
  };

  return (
    <main className="min-h-screen bg-black text-white px-4 py-8">
      <Toaster theme="dark" />
      
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Ethereum Wallet Generator</h1>
          <p className="text-zinc-400">Generate secure Ethereum wallets from your seed phrase</p>
        </div>

        {/* Seed Phrase Section */}
        <Card className="bg-zinc-900 border-zinc-700 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">Seed Phrase</h2>
            {!mnemonic && (
              <Button 
                onClick={generateMnemonic}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6"
              >
                Generate Seed Phrase
              </Button>
            )}
          </div>

          {mnemonic && (
            <div className="space-y-4">
              <div
                onClick={copyMnemonic}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-6 bg-zinc-800 rounded-xl border-2 border-zinc-700 hover:border-zinc-600 cursor-pointer transition-all"
              >
                {mnemonic.split(" ").map((word, index) => (
                  <div
                    key={index}
                    className="bg-zinc-700 rounded-lg px-4 py-3 text-center border border-zinc-600"
                  >
                    <div className="text-xs text-zinc-400 mb-1">{index + 1}</div>
                    <div className="text-white font-medium text-sm">{word}</div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-sm text-zinc-400">
                  🔒 Click the grid above to copy your seed phrase
                </p>
                <div className="flex gap-3">
                  <Button 
                    onClick={generateMnemonic}
                    variant="outline"
                    className="border-zinc-600 text-black hover:bg-zinc-800"
                  >
                    Generate New
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Wallet Management */}
        {mnemonic && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">Your Wallets</h2>
              <div className="flex gap-3">
                <Button 
                  onClick={addWallet}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold"
                >
                  + Add Wallet
                </Button>
                {wallets.length > 0 && (
                  <Button 
                    onClick={clearWallets}
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </div>

            {wallets.length === 0 ? (
              <Card className="bg-zinc-900 border-zinc-700 p-12 text-center">
                <div className="text-zinc-500 mb-4">
                  <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔑</span>
                  </div>
                  <p className="text-lg">No wallets generated yet</p>
                  <p className="text-sm">Click "Add Wallet" to create your first wallet</p>
                </div>
              </Card>
            ) : (
              <div className="grid gap-6">
                {wallets.map((wallet, index) => (
                  <Card key={index} className="bg-zinc-900 border-zinc-700 p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl font-semibold text-white">Wallet {index + 1}</h3>
                        <p className="text-sm text-zinc-400">Derivation path: m/44'/60'/0'/0/{index}</p>
                      </div>
                      <Button
                        onClick={() => deleteWallet(index)}
                        variant="destructive"
                        size="sm"
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium text-zinc-300">
                            Address
                          </label>
                          <Button
                            onClick={() => copyToClipboard(wallet.address, "Address")}
                            size="sm"
                            variant="outline"
                            className="border-zinc-600 text-black hover:bg-zinc-700 text-xs px-3 py-1"
                          >
                            Copy
                          </Button>
                        </div>
                        <code className="text-sm text-green-400 font-mono break-all block bg-zinc-900 p-3 rounded border border-zinc-600">
                          {wallet.address}
                        </code>
                      </div>
                      
                      <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium text-zinc-300">
                            Private Key
                          </label>
                          <Button
                            onClick={() => copyToClipboard(wallet.privateKey, "Private key")}
                            size="sm"
                            variant="outline"
                            className="border-zinc-600 text-black hover:bg-zinc-700 text-xs px-3 py-1"
                          >
                            Copy
                          </Button>
                        </div>
                        <code className="text-sm text-red-400 font-mono break-all block bg-zinc-900 p-3 rounded border border-zinc-600">
                          {wallet.privateKey}
                        </code>
                        <p className="text-xs text-red-500 mt-2">
                          ⚠️ Never share your private key with anyone
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}