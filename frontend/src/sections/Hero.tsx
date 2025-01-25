"use client";
// import React, { useState, useEffect } from "react";
// import { toast, ToastContainer } from "react-toastify";

import { motion, } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative">
      <div className="container mt-28 z-10">
        <div className="">
          <h1 className="md:text-6xl font-medium py-2 text-5xl">
            Empower the Innovators
          </h1>
          <p className="pb-8 max-w-xl ">
            Empower the Innovators Play a key role in shaping the future by
            supporting projects that resonate with you. Contribute to the
            initiatives that inspire change and progress
          </p>
          {/* <Button className=" font-normal" onClick={() => open()}>
            Get started
          </Button> */}
        </div>
      </div>

      <div className=" -z-10 top-26 absolute">
        <div className="absolute inset-0 -z-10 "></div>
        {/* startplannet */}
        <div className="absolute blur-md h-64 -z-10 w-64 md:h-96 md:w-96 bg-white rounded-full border border-white/20 shadow-[-20px_-20px_50px_rgb(255,255,255,.5),-60px_-20px_80px_rgb(255,255,255,.1),0_0_50px_rgb(0, 0, 0)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(50%_50%_at_16.8%_18.3%,white,rgb(0, 0, 0)_37.7%,rgb(24,0,66))]"></div>
        {/* endplanet */}
        {/* start ring 1 */}
        <motion.div
          style={{
            translateY: "-50%",
            translateX: "-50%",
          }}
          animate={{
            rotate: "1turn",
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute h-[334px] w-[344px] md:h-[580px] md:w-[580px] opacity-20 border border-white/20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
        >
          <div className="absolute h-2 w-2 top-1/2 left-0 bg-black rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute h-2 w-2 top-0 left-1/2 bg-black rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute h-5 w-5 top-1/2 left-full border border-black rounded-full -translate-x-1/2 -translate-y-1/2 inline-flex  items-center justify-center">
            <div className="h-2 w-2 bg-white rounded-full"> </div>
          </div>
        </motion.div>
        {/* end ring 1
    // start ring 2 */}
        <motion.div
          style={{
            translateY: "-50%",
            translateX: "-50%",
          }}
          animate={{
            rotate: "1turn",
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute h-[444px] w-[444px] md:h-[780px] md:w-[780px] rounded-full border border-black/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed"
        ></motion.div>
        {/* end ring 2 */}
        {/* start ring 3 */}
        <motion.div
          style={{
            translateY: "-50%",
            translateX: "-50%",
          }}
          animate={{
            rotate: "-1turn",
          }}
          transition={{
            duration: 90,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute h-[544px] w-[544px] md:h-[980px] md:w-[980px] rounded-full border opacity-20 border-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
        >
          <div className="absolute h-2 w-2 top-1/2 left-0 bg-black rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute h-2 w-2 top-0 left-full bg-black rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </motion.div>
        {/* end ring 3 */}
      </div>

      <div className="">
        {/* <motion.img src={cogImage.src} alt='Cog image' className='-z-10 absolute right-20 hidden lg:flex
            md:h-full md:w-auto md:max-w-none top-28 '
            animate={{translateY: [-30,30],}}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 3,
              ease: 'easeInOut'
            }}
            /> */}
      </div>
    </section>
  );
};

export default Hero;
