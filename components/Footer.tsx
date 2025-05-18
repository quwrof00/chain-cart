'use client'

import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-black/90 backdrop-blur-md border-t-2 border-indigo-500/50 py-8 mt-12 shadow-[0_0_20px_rgba(79,70,229,0.4)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <p className="text-white text-sm animate-[fade-in_1s_ease-out] [text-shadow:_0_0_6px_rgba(79,70,229,0.6)]">
            © 2025 ShopLogo. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/about"
              className="text-white hover:text-teal-400 transition-colors duration-300 [text-shadow:_0_0_6px_rgba(45,212,191,0.4)]"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-teal-400 transition-colors duration-300 [text-shadow:_0_0_6px_rgba(45,212,191,0.4)]"
            >
              Contact
            </Link>
            <Link
              href="/privacy-policy"
              className="text-white hover:text-teal-400 transition-colors duration-300 [text-shadow:_0_0_6px_rgba(45,212,191,0.4)]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white hover:text-teal-400 transition-colors duration-300 [text-shadow:_0_0_6px_rgba(45,212,191,0.4)]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer