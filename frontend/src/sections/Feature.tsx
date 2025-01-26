import React, { useState, useRef, useEffect, useCallback } from "react";
import { products, Product } from "./product";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
// import { useAppKitConnection } from '@reown/appkit-adapter-solana/react';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, Connection } from "@solana/web3.js";
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Provider } from '@reown/appkit-adapter-solana/react';
import Image from "next/image";
// import solartechImage from './assets/solartech_community_charger.png';
// import cleanwaterImage from './assets/cleanwater_initiative.png';
import greenspacesImage from '../assets/greenspaces_urban_gardens.png';

export const Features: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { address} = useAppKitAccount();
  // const { connection } = useAppKitConnection();
  const { walletProvider } = useAppKitProvider<Provider>('solana');
  const connection = new Connection('https://devnet.helius-rpc.com/?api-key=c7e5b412-c980-4f46-8b06-2c85c0b4a08d', 'confirmed');


  

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: "",
    description: "",
    raised: "$0",
    creator: "0x0",
    daysAgo: 0,
    image: "",
    category: "Infrastructure", // Default category
  });
 

  const modalRef = useRef<HTMLDivElement>(null);
  const [inputAmount, setInputAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search input
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Filter products based on selected category and search term
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearchTerm = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  // function shortenAddress(address: string, length: number = 6): string {
  //   if (!address || address.length <= length) return address;
  //   return `${address.slice(0, length)}...`;
  // }

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
    document.body.style.overflow = "auto"; // Restore background scrolling
  };

  // const openCreateModal = () => {
  //   setCreateModalOpen(true);
  //   document.body.style.overflow = "hidden"; // Prevent background scrolling
  // };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
    document.body.style.overflow = "auto"; // Restore background scrolling
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  }, [modalRef]);

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

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = () => {
    const newProductData = {
      ...newProduct,
      id: products.length + 1,
      daysAgo: 0,
      creator: address || "Unknown", // Automatically assign the connected wallet address
    };
  
    products.push(newProductData); // Add new product to the list
  
    // Reset form
    setNewProduct({
      id: 0,
      name: "",
      description: "",
      raised: "$0",
      creator: "" ,
      daysAgo: 0,
      image: "",
      category: "Infrastructure", // Default category
    });
  
    closeCreateModal();
  };

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
        feePayer: new PublicKey(address),
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
      
        {/* Category Buttons */}
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
        {/* <button
          // onClick={openCreateModal}
          className="mb-4 py-2 px-6 bg-white text-black rounded-lg font-semibold mt-4 cursor-not-allowed"
        >
          Submit a Project
        </button> */}
        <div className="border px-4 py-4 rounded-lg flex items-center bg-[#fef3eb] my-4">
          <FontAwesomeIcon icon={faExclamationTriangle} className="text-[#f2883c] mr-2" />
          <span>To get whitelisted, please send us an email at getfundapp@gmail.com.</span>
        </div>
         <h1 className="text-2xl font-medium mt-4">Projects</h1>
        {/* Products */}
        <div>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="border-b w-full py-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <Image
                    src={greenspacesImage}
                    alt="Product image"
                    className="h-20 w-20 rounded-lg"
                    width={20}
                    height={20}
                  />
                  <div className="flex flex-col items-end">
                    <div className="text-[11px] text-black/50">
                      {product.daysAgo} days ago
                    </div>
                    <div className="text-[16px] font-semibold">
                      <span className="text-black/50 text-[12px]">Raised</span>{" "}
                      {product.raised}
                    </div>
                  </div>
                </div>
                <div className="font-medium text-xl mt-3">{product.name}</div>
                <p className="text-sm">{product.description}</p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              No projects found matching your search.
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
            <div className="flex gap-4 items-center pb-12">
            <Image src={greenspacesImage} alt="Product image" className=" h-28 w-28 rounded-lg" width={30} height={30}/>

              <div className="flex flex-col">
                <h2 className="font-medium text-5xl py-4">{selectedProduct.name}</h2>
                <p className="pb-4">{selectedProduct.description}</p>
              </div>
            </div>
            <div className="">
              <input
                type="text"
                placeholder="0.00 in USDC"
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

      {/* Modal for creating a new product */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-[400px]">
            <h2 className="text-xl font-bold mb-4 text-center ">Create a New Project</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit(); }}>
              <input
                type="text"
                name="name"
                placeholder="Project Name"
                value={newProduct.name}
                onChange={handleFormChange}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                required
              />
              <textarea
                name="description"
                placeholder="Project Description"
                value={newProduct.description}
                onChange={handleFormChange}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                required
              />
              <select
                name="category"
                value={newProduct.category}
                onChange={(e) => setNewProduct((prev) => ({ 
                  ...prev, 
                  category: e.target.value as "Infrastructure" | "DAO" | "Dev Tool" | "DeFi"
                }))}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                required
              >
                <option value="Infrastructure">Infrastructure</option>
                <option value="DAO">DAO</option>
                <option value="Dev Tool">Dev Tool</option>
                <option value="DeFi">DeFi</option>
              </select>
              <input
                type="text"
                name="creator"
                placeholder="Creator Address"
                value={address}
                onChange={handleFormChange}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="w-full py-2 mt-4 bg-black text-white rounded-lg font-semibold"
              >
                Create Project
              </button>
            </form>
            <button
              onClick={closeCreateModal}
              className="w-full py-2 mt-2 text-black rounded-md bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

// interface ProductDescriptionProps {
//   description: string; // Define the type for description
// }

// const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
  
//   const toggleReadMore = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div>
//       <p className="text-[12px] text-black/70">
//         {isExpanded ? description : `${description.split(' ').slice(0, 20).join(' ')}...`}
//       </p>
//       <button onClick={toggleReadMore} className="text-blue-500 text-[12px]">
//         {isExpanded ? 'Read less' : 'Read more'}
//       </button>
//     </div>
//   );
// };
