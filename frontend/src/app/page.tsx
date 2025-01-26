"use client"
import { Features } from "../sections/Feature";
import { Header } from "../sections/Header";
import Hero from "../sections/Hero";







export default function Home() {
 
  

  return (
    <>
    <section className="px-2 py-4">
    <Header />
    
           

    <Hero/>
    <Features/>
    
   
    </section>
   
    
     
    </>
  );
}
