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
// import img2 from '../assets/Frame.png'
import React from "react";
import { useState, useEffect } from "react";
import Contact from "./Contact";
import TruckModels from "./TruckModels";


// FOOTER AND CONTACT FULL 

export default function Home() {
  const [language, setLanguage] = useState('en'); // Manage state here

  useEffect(() => {
    const currentPath = window.location.pathname; // Check current path
    setLanguage(currentPath.includes('/ar') ? 'ar' : 'en'); // Determine language
  }, []);


  // useEffect(() => {
  //   const fetchTruckModels = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/api/trucks");
  //       const data = await response.json();
  //       if (data.trucks) {
  //         console.log(data.trucks);
  //         setTruckModels(data.trucks); // Set the fetched data to state
  //       }
  //     } catch (error) {
  //       console.error("Error fetching truck models:", error);
  //     }
  //   };

  //   fetchTruckModels();
  // }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section with carousel */}
      <section
        id="Home"
        className="relative  from-blue-900 to-blue-700 text-white "
      >
        <div>Hii</div>
        <Navbar language={language} setLanguage={setLanguage}/>
        <Carousel className="" />
        {/* Overlay for better text visibility */}
      </section>

      {/* Truck Models Section */}
      <TruckModels language={language}/>

      {/* About Us Section */}
      <About id="About" language={language}/>

      {/* Contact Section */}
      <Contact id="Contact" language={language}/>

      {/* Map section */}
      <Map />

      {/* Footer */}
      <Footer language={language}/>
    </main>
  );
}
