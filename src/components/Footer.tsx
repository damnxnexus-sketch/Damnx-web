'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mail, Instagram, Linkedin, Phone } from 'lucide-react';
import LaserFlow from './LaserFlow';

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10 text-white overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <LaserFlow
          color="#dc2626"
          flowSpeed={0.3}
          fogIntensity={0.3}
          horizontalBeamOffset={0}
          verticalBeamOffset={-0.45}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Logo & Description */}
          <div className="space-y-4">
            <Image
              src="/logo.png"
              alt="DAMNX Solutions Logo"
              width={160}
              height={50}
              className="object-contain"
            />
            <p className="text-white/60 text-sm leading-relaxed">
              DAMNX Solutions delivers industry-level software, premium design,
              and scalable digital products at a genuine price.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Services
            </h4>
            <ul className="space-y-3 text-white/60 text-sm">
              <li>Website Development</li>
              <li>App Development</li>
              <li>UI / UX & Branding</li>
              <li>Custom Software</li>
              <li>Digital Marketing</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Contact
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 text-white/70">
                <Mail className="w-4 h-4 text-red-600" />
                <a
                  href="mailto:contact@damnxsolutions.com"
                  className="hover:text-white transition"
                >
                  damnx.nexus@gmail.com
                </a>
              </li>

              <li className="flex items-center gap-3 text-white/70">
                <Phone className="w-4 h-4 text-red-600" />
                <span>+91 6388037374</span>
              </li>
            </ul>
          </div>

          {/* Social & CTA */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">
                Follow Us
              </h4>
              <div className="flex gap-4">
                <Link
                  href="https://www.instagram.com/damnx_solutions?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  className="p-3 rounded-full bg-white/5 hover:bg-red-600 transition"
                >
                  <Instagram className="w-5 h-5" />
                </Link>

                <Link
                  href="linkedin.com/in/damnx-solutions-280b3938b"
                  target="_blank"
                  className="p-3 rounded-full bg-white/5 hover:bg-red-600 transition"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-block mt-8 px-6 py-3 text-sm font-medium rounded-full border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
            >
              Let’s Build Something
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-white/50">
          <span>
            © {new Date().getFullYear()} DAMNX Solutions. All rights reserved.
          </span>
          <span className="mt-2 md:mt-0">
            Crafted with precision & passion.
          </span>
        </div>
      </div>
    </footer>
  );
}
