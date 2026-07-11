import React from 'react';

// Define the type for our FAQ items to ensure strict type safety
interface FAQItem {
    id: number;
    question: string;
}

// Data array for the frequently asked questions
const faqData: FAQItem[] = [
    {
        id: 1,
        question: "What is app development?"
    },
    {
        id: 2,
        question: "What are the different types of app development?"
    },
    {
        id: 3,
        question: "What programming languages are commonly used in app development?"
    },
    {
        id: 4,
        question: "How long does it take to develop an app?"
    },
];

export default function FAQSection() {
    return (
        <section className="min-h-screen bg-black flex items-center justify-center px-4 py-20 font-sans">
            <div className="max-w-5xl w-full mx-auto flex flex-col items-center">

                {/* Top Label */}
                <div className="border border-[#e60000] text-[#e60000] text-xs font-semibold tracking-wider uppercase rounded-full px-6 py-2 mb-8">
                    Got Questions?
                </div>

                {/* Main Heading */}
                <h2 className="text-white text-4xl md:text-5xl font-bold text-center mb-4 tracking-tight">
                    Your Questions Answered <span className="text-[#e60000]">Instantly</span>
                </h2>

                {/* Subheading */}
                <p className="text-gray-400 text-center max-w-2xl mb-10 text-sm md:text-base leading-relaxed">
                    Browse through frequently asked questions or connect with our support<br className="hidden md:block" /> team for personalized assistance.
                </p>

                {/* Call to Action Button */}
                <button className="bg-[#e60000] hover:bg-red-700 transition-colors text-white font-semibold text-lg rounded-xl px-10 py-3.5 mb-16 shadow-lg shadow-red-900/20">
                    Get in Touch
                </button>

                {/* FAQ Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {faqData.map((faq) => (
                        <div
                            key={faq.id}
                            className="bg-[#141414] hover:bg-[#1a1a1a] transition-colors rounded-2xl p-6 md:p-8 flex items-center gap-6 group cursor-default"
                        >
                            {/* Number Indicator */}
                            <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full border border-[#e60000] text-[#e60000] font-medium text-lg">
                                {faq.id}
                            </div>

                            {/* Question Text */}
                            <p className="text-gray-200 text-base md:text-lg font-medium leading-snug">
                                {faq.question}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}