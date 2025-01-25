import { useState, useRef, useEffect,useCallback, } from "react";
import { products, Product } from "./product";
import { useAppKitAccount } from "@reown/appkit/react";

export const Features: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
   const {address, } = useAppKitAccount();
  //  const {address, caipAddress, isConnected, embeddedWalletInfo} = useAppKitAccount();

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

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const modalRef = useRef<HTMLDivElement>(null);

  // Filter products based on selected category
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

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

  const openCreateModal = () => {
    setCreateModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

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
      creator: "0x0",
      daysAgo: 0,
      image: "",
      category: "Infrastructure", // Default category
    });
  
    closeCreateModal();
  };

  


  return (
    <section>
      <div className="mt-32 flex relative w-full flex-col md:container cursor-pointer">
        {/* Create Project Button */}
      

        {/* Category Buttons */}
        <div className="flex  md:gap-4 gap-2 mb-4">
          {["All", "Infrastructure", "DAO", "Dev Tool", "DeFi"].map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`md:px-6 md:py-2 px-3 py-1 text-[12px] md:text-sm  font-normal rounded-3xl ${selectedCategory === category ? "bg-black text-white" : "bg-white"}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="text-center w-full">
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full px-4 py-2 border border-darkGray rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
          />
        </div>
        <button
          onClick={openCreateModal}
          className="mb-4 py-2 px-6 bg-white text-black rounded-lg font-semibold mt-4"
        >
          Submit a Project
        </button>
         <h1 className="text-2xl font-medium">Projects</h1>
        {/* Products */}
        <div>
          {filteredProducts.map((product) => (
            <div key={product.id} className="border-b w-full  py-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  <div
                    className="h-20 w-20 rounded-lg"
                    style={{
                      backgroundColor: !product.image ? "#800080" : "transparent",
                      backgroundImage: product.image ? `url(${product.image})` : "none",
                      backgroundSize: "cover",
                    }}
                  ></div>
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
                    <span className="text-black/50 text-[12px]">Raised</span> {product.raised}
                  </div>
                </div>
              </div>
              <div className="flex flex-col cursor-pointer" onClick={() => openModal(product)}>
                <div className="font-medium text-xl mt-3" onClick={() => openModal(product)}>{product.name}</div>
                <p className="text-[12px] text-black/70" onClick={() => openModal(product)}>{product.description}</p>
                <div className="underline text-[12px]">See more...</div>
                {/* <button
                  onClick={() => openModal(product)}
                  className="rounded-lg text-white bg-black border border-black/10 mt-5 py-4 px-5 text-[14px] font-medium"
                >
                  Invest
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal for product details */}
      {modalOpen && selectedProduct && (
  <div className="modal-overlay">
    <div ref={modalRef} className="modal-container">
      <h2 className="modal-title">{selectedProduct.name}</h2>
      <input
        type="text"
        placeholder="0.00 in USDC"
        className="modal-input"
      />
      <button className="modal-button">Fund</button>
    </div>
  </div>
)}

      {/* Modal for creating a new product */}
     {/* Modal for creating a new product */}
{createModalOpen && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-6 w-[90%] max-w-[400px]">
      <h2 className="text-xl font-bold mb-4 text-center">Create a New Project</h2>
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
