import React from "react";
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
  Frame,
} from "lucide-react";
import { useState, useEffect } from "react";
import img1 from "../assets/img1.png";
import logo2 from "../assets/logo2.png";
import img2 from "../assets/Frame.png";

function Footer({language}) {
  // const [language, setLanguage] = useState("en"); // Default to English
  // useEffect(() => {
  //   const currentPath = window.location.pathname; // Example: "/ar" for Arabic
  //   setLanguage(currentPath.includes("/ar") ? "ar" : "en");
  // }, []);

  return (
    <>
      {language === "en" ? (
        <div>
          <footer className="bg-blue-900 text-white py-10">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Company Logos */}
                <div className="flex flex-col items-center md:items-start space-y-6 md:ml-10">
                  {/* First Logo */}
                  <img
                    src={img1}
                    alt="Company Logo 1"
                    className="w-48 h-auto" // Increased size with width
                  />
                  {/* Second Logo */}
                  <img
                    src={logo2}
                    alt="Company Logo 2"
                    className="w-48 h-auto" // Increased size with width
                  />
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col items-center md:items-start">
                  <h3 className="font-bold text-lg mb-4">Sections</h3>
                  <a href="#" className="hover:text-gray-300 mb-2">
                    Home
                  </a>
                  <a href="#" className="hover:text-gray-300 mb-2">
                    Models
                  </a>
                  <a href="#" className="hover:text-gray-300 mb-2">
                    About
                  </a>
                  <a href="#" className="hover:text-gray-300 mb-2">
                    Contact
                  </a>
                </div>

                {/* Company Info */}
                <div className="flex flex-col items-center md:items-start">
                  <h3 className="font-bold text-lg mb-4">Contacts</h3>
                  <p className="mb-2">rasheed.hassan@fakhro.com</p>
                  <p className="mb-2">+966 55 280 3657</p>
                  <p className="mb-2">
                    313, Dahiyah King Fahd, Dammam 32314, Saudi Arabia
                  </p>
                  <p className="mb-2">Sun - Thu : 08:00 AM - 05:00 PM</p>
                </div>

                {/* Social Links */}
                <div className="flex flex-col items-center justify-center gap-4">
                  <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold">
                    Follow Us
                  </h1>
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
                  <a
                    href="https://wa.me/1234567890" // Replace with your WhatsApp number in the format wa.me/<number>
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-4 right-4 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center hover:bg-green-600 text-white rounded-full transition-all shadow-lg"
                  >
                    <img
                      src={img2}
                      alt="WhatsApp Logo"
                      className="h-8 md:h-10 lg:h-12"
                    />
                  </a>
                </div>
              </div>
            </div>
          </footer>

          <footer className="bg-black text-white py-4">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-center">
                ©2024 Al Shamel Commercial Vehicle Company
              </p>
              <a
                href="#"
                className="text-sm underline hover:no-underline text-center"
                title="Privacy Policy"
              >
                Privacy Policy
              </a>
              <p className="text-sm text-center">Cookies</p>
            </div>
          </footer>
        </div>
      ) : (
        <div>
          <footer className="bg-blue-900 text-white py-10">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Social Links */}
                <div className="flex flex-col items-center justify-center gap-4">
                  <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold">
                    تابعنا
                  </h1>
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
                  <a
                    href="https://wa.me/1234567890" // Replace with your WhatsApp number in the format wa.me/<number>
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-4 right-4 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center hover:bg-green-600 text-white rounded-full transition-all shadow-lg"
                  >
                    <img
                      src={img2}
                      alt="WhatsApp Logo"
                      className="h-8 md:h-10 lg:h-12"
                    />
                  </a>
                </div>

                {/* Company Info */}
                <div className="flex flex-col items-center md:items-end">
                  <h3 className="font-bold text-lg mb-4">جهات الاتصال</h3>
                  <p className="mb-2">rasheed.hassan@fakhro.com</p>
                  <p className="mb-2">+966 55 280 3657</p>
                  <p className="mb-2 text-right">
                    313, ضاحية الملك فهد, الدمام 32314, المملكة العربية السعودية
                  </p>
                  <p className="mb-2">
                    من الأحد إلى الخميس: 08:00 صباحًا - 05:00 مساءً
                  </p>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col items-center md:items-end">
                  <h3 className="font-bold text-lg mb-4 text-right">الأقسام</h3>
                  <a href="#" className="hover:text-gray-300 mb-2 text-right">
                    الرئيسية
                  </a>
                  <a href="#" className="hover:text-gray-300 mb-2 text-right">
                    النماذج
                  </a>
                  <a href="#" className="hover:text-gray-300 mb-2 text-right">
                    من نحن
                  </a>
                  <a href="#" className="hover:text-gray-300 mb-2 text-right">
                    اتصل
                  </a>
                </div>

                {/* Company Logos */}
                <div className="flex flex-col items-center md:items-start space-y-6 md:ml-10">
                  {/* First Logo */}
                  <img
                    src={img1}
                    alt="Company Logo 1"
                    className="w-48 h-auto" // Increased size with width
                  />
                  {/* Second Logo */}
                  <img
                    src={logo2}
                    alt="Company Logo 2"
                    className="w-48 h-auto" // Increased size with width
                  />
                </div>
              </div>
            </div>
          </footer>

          <footer className="bg-black text-white py-4">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-center">
                ©2024 شركة الشامل للمركبات التجارية
              </p>
              <a
                href="#"
                className="text-sm underline hover:no-underline text-center"
                title="Privacy Policy"
              >
                سياسة الخصوصية
              </a>
              <p className="text-sm text-center">الكوكيز</p>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}

export default Footer;
