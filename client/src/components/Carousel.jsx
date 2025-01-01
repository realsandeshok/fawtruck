'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from "framer-motion";

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [banners, setBanners] = useState([]);

  // Fetch banners from the API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/banner');
        const data = await response.json();
        setBanners(data.banners); // Set banners in state
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  if (banners.length === 0) {
    return <div>Loading...</div>; // Show a loading indicator while fetching
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full h-[500px] sm:h-[700px] overflow-hidden rounded-br-[50px] md:rounded-br-[120px]">
        {banners.map((banner, index) => (
          <img
            key={banner.id}
            src={banner.image_url}
            alt={banner.file_name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              currentIndex === index ? 'opacity-100 z-10' : 'opacity-0'
            }`}
          />
        ))}

        {/* Previous Button */}
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-500/50 hover:bg-gray-500 p-2 sm:p-3 rounded-full flex items-center justify-center z-20"
          onClick={prevSlide}
          style={{ zIndex: 20 }}
        >
          <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-gray-800" />
        </button>

        {/* Next Button */}
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-500/50 hover:bg-gray-500 p-2 sm:p-3 rounded-full flex items-center justify-center z-20"
          onClick={nextSlide}
          style={{ zIndex: 20 }}
        >
          <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-gray-800" />
        </button>
      </div>
    </motion.div>
  );
}
