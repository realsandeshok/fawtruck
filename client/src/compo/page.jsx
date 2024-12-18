import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Mail,
  Clock,
  Phone,
  PhoneIcon as WhatsApp,
} from "lucide-react";
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"

import { Navbar } from "./Navbar";
import { Carousel } from "./Carousel";

import img1 from '../assets/img1.png';
import logo2 from '../assets/logo2.png';
import About from "./about";
import Footer from "./footer";
import Map from "./map";
import TruckModelsCarousel from "./TruckModelsCarousel";
import { useInView } from 'react-intersection-observer';
import img2 from '../assets/Frame.png'
import React from 'react';
import { useState, useEffect, useRef } from 'react';


export default function Home() {
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

  return (
    <main className="min-h-screen">
      {/* Hero Section with carousel */}
      <section id="Home" className="relative  from-blue-900 to-blue-700 text-white ">
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
              Truck models
            </h2>
            <div className="h-px w-1/5 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
          </div>
          <p className="text-center text-black text-sm md:text-lg lg:text-xl leading-relaxed md:leading-loose mb-4 md:mb-6 lg:mb-8 px-4 md:px-16 lg:px-20">
            Automotive enterprise with the largest <br /> sales volume in the world
          </p>
          <a className='/Models'></a>
          {/* Truck Models Grid (Visible only on desktop and larger) */}
          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: "New Energy", image: "https://s3-alpha-sig.figma.com/img/bb55/6d3d/09d082e434fe93ad5f78bca9adb58e6f?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JqQcb963mTTZnguNqqYIN25plS-pjAc0Pdcl~W-4OTjK-HRSdxDgAAPfC4124N~LEAHwQ5secHGpg71UCbR9i-9idXkjLDzG6l8mBa-prqBlbyYWtCdY4jhvsBVsp1IzeYOmY5P~EUR0CeJ47JrT1YVFmv24FEfcqb2rDEzw0z62a8Xwz7PSc2KYsIXyftT7T6hN7OsbyaIj51p615wWqf-HwR8hyonsK-DgrleAEegcr8ARN1hVmtcucH02Eqi4FOiyHinfY9M7cPYI3tQz-GHUYUUjMGrbZgc3CnKkv7WxWMb1EgJp7kXGLJmVIrvBaylWorFOd2ugk78sjq71tw__" },
              { name: "Tractor", image: "https://s3-alpha-sig.figma.com/img/b8bc/0c04/8694280927d06f5fbc8cab3c66d7c9c7?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KQ9434S4YQZ03caUz97faRloxOa0Fldq5GU-T4OjDhUq~hvIO3Yc344o40qaj1VFnnRyhMhpxHInvvS62ZrLpYGsPglgYMA8bPo6I8N16UwJPCjTbM5COvDKXli4deZc7vEweUBcnX5wKMGuZpL6B3zyADX~vAl2I7bo7K7POPGdyQOfTfew9tMCMAKUH57ha0P-YKQ4pkEQkVCza2exUqUANmU3MjZxEpcIw5yQrMxhSslPXWATnECcFP1PJ7AzoAdYALSnai~P95Nxjs6cZQhLCTO2zimsuwUD152-Q9or9K7FPqiMWQwtdgC-Y11YDY2L66VMrr9M53PxjrzXXw__" },
              { name: "Rigid Truck", image: "https://s3-alpha-sig.figma.com/img/ba2c/cefb/3fbb68d389bcf2b5fe0727943a303568?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=plmsPOnO9eGXCah42RJdOGCDcmJi4e6SH2DpJDpju75ODiyFD6LH5tf9furlxRefEKA9NBzVvBXlPM-QCgjzg6gwOIIsL4FhsblVE9LZtVWQj8HB2hSLNUtOZxtr7svpLnLGCLiidJVRPOYq8UDH4ZWBZUhJgG6iogTD0WRnCwsRtrVa5QAIRCVrhioE7hm9R~rKPfF9N3l3Wm3sf0-aFfbUoJX7UJGTxwbsRD0yoRiqOZsDjiLgsj36gf3TRvbzo6CTPiqBjgb8IlugUkI4yr4z0D~i3FxPek67JmAaU5n39LjfRbQipv4ToYO~BcXAHGLxHf~3XW63l9SxByIITQ__" },
              { name: "Dump Truck", image: "https://s3-alpha-sig.figma.com/img/18ee/42a9/c5fb91a54fa08774ac4495ffa5e2a63f?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VWWS-t8NZlAv7aIk1IVrGQ6JdRhMhZA87vf3hvmszRv3uatdI9-Yve1KnVcuxzbHA2PBnIejWY5sbBkOnjJ5QrAhuu7ES-VZugN-TAFxu1d3kEkgYaEMXCUiBWLvZdZkQ7FXg6gXjeA4Y00ZdzX2LBQsK91YsFiOGlZToL00gnnNytc1yVB9WgsbcWi1dJ0cNssaCBIrEinEL7-AUotSalWALSihGpCGMiTDZpqgycseq7RgiINPKWghNpLGvSfJAe4Mn7svrbF9Vl8ReG9oIWTvinUfsvaT~k444RMElkwggwItefFVhCHXDN2K-lssLw1Zd11hAemGxFBEAmtBLA__" },
              { name: "Special Purpose", image: "https://s3-alpha-sig.figma.com/img/b64f/4ee6/b6e14dfa1c95bb4d169f1feb49a627f0?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eOPN8x76XvzFUyNTOgxHk1mhQBBkfGfRaHQw5OdSliQPQlpXTbv~pM3YTnfh2Ook-iu3mJUGQ6nNLlLBZ1nXVfyC9EyTSI375XQxtcAL7hZb-8FeGj2NgpAMR7HKG5mgpI8Z4KjzvfC62zfhPMFfbr~RTCLY~QrQevL91tJU5oW3NXqlmZ2Y6JVJVhbhIXlJjeOavLn9QwESFRkWp~QKU2IqlKgbXNd8klVPiSeDq7c7da-KxfieVFxwDEy2-yIvhfP~E~izzLVfJBOtj1yk6lweybHBtv~2JDws2pG7T~3VcfRYGtf-4xCjZbqfqKr9XT3uL7d9Q5KN7XnXRcdu~w__" },
            ].map((truck, index) => (
              <div
                key={index}
                className="relative bg-gray-900 rounded-lg overflow-hidden group"
              >
                {/* Dimmed Image */}
                <img
                  src={truck.image}
                  alt={truck.name}
                  className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Overlay for Dimming */}
                <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-30 transition-all duration-300"></div>
                {/* Text on Image */}
                <h3 className="absolute inset-x-0 bottom-4 text-center text-white text-lg font-semibold">
                  {truck.name}
                </h3>
              </div>
            ))}
          </div>

          {/* Truck Models Carousel (Visible only on mobile view) */}
          <div className="md:hidden">
            <TruckModelsCarousel
              items={[
                { name: "New Energy", image: "src/assets/t1.png" },
                { name: "Tractor", image: "my-app/src/assets/t2.png" },
                { name: "Rigid Truck", image: "my-app/src/assets/t3.png" },
                { name: "Dump Truck", image: "my-app/src/assets/t4.png" },
                { name: "Special Purpose", image: "my-app/src/assets/t5.png" },
              ]}
            />
          </div>
        </div>
      </section>


      {/* About Us Section */}
      <About id="About" />

      {/* Contact Section */}
      <section
        id="Contact"
        className="py-8 md:pl-8 bg-gradient-to-r from-white via-white to-blue-500"
      >
        <div className="container grid grid-cols-1 md:grid-cols-[2fr,3fr] gap-8">
          {/* Left Side - Contact Form */}
          <div
            ref={leftRef}
            className={`bg-white px-6 pb-6 md:px-8 md:pb-8 transform transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0' // Debugging: Keep it always visible
              }`}
            style={{ margin: '30px 0 30px 0px' }}
          >
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our contact experts will help you with the choice of transport and
              advice on issues of interest.
            </p>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Al Shamel Commercial Vehicles"
                className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none px-4 py-2"
              />
              <select className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none px-4 py-2">
                <option value="saudi-arabia">Saudi Arabia</option>
                <option value="uae">UAE</option>
                <option value="qatar">Qatar</option>
              </select>
              <div className="flex items-center gap-2">
                <span className="text-xl">🇸🇦</span>
                <input
                  type="tel"
                  placeholder="+966 55 280 3657"
                  className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none px-4 py-2"
                />
              </div>
              <textarea
                placeholder="Message"
                className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none px-4 py-2 h-24"
              ></textarea>
              <button className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800">
                SEND
              </button>
            </form>
          </div>


          {/* Right Side - Info Section */}
          <div
            ref={rightRef}
            className="bg-black text-white p-6 md:p-8 max-w-[500px] mx-auto"
            style={{ margin: '30px 0' }}
          >
            <h3 className="text-4xl font-bold">Info</h3>
            <div className="space-y-12 mt-6">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.94 3.87A8 8 0 0116.12 17.06l-1.4-1.4a2.4 2.4 0 00-3.4-3.4l-1.38 1.38a8.3 8.3 0 01-1.4-.84l-1.42-1.42a8.3 8.3 0 01-.84-1.4l1.38-1.38a2.4 2.4 0 00-3.4-3.4l-1.4-1.4z" />
                </svg>
                <span>rasheed.hassan@fakhro.com</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V3z" />
                </svg>
                <span>+966 55 280 3657</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
                </svg>
                <span>313, Dahiyah King Fahd, Dammam 32314, Saudi Arabia</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M4.6 3.6A2.6 2.6 0 012 6.2v7.6a2.6 2.6 0 012.6 2.6h7.6a2.6 2.6 0 012.6-2.6V6.2A2.6 2.6 0 0112.2 3.6H4.6z" />
                </svg>
                <span>Sun - Thu : 08:00 AM - 05:00 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Social Links */}
        <div className="flex flex-col items-end justify-end gap-4">
          <div className="flex flex-row lg:flex-row md:flex-col gap-4">
            <a
              href="#"
              className="w-10 h-10 lg:w-12 lg:h-12 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-all shadow-md"
            >
              <Instagram className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
            </a>
            <a
              href="#"
              className="w-10 h-10 lg:w-12 lg:h-12 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-all shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                className="w-5 h-5 md:w-6 md:h-6"
              >
                <circle cx="128" cy="128" r="128" fill="white" />
                <path
                  d="M197.4 68.4c1.7-6.4-1.7-9.4-8.1-7.4l-152 48.9c-5.9 1.9-6 5.3-1 6.9l38.8 12.9 15 47.3c1.8 5.8 3.5 6.7 7.5 6.7 4.7 0 6.8-1.7 9.4-4.1 1.6-1.4 11-10.7 21.5-21.5l44.8 33.2c8.3 4.6 14.4 2.2 16.5-7.8l26.7-126z"
                  fill="#0088cc"
                />
                <path
                  d="M103.5 154.3l2.2-30.2L167.5 98c2.7-1.9 5.3 0 3.6 3.1l-47.8 45.6-4.6 26.5c-.3 1.7-2.7 2-3.2.5z"
                  fill="#0088cc"
                />
                <path
                  d="M111.8 157.6l22.2-17.4 13.2 12.4c1.9 1.8.2 4.8-2.4 4.3l-31.9-5.4-1-5.7z"
                  fill="#0088cc"
                />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 lg:w-12 lg:h-12 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-all shadow-md"
            >
              <Facebook className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
            </a>
            <a
              href="#"
              className="w-10 h-10 lg:w-12 lg:h-12 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-all shadow-md"
            >
              <Youtube className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
            </a>


          </div>

        </div>

      </section>

      {/* map section */}
      <Map />

      {/* Footer */}
      <Footer />

    </main>
  );
}
