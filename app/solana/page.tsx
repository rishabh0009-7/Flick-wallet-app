'use-client'

import { useState } from "react"
import * as bip39 from "bip39"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast , Toaster} from "sonner"
import { Keypair } from "@solana/web3.js"
import { derivePath } from "ed25519-hd-key"

export default function sol (){
    const [mnemonic, setMnemonic ] = useState("")
    const [wallets , setwallets] = useState<{publicKey:string , secretKey :string}[]>([])



    const generateMnemonic = ()=>{
        setMnemonic(bip39.generateMnemonic())
    }


    const copyMnemonic = ()=>{
        navigator.clipboard.writeText(mnemonic)
        toast({ title :"seedh hrase copied"})
    }
// in solana its not simple like eth  to create wallet in ether wallet creation is simple from mnemonic  but in solana seed> path >derived seed > keypair 

const addWallet = async () => {
    if (!mnemonic) {
      return toast.error("Generate a seed phrase first");
    }
  
    try {
      const seed = await bip39.mnemonicToSeed(mnemonic); // ✅ await is required
      const path = "m/44'/501'/0'/0'"; // ✅ fixed path
      const derived = derivePath(path, seed.toString('hex')); // ✅ 'hex' as string
      const keypair = Keypair.fromSeed(derived.key); // ✅ correct usage
  
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


    const deleteWallet = (idx: number) => setWallets(wallets.filter((_, i) => i !== idx))


    return(

        <main className="min-h-screen flex flex-col items-center justify-center gap-8 bg-zinc-900 text-zinc-100">
        <Card className="p-8 w-full max-w-md flex flex-col gap-4 bg-zinc-800">
          <h2 className="text-2xl font-bold mb-2">Solana Wallet</h2>
          <Button onClick={generateMnemonic}>Generate Seed Phrase</Button>
          {mnemonic && (
            <div className="flex flex-col gap-2">
              <div className="bg-zinc-700 p-2 rounded">{mnemonic}</div>
              <Button variant="outline" onClick={copyMnemonic}>Copy Seed Phrase</Button>
              <Button onClick={addWallet}>Add Wallet</Button>
            </div>
          )}
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Wallets</h3>
            {wallets.length === 0 && <div>No wallets yet.</div>}
            {wallets.map((w, i) => (
              <div key={i} className="mb-2 p-2 bg-zinc-700 rounded">
                <div><span className="font-bold">Public:</span> {w.publicKey}</div>
                <div><span className="font-bold">Secret:</span> {w.secretKey}</div>
                <Button size="sm" variant="destructive" onClick={() => deleteWallet(i)}>Delete</Button>
              </div>
            ))}
          </div>
        </Card>
        <Toaster />
      </main>
    )
}