import React, { useState, useRef, useEffect, useCallback } from "react";
import { products, Product } from "./product";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, Connection } from "@solana/web3.js";
import { faExclamationTriangle,faSearch  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Provider } from '@reown/appkit-adapter-solana/react';
import Image from "next/image";
import dotenv from 'dotenv';
dotenv.config();


export const Features: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { address} = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Provider>('solana');
  const connection = new Connection(`https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`, 'confirmed');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [inputAmount, setInputAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search input
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [balance, setBalance] = useState<number | null>(null); 
  const creatorAddress = "EFzmBNRFz8cDpUrN8vMjh7jQexiWQr5E7LTzH9vokLMN";   
  const wallet = address ? new PublicKey(address) : null; 


  // filter products based on selected category and search term
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearchTerm = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  // function to get the balance
 const handleGetBalance = async (creatorAddress: string) => {
    try {
      const wallet = new PublicKey(creatorAddress); 
      const balanceInLamports = await connection?.getBalance(wallet);

      // Update the state with the balance in SOL, formatted to 3 decimal places
      setBalance(balanceInLamports ? parseFloat((balanceInLamports / LAMPORTS_PER_SOL).toFixed(3)) : 0);
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalance(null); 
    }
  };

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  function shortenAddress(address: string, length: number = 6): string {
    if (!address || address.length <= length) return address;
    return `${address.slice(0, length)}...`;
  }

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
    document.body.style.overflow = "auto"; // Restore background scrolling
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  }, [modalRef]);

  useEffect(() => {
    // Call the function immediately on mount
    handleGetBalance(creatorAddress);
    
    // Set up an interval to call the function every 10 seconds (10000 ms)
    const intervalId = setInterval(() => {
      handleGetBalance(creatorAddress);
    }, 10000); // Adjust the interval as needed

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [creatorAddress, handleGetBalance]); // Include handleGetBalance in the dependency array

  useEffect(() => {
    if (modalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto"; // Clean up on component unmount
    };
  }, [modalOpen, handleClickOutside]); // Add `handleClickOutside` as a dependency

 


  const handleFund = async () => {
    if (!inputAmount || isNaN(Number(inputAmount)) || Number(inputAmount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (!address) {
      setError("Wallet not connected.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      if (!selectedProduct?.creator) {
        throw new Error("Creator address is not defined.");
      }
      if (!connection) {
        throw new Error("Connection is not established.");
      }
      const receiver = new PublicKey(selectedProduct.creator);
      const latestBlockhash = await connection.getLatestBlockhash();
   
      const transaction = new Transaction({
        feePayer: wallet,
        recentBlockhash: latestBlockhash.blockhash,
      }).add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(address),
          toPubkey: receiver,
          lamports: LAMPORTS_PER_SOL * parseFloat(inputAmount),
        })
      );

      // Raise the modal to sign and send the transaction
      const signature = await walletProvider.sendTransaction(transaction, connection);
      console.log("Transaction signature:", signature);
      setLoading(false);
      closeModal();
    } catch (error) {
      console.error("Transaction failed:", error);
      setLoading(false);
      setError("Transaction Rejected. Please try again.");
      setInputAmount('')
    }
  };

  return (
    <section>
       
      <div className="mt-32 flex relative w-full flex-col md:container cursor-pointer">
        {/* Category Buttons */}
        <div className="flex md:gap-4 gap-2 mb-4">
          {["All", "Infrastructure", "DAO", "Dev Tool", "DeFi"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`md:px-6 md:py-2 px-3 py-1 text-[12px] md:text-sm font-normal rounded-3xl ${
                selectedCategory === category ? "bg-black text-white" : "bg-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="text-center w-full mb-4">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-darkGray rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
          />
        </div>
        <div className="border px-4 py-3 rounded-lg flex items-center bg-[#fef3eb] my-4 gap-2">
          <FontAwesomeIcon icon={faExclamationTriangle} className="text-[#f2883c] mr-2 h-4 w-4" />
          <span className="text-[12px] md:text-[14px]">To get whitelisted, please send us an email at getfundapp@gmail.com.</span>
        </div>
         <h1 className="text-2xl font-medium mt-4">Projects</h1>


        {/* Products */}
        <div>
          {filteredProducts.length > 0 ? (
            <div>
              {filteredProducts.map((product) => (
                <div key={product.id} className="border-b w-full  py-4 rounded-lg">
                  <div className="flex justify-between items-center ">
                    <div className="flex gap-3">                     
                      <Image src={product.image} alt="Product image" className="  rounded-lg" height={100} width={100} />
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-[11px] text-black/50">
                        {product.daysAgo} days ago
                      </div>
                      <div className="flex gap-1">
                        <span className="text-[12px] font-semibold">
                          Created by  {product.creator ? shortenAddress(product.creator) : "Unknown"}
                        </span>
                      </div>
                      <div className="text-[16px] font-semibold">
                        <span className="text-black/50 text-[12px]">Raised</span>   <div>
     
      {balance !== null ? (
        <p>{balance} SOL</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col cursor-pointer" >
                    <div className="font-medium text-xl mt-3" onClick={() => openModal(product)}>{product.name}</div>
                    <div className="w-full max-w-[450px]">
                    <ProductDescription description={product.description} />
                    </div>
                  
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center mt-10 text-gray-500">
            <FontAwesomeIcon icon={faSearch} size="4x" className="mb-4" />
            <p className="text-lg">No products found</p>
          </div>
          )}
        </div>
      </div>


      {/* Modal for product details */}
      {modalOpen && selectedProduct && (
        <div className="modal-overlay">
          <div ref={modalRef} className="modal-container">
            <div className="w-full flex justify-center items-center">
              <div className="bg-gray-400/20 w-24 h-1 rounded-lg "></div>
            </div>
            <div className="flex gap-4 pt-3 flex-col lg:flex-row">
            <Image src={selectedProduct.image} alt="Product image" className="  rounded-lg" height={100} width={100}/>

              <div className="flex flex-col">
                <h2 className="font-medium md:text-5xl pb-2 text-xl">{selectedProduct.name}</h2>
                <ProductDescription description={selectedProduct.description} />
              </div>
            </div>
            <div className=" pt-8">
              <input
                type="text"
                placeholder="0.00 in SOL"
                value={inputAmount}
                onChange={(e) => setInputAmount(e.target.value)}
                className="modal-input"
              />
              <button onClick={handleFund} className="modal-button">
                {loading ? "Processing..." : "Fund"}
              </button>
              {error && <div className="text-red-500 mt-2">{error}</div>}
            </div>
          </div>
        </div>
      )}

     
    </section>
  );
};

interface ProductDescriptionProps {
  description: string; 
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <p className="text-[12px] text-black/70">
        {isExpanded ? description : `${description.split(' ').slice(0, 20).join(' ')}...`}
      </p>
      <button onClick={toggleReadMore} className="text-black/60 text-[12px] underline">
        {isExpanded ? 'Read less' : 'Read more'}
      </button>
    </div>
  );
};
