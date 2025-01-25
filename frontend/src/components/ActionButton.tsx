import { useDisconnect, useAppKitAccount   } from '@reown/appkit/react'
// import { useDisconnect, useAppKitNetwork, useAppKitAccount, useAppKitProvider   } from '@reown/appkit/react'

// import type { Provider } from '@reown/appkit-adapter-solana/react'
// import { useAppKitConnection } from '@reown/appkit-adapter-solana/react'
// import { PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from "@solana/web3.js";
import { useRouter } from 'next/navigation'; // Import useRouter


// interface ActionButtonListProps {
//   sendHash: (hash: string ) => void;
//   sendSignMsg: (hash: string) => void;
//   sendBalance: (balance: string) => void;
// }

export const ActionButtonList = () => {
    const { disconnect } = useDisconnect();
    // const { switchNetwork } = useAppKitNetwork();
    const { isConnected } = useAppKitAccount()
    // const { connection } = useAppKitConnection();
    // const { walletProvider } = useAppKitProvider<Provider>('solana')
    const router = useRouter();


    // // function to send a tx
    // const handleSendTx = async () => {
    //   if (!address || !connection) throw Error('user is disconnected');

    //   const wallet = new PublicKey(address);
    //   if (!wallet) throw Error('wallet provider is not available');

    //   const latestBlockhash = await connection.getLatestBlockhash();

    //   const transaction= new Transaction({
    //     feePayer: wallet,
    //     recentBlockhash: latestBlockhash?.blockhash,
    //   }).add(
    //     SystemProgram.transfer({
    //       fromPubkey: wallet,
    //       toPubkey: new PublicKey(address), // destination address
    //       lamports: 1000,
    //     })
    //   );

    //   const sig = await walletProvider.sendTransaction(transaction, connection)

    //   sendHash(sig);
    // }

    // // function to sing a msg 
    // const handleSignMsg = async () => {
    //   if (!walletProvider || !address) throw Error('user is disconnected')
      
    //   const encodedMessage = new TextEncoder().encode("Hello Reown AppKit!");
    //   const sig = await walletProvider.signMessage(encodedMessage);

    //   const signatureHex = Buffer.from(sig).toString("hex");
    //   sendSignMsg(signatureHex);
    // }

    // // function to get the balance
    // const handleGetBalance = async () => {
    //   if (!address || !connection) throw Error('user is disconnected');
      
    //   const wallet = new PublicKey(address);
    //   const balance = await connection?.getBalance(wallet);
    //   if (balance !== undefined) {
    //     sendBalance(`${balance / LAMPORTS_PER_SOL} SOL`);
    //   } else {
    //     sendBalance('- SOL');
    //   }
    // }

    const handleDisconnect = async () => {
      try {
        await disconnect();
        router.push('/');
      } catch (error) {
        console.error("Failed to disconnect:", error);
      }
    };
    return (
      <>
       
          <div >
            <div className='flex flex-col'>
            
            {isConnected ? (
          <div>
            <div className='flex flex-col'>
              <button onClick={handleDisconnect} className='h-12 text-black bg-black/20 border border-black/10 py-2 rounded-lg px-6 text-[14px] font-medium'>Disconnect</button>
            </div>
          </div>
        ) : (
          <div></div>
          // <appkit-button  />
          // < // Add the appkit-button for connecting
        )}
            
              
            </div>
          </div>
        
      </>
    );
  }