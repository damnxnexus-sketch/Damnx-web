"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function GlobalHero() {
  return (
    <section className="relative w-full min-h-screen bg-[#FDF8F6] overflow-hidden flex flex-col justify-center font-sans">
      
      {/* Background Curved Shape */}
      <div 
        className="absolute top-0 right-0 h-full w-[55%] bg-white hidden lg:block z-0 pointer-events-none"
        style={{
          clipPath: "ellipse(100% 100% at 100% 50%)"
        }}
      />

      {/* Star 1 - Top Left */}
      <div className="absolute top-[20%] left-[10%] z-10 pointer-events-none">
        <Image 
          src="/global page assets/star.png" 
          alt="star"
          width={48}
          height={48}
          className="w-8 h-8 md:w-10 md:h-10 object-contain"
        />
      </div>
      
      {/* Star 2 - Bottom Right */}
      <div className="absolute bottom-[15%] right-[20%] z-10 pointer-events-none">
        <Image 
          src="/global page assets/star.png" 
          alt="star"
          width={96}
          height={96}
          className="w-16 h-16 md:w-20 md:h-20 object-contain"
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 pt-24 pb-20">
        
        {/* Left Content */}
        <div className="flex-1 w-full max-w-xl mt-10 lg:mt-0">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-10 h-[1px] bg-black" />
            <span className="uppercase text-xs tracking-[0.2em] text-[#2D2D2D] font-medium">Global Digital Studio</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold leading-[1.1] tracking-tight text-[#111111]"
          >
            Building digital <br/>
            experiences for <br/>
            <span className="text-[#E5231B]">businesses <br/> worldwide.</span>
          </motion.h1>
        </div>

        {/* Right Content - Images */}
        <div className="flex-1 relative w-full h-[500px] lg:h-[600px] hidden lg:block mt-12 lg:mt-0">
          
          {/* Card 1 - Top Right */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 15 }}
            transition={{ duration: 1, delay: 0.4, type: "spring", bounce: 0.4 }}
            className="absolute top-12 right-8 w-[280px] bg-[#3A3A3A] rounded-[32px] p-4 pb-8 shadow-2xl flex flex-col items-center z-10"
          >
             {/* Pushpin */}
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 drop-shadow-md">
                <div className="w-6 h-6 bg-[#E5231B] rounded-full shadow-inner relative z-10 border border-[#CC0000]">
                  <div className="absolute top-[3px] left-[3px] w-2 h-2 bg-white/40 rounded-full" />
                </div>
                <div className="w-[3px] h-4 bg-[#9CA3AF] absolute -bottom-2 left-1/2 -translate-x-1/2 -z-10 shadow-sm rounded-b-sm" />
             </div>
             
             <div className="w-full aspect-square rounded-[24px] overflow-hidden bg-white shadow-inner flex items-center justify-center">
               <Image 
                 src="/global page assets/hero section image1.jpg" 
                 alt="Crafting Iconic Identities" 
                 width={300} 
                 height={300} 
                 className="w-full h-full object-cover object-center"
               />
             </div>
             <p className="text-white text-xl font-medium text-center mt-5 leading-tight">
               Crafting Iconic <br/> Identities
             </p>
          </motion.div>

          {/* Card 2 - Bottom Left */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: -10 }}
            transition={{ duration: 1, delay: 0.6, type: "spring", bounce: 0.4 }}
            className="absolute bottom-16 left-4 w-[240px] bg-[#3A3A3A] rounded-[28px] p-3 pb-6 shadow-2xl flex flex-col items-center z-20"
          >
             {/* Pushpin */}
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 drop-shadow-md">
                <div className="w-5 h-5 bg-[#E5231B] rounded-full shadow-inner relative z-10 border border-[#CC0000]">
                  <div className="absolute top-[2px] left-[2px] w-1.5 h-1.5 bg-white/40 rounded-full" />
                </div>
                <div className="w-[2px] h-3 bg-[#9CA3AF] absolute -bottom-2 left-1/2 -translate-x-1/2 -z-10 shadow-sm rounded-b-sm" />
             </div>

             <div className="w-full aspect-square rounded-[20px] overflow-hidden bg-white shadow-inner flex items-center justify-center">
               <Image 
                 src="/global page assets/hero section image2.png" 
                 alt="Make Your Mark" 
                 width={240} 
                 height={240} 
                 className="w-full h-full object-cover object-center"
               />
             </div>
             <p className="text-white text-lg font-medium text-center mt-4 leading-tight">
               Make Your <br/> Mark
             </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

