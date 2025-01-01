import { useState, useEffect } from "react";
import img1 from "../assets/img1.png"; // Ensure the correct path
import logo2 from "../assets/logo2.png"; // Ensure the correct path
import { Link } from "react-scroll";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("en"); // Default language: English
  useEffect(() => {
    const currentPath = window.location.pathname; // Example: "/ar" for Arabic
    setLanguage(currentPath.includes("/ar") ? "ar" : "en");
  }, []);

  return (
    <>
      {language === "en" ? (
        <nav className="absolute top-0 left-1/2 justify-center transform -translate-x-1/2 w-[90%] h-[75px] bg-[#00308F] shadow-md z-20 rounded-bl-lg rounded-br-lg">
          <div className="container mx-auto max-w-screen-xl px-4 lg:px-8 py-2 flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center ">
              <img src={img1} alt="Logo 1" className="h-10 md:h-14" />
              <img src={logo2} alt="Logo 2" className="h-7 md:h-6 w-auto" />
            </div>

            {/* Hamburger Menu for Mobile */}
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>

            {/* Navbar Links */}
            <ul
              className={`md:flex md:space-x-4 md:items-center absolute md:static top-[60px] left-0 w-full md:w-auto bg-[#00308F] md:bg-transparent transition-all duration-300 ease-in-out ${
                isMenuOpen ? "block" : "hidden"
              } ${language === "ar" ? "text-right" : ""}`}
            >
              <li className="flex justify-center items-center border-b border-gray-700 md:border-none">
                <Link
                  to="Home"
                  smooth={true}
                  duration={500}
                  className="block px-4 py-2 text-white hover:bg-white rounded-lg hover:text-black transition text-sm md:text-base"
                >
                  Home
                </Link>
              </li>
              <li className="flex justify-center items-center border-b border-gray-700 md:border-none">
                <Link
                  to="Models"
                  smooth={true}
                  duration={500}
                  className="block px-4 py-2 text-white hover:bg-white rounded-lg hover:text-black transition text-sm md:text-base"
                >
                  Models
                </Link>
              </li>
              <li className="flex justify-center items-center border-b border-gray-700 md:border-none">
                <Link
                  to="About"
                  smooth={true}
                  duration={500}
                  className="block px-4 py-2 text-white hover:bg-white rounded-lg hover:text-black transition text-sm md:text-base"
                >
                  About
                </Link>
              </li>
              <li className="flex justify-center items-center border-b border-gray-700 md:border-none">
                <Link
                  to="Contact"
                  smooth={true}
                  duration={500}
                  className="block px-4 py-2 text-white hover:bg-white rounded-lg hover:text-black transition text-sm md:text-base"
                >
                  Contact
                </Link>
              </li>
              <li className="flex justify-center items-center border-b border-gray-700 md:border-none">
                <Link
                  to="#"
                  smooth={true}
                  duration={500}
                  className="block px-4 py-2 text-white hover:text-black transition"
                >
                  <button className="px-3 py-1 bg-white text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm md:text-base">
                    Request A Call
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      ) : (
        <nav className="absolute top-0 left-1/2 justify-center transform -translate-x-1/2 w-[90%] h-[75px] bg-[#00308F] shadow-md z-20 rounded-bl-lg rounded-br-lg">
          <div className="container mx-auto max-w-screen-xl px-4 lg:px-8 py-2 flex items-center justify-between">
            {/* Navbar Links */}
            <ul
              className={`md:flex md:space-x-4 md:items-center absolute md:static top-[60px] left-0 w-full md:w-auto bg-[#00308F] md:bg-transparent transition-all duration-300 ease-in-out ${
                isMenuOpen ? "block" : "hidden"
              } ${language === "ar" ? "text-right" : ""}`}
            >
              <li className="flex justify-center items-center border-b border-gray-700 md:border-none">
                <Link
                  to="#"
                  smooth={true}
                  duration={500}
                  className="block px-4 py-2 text-white hover:text-black transition"
                >
                  <button className="px-3 py-1 bg-white text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm md:text-base">
                    طلب مكالمة
                  </button>
                </Link>
              </li>
              <li className="flex justify-center items-center border-b border-gray-700 md:border-none">
                <Link
                  to="Contact"
                  smooth={true}
                  duration={500}
                  className="block px-4 py-2 text-white hover:bg-white rounded-lg hover:text-black transition text-sm md:text-base"
                >
                  اتصل
                </Link>
              </li>
              <li className="flex justify-center items-center border-b border-gray-700 md:border-none">
                <Link
                  to="About"
                  smooth={true}
                  duration={500}
                  className="block px-4 py-2 text-white hover:bg-white rounded-lg hover:text-black transition text-sm md:text-base"
                >
                  حول
                </Link>
              </li>
              <li className="flex justify-center items-center border-b border-gray-700 md:border-none">
                <Link
                  to="Models"
                  smooth={true}
                  duration={500}
                  className="block px-4 py-2 text-white hover:bg-white rounded-lg hover:text-black transition text-sm md:text-base"
                >
                  {/* Models */}
                  النماذج
                </Link>
              </li>
              <li className="flex justify-center items-center border-b border-gray-700 md:border-none">
                <Link
                  to="Home"
                  smooth={true}
                  duration={500}
                  className="block px-4 py-2 text-white hover:bg-white rounded-lg hover:text-black transition text-sm md:text-base"
                >
                  {/* Home */}
                  الرئيسية
                </Link>
              </li>
            </ul>

            {/* Logo Section */}
            <div className="flex items-center ">
              <img src={img1} alt="Logo 1" className="h-10 md:h-14" />
              <img src={logo2} alt="Logo 2" className="h-7 md:h-6 w-auto" />
            </div>

            {/* Hamburger Menu for Mobile */}
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </nav>
      )}
    </>
  );
}
