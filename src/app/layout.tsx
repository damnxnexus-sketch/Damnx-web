import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChatProvider } from './context/ChatContext';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://damnx.co.in'),
  title: {
    default: "DamnX - Best Website & Software Development Company in India | Custom Web Solutions",
    template: "%s | DamnX - Leading Software Development Company"
  },
  description: "DamnX is India's premier website and software development company, delivering cutting-edge web applications, mobile apps, and enterprise software solutions. Expert team specializing in React, Next.js, AI integration, and scalable cloud architecture.",
  keywords: [
    "best website development company",
    "best software development company",
    "web development company India",
    "custom software development",
    "React development company",
    "Next.js development",
    "mobile app development",
    "enterprise software solutions",
    "AI-powered applications",
    "cloud software development",
    "full-stack development company",
    "UI/UX design services",
    "e-commerce development",
    "SaaS development company",
    "DamnX",
  ],
  authors: [{ name: "DamnX Development Team" }],
  creator: "DamnX",
  publisher: "DamnX",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://damnx.co.in",
    siteName: "DamnX - Best Software Development Company",
    title: "DamnX - Leading Website & Software Development Company in India",
    description: "Transform your business with DamnX - India's top-rated software development company. We build high-performance web applications, mobile apps, and enterprise solutions using cutting-edge technologies.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DamnX - Best Website & Software Development Company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DamnX - Best Website & Software Development Company in India",
    description: "Leading software development company specializing in custom web applications, mobile apps, and enterprise solutions. Expert React, Next.js, and AI development.",
    images: ["/twitter-image.jpg"],
    creator: "@damnx",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://damnx.co.in",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#000000" />
        
        {/* Geo Targeting */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        
        {/* Business Schema - Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "DamnX",
              "url": "https://damnx.co.in",
              "logo": "https://damnx.co.in/logo.png",
              "description": "Leading website and software development company in India, specializing in custom web applications, mobile apps, and enterprise solutions.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "availableLanguage": ["English", "Hindi"]
              },
              "sameAs": [
                "https://www.linkedin.com/company/damnx",
                "https://twitter.com/damnx",
                "https://github.com/damnx"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "150"
              }
            })
          }}
        />
        
        {/* Professional Service Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "DamnX - Software Development Company",
              "image": "https://damnx.co.in/logo.png",
              "url": "https://damnx.co.in",
              "telephone": "+91-6388037374",
              "priceRange": "$100-$25000",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "28.6139",
                "longitude": "77.2090"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              }
            })
          }}
        />
        
        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Damnx Solutions",
              "url": "https://damnx.co.in",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://damnx.co.in/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <ChatProvider>
          {children}
        </ChatProvider>
      </body>
    </html>
  );
}