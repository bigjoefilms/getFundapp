import Image from "next/image";
import solanaImgae from "../../public/assets/solana.png"

export const Footer = () => {                 
  return (
    <footer className=' text-center relative pt-44 bottom-0 font-light text-sm py-40'>
      <div className="container flex justify-center  gap-6 md:flex-row flex-col items-center">
        
        {/* <p className='mt-6'>&copy; 2025 getFundapp, Inc All rights reserved </p> */}
        <div className="flex  gap-1 items-start justify-start flex-col">
          Powered by 
          <Image src={solanaImgae} alt="solana logo" width={150} height={150}/>
        </div>
       



      </div>
    </footer>
  );
};
