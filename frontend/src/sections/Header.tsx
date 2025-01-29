import React, { useState, useRef, useEffect } from 'react';
import logoImage from "../../public/assets/logo1.png";
import Image from "next/image";
import Button from "../components/Button";
import { useAppKit, useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import type { Provider } from '@reown/appkit-adapter-solana/react';
import avatarImg from '../../public/assets/avatar.png'

export const Header = () => {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { walletProvider } = useAppKitProvider<Provider>('solana');

  const handleSignMsg = async () => {
    try {
      if (!walletProvider) return;
      const encodedMessage = new TextEncoder().encode("Welcome to Getfund");
      const sig = await walletProvider.signMessage(encodedMessage);
      console.log("Signed Message:", Buffer.from(sig).toString("hex"));
    } catch (error) {
      console.error("Signing failed:", error);
    }
  };

  const handleConnect = async () => {
    open();
    setDropdownVisible(true);
  };

  useEffect(() => {
    if (isConnected) {
      handleSignMsg();
    }
  }, [isConnected]);

  const shortenAddress = (address: string | undefined) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleClickOutside = (event: MouseEvent | null) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event!.target as Node)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownVisible]);

  return (
    <header className="md:px-9 px-0 my-6 flex py-2 rounded-xl justify-between container sticky backdrop-blur-sm z-20 bg-white/30 top-8">
      <div className="flex items-center gap-3">
        <Image
          src={logoImage}
          alt="Brand logo"
          className="h-12 w-12 rounded-lg border border-black/30"
        />
        <h1 className="font-medium text-xl">Getfund</h1>
      </div>

      <div className="text-4xl md:hidden flex">
        <Button className="text-sm font-normal" onClick={handleConnect}>
          Connect Wallet
        </Button>
      </div>

      <div className="md:flex items-center gap-5 hidden">
        <div className="flex gap-7 bg-[#ffff] px-6 py-2 rounded-2xl text-sm font-normal">
          <a href="https://discord.gg/9QHgF52R">Discord</a>
          <a href="https://x.com/getfundapp?s=21">X</a>
          <a href="#" className="cursor-not-allowed">Docs</a>
          <a href="https://t.me/+b9vBRdWyhPM1ODY0">Telegram</a>
        </div>

        {isConnected ? (
          <div className="relative " onClick={handleConnect}>
            <Button className="text-sm font-normal flex items-center gap-3">
              <div className='h-6 w-6 rounded-full bg-slate-500'> <Image src={avatarImg} alt='avatar '/></div>
              <p className="text-[12px] font-medium">{shortenAddress(address)}</p>
            </Button>
          </div>
        ) : (
          <Button className="text-sm font-normal" onClick={handleConnect}>
            Connect Wallet
          </Button>
        )}
      </div>
    </header>
  );
};
