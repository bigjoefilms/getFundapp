
import logoImage from "@/src/assets/logo.png"
import Image from "next/image";


export const Header = () => {
  return (
  <header className="md:px-9 px-0 py-2">
    <Image src={logoImage} alt="Brand logo" className="h-24 w-24" />
    
    {/* <div className='absolute inset-0 backdrop-blur -z-10 md:hidden'></div>
    <div className="container">
      <div className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto md:backdrop-blur relative">
      <div className='absolute inset-0 backdrop-blur -z-10 hidden md:block '></div>
        <div>
          <div className='flex  items-center'>
          <Image src={logoImage} alt="Brand logo" className="h-16 w-16" />
          <h3 className="font-medium ">GetFund</h3>
          </div>
          </div>
          
      </div>

    </div> */}

  </header>
  );
};
