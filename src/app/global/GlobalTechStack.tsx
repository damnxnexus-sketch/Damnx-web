"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const industries = [
  "Healthcare", "Finance", "Education", "Hospitality", "Retail", 
  "Real Estate", "Travel", "Manufacturing", "Government", "Artificial Intelligence"
];

const technologies = [
  { name: "Next.js", src: "/global page assets/icons8-next.js-48 1.png" },
  { name: "React", src: "/global page assets/React-Logo 1.png" },
  { name: "Node.js", src: "/global page assets/node-js 1.png" },
  { name: "Python", src: "/global page assets/python_logo_icon_168886 1.png" },
  { name: "FastAPI", src: "/global page assets/fastapi.png" },
  { name: "AWS", src: "/global page assets/aws.png" },
  { name: "Azure", src: "/global page assets/northware-microsoft-azure-logo 1.png" },
  { name: "Docker", src: "/global page assets/icons8-docker-logo-24 1.png" },
  
  { name: "Kubernetes", src: "/global page assets/icons8-kubernetes-48 1.png" },
  { name: "PostgreSQL", src: "/global page assets/postgre.png" },
  { name: "MongoDB", src: "/global page assets/mongodb-seeklogo 1.png" },
  { name: "OpenAI", src: "/global page assets/favpng_f42061df40cdb73b1d904d0e56e02861 1.png" },
  { name: "Anthropic", src: "/global page assets/anthropic-com-logo-removebg-preview 1.png" },
  { name: "LangChain", src: "/global page assets/Langchain--Streamline-Simple-Icons 1.png" },
  { name: "Supabase", src: "/global page assets/icons8-supabase-48 1.png" },
  { name: "Firebase", src: "/global page assets/firebase 1.png" },
];

export default function GlobalTechStack() {
  return (
    <section className="bg-[#fcfcfc] py-20 overflow-hidden font-sans">
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-8">
        
        {/* Industries Bar */}
        <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-5 flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-24 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-3 shrink-0 lg:pl-2">
             <Image src="/global page assets/industries.png" alt="Building" width={22} height={22} className="object-contain" />
             <span className="font-bold text-gray-800 text-[15px]">Industries</span>
          </div>
          <div className="flex flex-row flex-nowrap lg:flex-wrap items-center gap-2">
             {industries.map((industry, i) => (
                <div key={i} className="px-5 py-2.5 bg-[#F9F9F9] hover:bg-gray-100 transition-colors rounded-full text-[13px] font-medium text-gray-600 whitespace-nowrap">
                  {industry}
                </div>
             ))}
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="text-center mb-16 flex flex-col items-center">
          <p className="flex items-center justify-center gap-3 text-xs font-bold tracking-[0.2em] uppercase text-gray-600 mb-4">
             <span className="w-12 h-px bg-gray-400" />
             Technology
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-black tracking-tight leading-tight">
            Built with the <br className="sm:hidden" />
            <span className="text-black">world's </span>
            <span className="text-[#E5231B]">best tools.</span>
          </h2>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-5 justify-center">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="bg-white rounded-[1.25rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex flex-col items-center justify-center p-5 pb-4 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="h-10 w-full flex items-center justify-center mb-4">
                <Image src={tech.src} alt={tech.name} width={40} height={40} className="max-h-full max-w-full object-contain" />
              </div>
              <span className="text-[12px] font-semibold text-gray-700">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
