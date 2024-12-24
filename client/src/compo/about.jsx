import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import MyImage from "../assets/1.png"; // Adjust the path as needed

function About() {
  // State to store fetched data
  const [aboutData, setAboutData] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/about");
        const data = await response.json();
        if (data.about && data.about.length > 0) {
          setAboutData(data.about[0]); // Assuming you want the first item
        }
      } catch (error) {
        console.error("Failed to fetch about data:", error);
      }
    };

    fetchAboutData();
  }, []);

  // Animation variants
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Refs and Hooks for controlling animations
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: false });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  return (
    <div>
      <section
        id="About"
        className="py-40 bg-gray-100 relative bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `url('https://s3-alpha-sig.figma.com/img/dc56/57b7/b07aed81b1591546102e48ee2f630480?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hue1hbySbfv6EL3jinz~vpMemW8ZuMr9Leo4aqRM~j0-rLiOG7D-DGtXGCYZtt4oc~P4xheREGPj~Vjk-5c3J8IOpEahGaRnTE~fLx~yyhTLPD-pY5HsD~-GsXR-hLzwPOd~Sf~20FP0QzMnhn8h5tC~zJTQ3-4OzDjm-LVXAn8oj9YT1JJDbaFS~xIM3XmWXgQy-q1PXB5qWV0hVeQ1HRspdAzTzOM93w8qJQEJit8LtNd3UhK-JsL08tQFUGdna2TBu1HaXC~ytm8pxElTRxo5Fr02v6eWxdbVjNX0n3LJxxEFjGN8C1rLz7mOY2IgfBsSIEqMoQlTT8H541uGFg__')`,
        }}
      >
        {/* Overlay for dimming background */}
        <div className="absolute inset-0 bg-black opacity-80 z-0"></div>

        {/* Green Div - Reduced size on small screens */}
        <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-green-800 md:w-[150px] md:h-[150px] md:top-0 md:right-0 z-30"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Main Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
            {/* Left Section with Image */}
            <motion.div
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={fadeInUpVariant}
              className="mx-auto"
            >
              <img
                src={MyImage}
                alt="Foton Trucks - High Energy Sales"
                width={500}
                height={200}
                className="rounded-lg"
              />
            </motion.div>

            {/* Right Section */}
            <motion.div
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={fadeInUpVariant}
              className="mx-w-[500px]"
            >
              <h2 className="text-left text-3xl font-bold mb-2 text-white">
                About Us
              </h2>
              {/* Title */}
              <p className="text-left text-gray-200 mb-2 pb-4">
                {aboutData ? aboutData.title : "Loading..."}
              </p>

              {/* White Div - Hidden on small screens */}
              <div className="w-[50px] h-[50px] bg-white absolute right-[10%] top-[15%] z-10 hidden md:block"></div>

              <hr className="w-[190px] h-[4px] bg-gray-300 border-r-2" />
              {/* Description */}
              <p className="text-gray-200 w-[80%] my-5">
                {aboutData ? aboutData.description : "Fetching description..."}
              </p>

              {/* White Div - Hidden on small screens */}
              <div className="w-[50px] h-[50px] bg-white absolute right-[10%] top-[15%] z-10 hidden md:block"></div>

              {/* <hr className="w-[190px] h-[4px] bg-gray-300 border-r-2" /> */}
              <button className="px-4 py-2 mt-4 bg-white text-blue-500 rounded-lg hover:bg-blue-700 hover:text-white transition duration-300">
                Read More
              </button>
            </motion.div>
          </div>

          {/* Blue Div - Bottom left corner */}
          <div className="absolute -bottom-40 left-0 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] bg-blue-900 z-10"></div>
        </div>
      </section>
    </div>
  );
}

export default About;
