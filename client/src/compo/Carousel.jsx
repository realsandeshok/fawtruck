'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import frame147 from '../assets/Frame 147.png'
import { motion } from "framer-motion";


export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 3) // Assuming 3 images
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + 3) % 3) // Assuming 3 images
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
    <div className="relative w-full h-[500px] sm:h-[700px] overflow-hidden rounded-br-[50px] md:rounded-br-[120px]">
      {/* First Image */}
      <img
        src={frame147}
        alt="Slide 1"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${currentIndex === 0 ? 'opacity-100 z-10' : 'opacity-0'
          }`}
      />

      {/* Second Image */}
      <img
        src="https://content.presspage.com/uploads/2794/cd9c0529-3c59-4733-a8e9-6529ab3e22e3/1920_24dt173-060.jpg?10000"
        alt="Slide 2"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${currentIndex === 1 ? 'opacity-100 z-10' : 'opacity-0'
          }`}
      />

      {/* Third Image */}
      <img
        src="https://media.istockphoto.com/id/521832517/photo/trucks-loading-unloading-at-warehouse.jpg?s=612x612&w=0&k=20&c=u2OgwcHBzmI3H7zZkJ2rZLr51gq8aFdHan-_9rS2Xus="
        alt="Slide 3"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${currentIndex === 2 ? 'opacity-100 z-10' : 'opacity-0'
          }`}
      />

      {/* Previous Button */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-500/50 hover:bg-gray-500 p-2 sm:p-3 rounded-full flex items-center justify-center z-20"
        onClick={prevSlide}
        style={{ zIndex: 20 }}
      >
        <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-gray-800" />
        <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-gray-800" />
      </button>

      {/* Next Button */}
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-500/50 hover:bg-gray-500 p-2 sm:p-3 rounded-full flex items-center justify-center z-20"
        onClick={nextSlide}
        style={{ zIndex: 20 }}
      >
        <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-gray-800" />
        <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-gray-800" />
      </button>
    </div>

    </motion.div>
  )
}
