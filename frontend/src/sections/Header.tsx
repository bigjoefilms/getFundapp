"use client"
import logoImage from "@/src/assets/logo1.png";
import Image from "next/image";
import Button from "../components/Button";
import {  useAppKit  } from '@reown/appkit/react'
// import { networks } from '../config'
// import { useState } from "react";

// import {
//   // useAppKitState,
//   // useAppKitTheme,
//   // useAppKitEvents,
//   useAppKitAccount,
//   useWalletInfo
//    } from '@reown/appkit/react'

// interface ActionButtonListProps {
//     sendHash: (hash: string ) => void;
//     sendSignMsg: (hash: string) => void;
//     sendBalance: (balance: string) => void;

//   }
  

export const Header = () => {
  const { open } = useAppKit();
  // const {address, caipAddress, isConnected, embeddedWalletInfo} = useAppKitAccount();
  // const walletInfo = useWalletInfo()
    
  
     
  return (
   
    <header className="md:px-9 px-0 py-6 flex  justify-between container">
        <div className="flex items-center gap-3">
        <Image
        src={logoImage}
        alt="Brand logo"
        className="h-12 w-12 rounded-lg border border-black/30"
      />

            <h1 className="font-medium text-xl">Getfund</h1>
        </div>
      
<div className="text-4xl md:hidden flex">
<Button className="text-sm font-normal"  onClick={() => open()}>
        Connect Wallet
        
      </Button>

</div>
      <div className="md:flex items-center gap-5 hidden ">
        <div className="flex gap-7 bg-[#ffff] px-6 py-2 rounded-2xl text-sm font-normal">
          <a href="#" className="cursor-not-allowed">Discord</a>
          <a href="https://x.com/getfundapp?s=21">X</a>
          <a href="#" className="cursor-not-allowed">Docs</a>
          <a href="">Telegram</a>
        </div>

        <Button className="text-sm font-normal"  onClick={() => open()}>
        Connect Wallet
        
      </Button>
      <div>
        

      {/* <pre>
      <pre>
                Address: {address}<br />
                caip Address: {caipAddress}<br />
                Connected: {isConnected.toString()}<br />
                Account Type: {embeddedWalletInfo?.accountType}<br />
                {embeddedWalletInfo?.user?.email && (`Email: ${embeddedWalletInfo?.user?.email}\n`)}
                {embeddedWalletInfo?.user?.username && (`Username: ${embeddedWalletInfo?.user?.username}\n`)}
            </pre>
                Name: {walletInfo.walletInfo?.name?.toString()}<br />
            </pre> */}
      </div>
      <div>
      
      
      </div>
      </div>
     
    </header>
  );
};
