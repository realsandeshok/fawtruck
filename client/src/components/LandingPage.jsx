import {
  Facebook,
  Instagram,
  // Twitter,
  Youtube,
  // MapPin,
  // Mail,
  // Clock,
  // Phone,
  // PhoneIcon as WhatsApp,
} from "lucide-react";
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"

import { Navbar } from "./Navbar";
import { Carousel } from "./Carousel";

// import img1 from '../assets/img1.png';
// import logo2 from '../assets/logo2.png';
import About from "./About";
import Footer from "./Footer";
import Map from "./Map";
import TruckModelsCarousel from "./TruckModelsCarousel";
import { useInView } from "react-intersection-observer";
// import img2 from '../assets/Frame.png'
import React from "react";
import { useState, useEffect, useRef } from "react";
import Contact from "./Contact";


// FOOTER AND CONTACT FULL 

export default function Home() {
  const [truckModels, setTruckModels] = useState([]);
  const [language, setLanguage] = useState("en"); // Default to English
  useEffect(() => {
    const currentPath = window.location.pathname; // Example: "/ar" for Arabic
    setLanguage(currentPath.includes("/ar") ? "ar" : "en");
  }, []);

  // Left side (Contact form) animation
  const { ref: leftRef, inView: leftInView } = useInView({
    triggerOnce: false, // Trigger the animation every time it comes into view
  });

  // Right side (Info) animation
  const { ref: rightRef, inView: rightInView } = useInView({
    triggerOnce: false,
  });

  const [inView, setInView] = useState(false);
  const lefttRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger animation on entering or leaving the viewport
        if (entry.isIntersecting) {
          setInView(true); // When the element comes into view, trigger animation
        } else {
          setInView(false); // When the element goes out of view, reset animation
        }
      },
      { threshold: 0.1 } // Trigger animation when 10% of the element is visible
    );

    if (leftRef.current) {
      observer.observe(leftRef.current);
    }

    return () => {
      if (leftRef.current) {
        observer.unobserve(leftRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchTruckModels = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/trucks");
        const data = await response.json();
        if (data.trucks) {
          console.log(data.trucks);
          setTruckModels(data.trucks); // Set the fetched data to state
        }
      } catch (error) {
        console.error("Error fetching truck models:", error);
      }
    };

    fetchTruckModels();
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section with carousel */}
      <section
        id="Home"
        className="relative  from-blue-900 to-blue-700 text-white "
      >
        <Navbar />
        <Carousel className="" />
        {/* Overlay for better text visibility */}
      </section>

      {/* Truck Models Section */}
      <section id="Models" className="py-12 px-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Title with Horizontal Lines */}
          <div className="flex items-center justify-center mb-12">
            <div className="h-px w-1/5 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            <h2 className="text-center text-3xl font-bold mx-4">
              {language === "en" ? "Truck Models" : "نماذج الشاحنات"}
            </h2>
            <div className="h-px w-1/5 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
          </div>
          <p className="text-center text-black text-sm md:text-lg lg:text-xl leading-relaxed md:leading-loose mb-4 md:mb-6 lg:mb-8 px-4 md:px-16 lg:px-20">
            {language === "en"
              ? "Automotive enterprise with the largest sales volume in the world"
              : "شركة السيارات التي تمتلك أكبر حجم مبيعات في العالم"}
          </p>

          {/* Truck Models Grid (Visible only on desktop and larger) */}
          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {truckModels.map((truck) => (
              <div
                key={truck.id}
                className="relative bg-gray-900 rounded-lg overflow-hidden group"
              >
                {/* Dimmed Image */}
                <img
                  src={truck.image_url}
                  alt={language === "en" ? truck.truck_name : truck.truck_name}
                  className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Overlay for Dimming */}
                <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-30 transition-all duration-300"></div>
                {/* Text on Image */}
                <h3 className="absolute inset-x-0 bottom-4 text-center text-white text-lg font-semibold">
                  {language === "en" ? truck.truck_name : truck.truck_name}
                </h3>
              </div>
            ))}
          </div>

          {/* Truck Models Carousel (Visible only on mobile view) */}
          <div className="md:hidden">
            <TruckModelsCarousel
              truckModels={truckModels}
              language={language}
            />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <About id="About" />

      {/* Contact Section */}
      <Contact id="Contact" />

      {/* Map section */}
      <Map />

      {/* Footer */}
      <Footer />
    </main>
  );
}
