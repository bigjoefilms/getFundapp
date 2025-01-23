"use client";
import React, { useState, useEffect } from 'react';
import { Header } from "../sections/Header";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Footer } from '../sections/Footer';


export default function Home() {
  const [loading, setLoading] = useState(false);
  const [animateTop, setAnimateTop] = useState(false);
  const [animateBottom, setAnimateBottom] = useState(false);

  useEffect(() => {
    // Trigger the animations on load
    setAnimateTop(true);
    setAnimateBottom(true);
  }, []);

  const handleClick = () => {
    setLoading(true);
    // Simulate an API call or any async operation
    setTimeout(() => {
      setLoading(false);
      // Perform any further actions here
    }, 2000); // 2 seconds delay
  };

  return (
    <>
      <Header/>
      <div className="container h-full justify-center flex items-center flex-col relative ">
        
        <div className="pt-[100px] flex flex-col items-center md:text-sm text-[12px] ">
          <div className={`border border-black/15 px-4 h-10 rounded-lg  my-2 text-black/60 items-center flex justify-center gap-2 ${animateTop ? 'slide-in-bottom' : ''}`}>
            <div className="border border-black/15 px-2 rounded-lg flex items-center gap-3 " >
              <div>What&#39;s s New</div>
              <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.7)]"></div>
            </div>
            <div> getfundapp is coming soon</div>
          </div>
          
          <h2 className={`text-4xl my-4 text-center md:text-7xl max-w-3xl mx-auto font-bold tracking-tight relative z-10 ${animateTop ? 'slide-in-top' : ''}`}>
            Create a Campaign share, Connect, fund, and succeed
          </h2>
          
          <DotLottieReact
            src="https://lottie.host/cf3e7f03-dae6-49ba-a23d-d12f0027f7ac/rGLcmDlab4.lottie"
            loop
            autoplay
            className="absolute top-0 left-1/2 transform -translate-x-1/2 z-0  w-[800px] h-[800px] blur-md "
          />
          
          <form className={`flex justify-center mt-5 relative z-10 gap-2 ${animateBottom ? 'slide-in-bottom' : ''}`}>
            <input type="email" placeholder="Enter your email" className="px-8 py-2 rounded-lg border border-black/15 "/>
            <button
              type="submit"
              className="bg-black text-white py-2 px-8 rounded-lg font-medium text-md relative"
              onClick={handleClick}
              disabled={loading}
            >
              {loading ? (
                <div className="loader"></div>
              ) : (
                'Join waitlist'
              )}
            </button>
          </form>
        </div>

        <div className={`footer-container ${animateBottom ? 'slide-in-bottom' : ''}`}>
          <Footer />
        </div>
      </div>
    </>
  );
}
