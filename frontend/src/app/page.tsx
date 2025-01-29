"use client"
import { Footer } from "@/sections/Footer";
import { Features } from "../sections/Feature";
import { Header } from "../sections/Header";
import Hero from "../sections/Hero";
import { LogoTicker } from "@/sections/LogoTicker";







export default function Home() {
 
  

  return (
    <>
    <section className="px-2 py-4">
    <Header />
    
           

    <Hero/>
    
    <Features/>
    <LogoTicker/>
    <Footer/>
    
   
    </section>
   
    
     
    </>
  );
}
