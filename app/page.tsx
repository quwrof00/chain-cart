'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollToProducts, setScrollToProducts] = useState(false);

  //dummy products for the carousel
  const products = [
    { 
      name: 'Quantum Sneakers', 
      price: 89.99, 
      image: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Lightweight and responsive design for maximum performance' 
    },
    { 
      name: 'Nova Smartwatch', 
      price: 149.99, 
      image: 'https://images.unsplash.com/photo-1617625802912-cde586faf331?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Track your fitness goals with advanced health monitoring' 
    },
    { 
      name: 'Eclipse Backpack', 
      price: 69.99, 
      image: 'https://images.unsplash.com/photo-1622260614153-03223fb72052?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Durable construction with multiple compartments for organization' 
    },
  ];

  // Auto-scroll only when not hovering 
  useEffect(() => {
    if (isHovering) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [products.length, isHovering]);

  // Handle scroll to products section
  useEffect(() => {
    if (scrollToProducts) {
      document.getElementById('featured-products')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
      setScrollToProducts(false);
    }
  }, [scrollToProducts]);

  const goToSlide = (index:number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="bg-gray-900 text-white">
      {/* Full-screen Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0" 
        style={{
          background: `
            linear-gradient(to right, rgba(249, 115, 22, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(249, 115, 22, 0.1) 1px, transparent 1px),
            #111827
          `,
          backgroundSize: '40px 40px'
        }}
      ></div>
      
      <div className="relative px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
        <div className="w-full px-4 max-w-screen-xl mx-auto overflow-visible">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-500 animate-pulse kaushan-script leading-tight">
            Discover Your Style
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl">
          Explore our curated collection of premium products designed for modern living.
          Elevate your everyday experience with cutting-edge technology and stylish essentials.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link
          href="/products"
          className="px-10 py-4 text-xl bg-[#FB923C] hover:bg-[#F97316] text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_#F97316]">
            Shop Now
          </Link>
        </div>
      </div>
        
        {/* Animated down arrow */}
        <div 
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce hover:scale-110 transition-transform"
        onClick={() => setScrollToProducts(true)}>
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-12 w-12 text-orange-400 drop-shadow-[0_0_10px_rgba(255,165,0,0.4)]"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor">
            <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
      </div>

      </section>

      {/* Full-screen Featured Products */}
      <section id="featured-products" className="h-screen relative bg-gray-900 overflow-hidden">
        {/* Background with subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"></div>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 25px 25px, orange 2%, transparent 0%), radial-gradient(circle at 75px 75px, orange 2%, transparent 0%)',
          backgroundSize: '100px 100px'
        }}></div>
        
        <div className="relative h-full flex flex-col justify-center items-center px-6 py-12">
          <div className="w-full max-w-7xl flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold text-white mt-20">
                Featured <span className="text-orange-400">Products</span>
              </h2>
              <Link href="/products" className="text-orange-400 hover:text-orange-300 flex items-center mt-18">
                View All
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
          
          <div className="w-full max-w-7xl flex-1 flex items-center">
            <div 
              className="relative w-full h-full flex items-center"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="absolute inset-0 flex items-center">
                <div 
                  className="w-full h-3/4 flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {products.map((product, index) => (
                    <div key={index} className="min-w-full h-full flex justify-center">
                      <div className={`w-full max-w-5xl h-full bg-gradient-to-br ${
                        index === 0 ? 'from-orange-200 to-orange-400' : 'from-gray-800 to-gray-900'
                      } rounded-2xl overflow-hidden shadow-2xl border border-gray-800`}>
                        <div className="h-full flex flex-col md:flex-row">
                          <div className="md:w-1/2 h-1/2 md:h-full relative overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4">
                              <span className={`px-3 py-1 ${
                                index === 0 ? 'bg-orange-300 text-gray-900' : 'bg-orange-500 text-white'
                              } text-sm font-semibold rounded-full`}>
                                Featured
                              </span>
                            </div>
                          </div>
                          
                          <div className="md:w-1/2 h-1/2 md:h-full p-6 md:p-10 flex flex-col justify-center">
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{product.name}</h3>
                            <div className={`w-16 h-1 ${
                              index === 0 ? 'bg-orange-300' : 'bg-orange-500'
                            } mb-6`}></div>
                            <p className="text-xl text-gray-200 mb-8">{product.description}</p>
                            
                            <div className="mt-auto">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <span className={`text-3xl font-bold ${
                                  index === 0 ? 'text-orange-300' : 'text-orange-400'
                                }`}>${product.price.toFixed(2)}</span>
                                <button className={`px-8 py-3 ${
                                  index === 0 ? 'bg-orange-300 hover:bg-orange-400 text-gray-900' : 'bg-orange-500 hover:bg-orange-600 text-white'
                                } font-semibold rounded-full transition-colors shadow-lg shadow-orange-800/20`}>
                                  Add to Cart
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation buttons */}
              <button 
                onClick={() => goToSlide((currentIndex - 1 + products.length) % products.length)}
                className="absolute left-4 z-10 w-12 h-12 rounded-full bg-gray-800/80 hover:bg-gray-700 flex items-center justify-center transition-colors text-white"
                aria-label="Previous product"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={() => goToSlide((currentIndex + 1) % products.length)}
                className="absolute right-4 z-10 w-12 h-12 rounded-full bg-gray-800/80 hover:bg-gray-700 flex items-center justify-center transition-colors text-white"
                aria-label="Next product"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Carousel indicators */}
          <div className="mt-8 flex justify-center space-x-3">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 w-3 rounded-full transition-all ${
                  currentIndex === index 
                    ? 'bg-orange-500 w-10' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}