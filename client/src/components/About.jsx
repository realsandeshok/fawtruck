import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import MyImage from "../assets/1.png"; // Adjust the path as needed
import { AboutContent } from "../api/api";

function About({language}) {
  const [aboutData, setAboutData] = useState(null);
  // const [language, setLanguage] = useState("en"); // Default to English

  // // Detect language from URL
  // useEffect(() => {
  //   const currentPath = window.location.pathname; // Example: "/ar" for Arabic
  //   setLanguage(currentPath.includes("/ar") ? "ar" : "en");
  // }, []);

  // Fetch data from API
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(AboutContent);
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

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

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
    <>
      {language === "en" ? (
        <div>
          <section
            id="About"
            className="py-[5rem] bg-gray-100 relative bg-fixed bg-cover bg-center"
            style={{
              backgroundImage: `url('https://s3-alpha-sig.figma.com/img/dc56/57b7/b07aed81b1591546102e48ee2f630480?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hue1hbySbfv6EL3jinz~vpMemW8ZuMr9Leo4aqRM~j0-rLiOG7D-DGtXGCYZtt4oc~P4xheREGPj~Vjk-5c3J8IOpEahGaRnTE~fLx~yyhTLPD-pY5HsD~-GsXR-hLzwPOd~Sf~20FP0QzMnhn8h5tC~zJTQ3-4OzDjm-LVXAn8oj9YT1JJDbaFS~xIM3XmWXgQy-q1PXB5qWV0hVeQ1HRspdAzTzOM93w8qJQEJit8LtNd3UhK-JsL08tQFUGdna2TBu1HaXC~ytm8pxElTRxo5Fr02v6eWxdbVjNX0n3LJxxEFjGN8C1rLz7mOY2IgfBsSIEqMoQlTT8H541uGFg__')`,
            }}
          >
            <div className="absolute inset-0 bg-black opacity-80 z-0"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
                {/* PHOTO */}
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

                {/* CONTENT */}
                <motion.div
                  ref={ref}
                  initial="hidden"
                  animate={controls}
                  variants={fadeInUpVariant}
                  className="mx-w-[500px]"
                >
                  <h2 className="text-left text-3xl font-bold mb-2 text-white font-oswald">
                    About Us
                  </h2>
                  <p className="text-left text-gray-200 mb-2 pb-4">
                    {aboutData ? aboutData.title : "Loading..."}
                  </p>

                  <hr className="w-[190px] h-[4px] bg-gray-300 border-r-2" />
                  <p className="text-gray-200 w-[80%] my-5">
                    {aboutData
                      ? aboutData.description
                      : "Fetching description..."}
                  </p>

                  <button className="px-4 py-2 mt-4 bg-white text-blue-500 rounded-lg hover:bg-blue-700 hover:text-white transition duration-300">
                    Read More
                  </button>
                </motion.div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div>
          <section
            id="About"
            className="py-[5rem] bg-gray-100 relative bg-fixed bg-cover bg-center"
            style={{
              backgroundImage: `url('https://s3-alpha-sig.figma.com/img/dc56/57b7/b07aed81b1591546102e48ee2f630480?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hue1hbySbfv6EL3jinz~vpMemW8ZuMr9Leo4aqRM~j0-rLiOG7D-DGtXGCYZtt4oc~P4xheREGPj~Vjk-5c3J8IOpEahGaRnTE~fLx~yyhTLPD-pY5HsD~-GsXR-hLzwPOd~Sf~20FP0QzMnhn8h5tC~zJTQ3-4OzDjm-LVXAn8oj9YT1JJDbaFS~xIM3XmWXgQy-q1PXB5qWV0hVeQ1HRspdAzTzOM93w8qJQEJit8LtNd3UhK-JsL08tQFUGdna2TBu1HaXC~ytm8pxElTRxo5Fr02v6eWxdbVjNX0n3LJxxEFjGN8C1rLz7mOY2IgfBsSIEqMoQlTT8H541uGFg__')`,
            }}
          >
            <div className="absolute inset-0 bg-black opacity-80 z-0"></div>
            <div className="container relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
                {/* CONTENT */}
                <motion.div
                  ref={ref}
                  initial="hidden"
                  animate={controls}
                  variants={fadeInUpVariant}
                  className="mx-w-[500px]"
                >
                  <div className="ml-[15%] mr-[5%] text-right">
                    <h2 className="text-3xl font-bold mb-2 text-white">
                      معلومات عنا
                    </h2>
                    <p className="text-gray-200 mb-2 pb-4">
                      {aboutData ? aboutData.title_ar : "Loading..."}
                    </p>
                    <hr className="w-[190px] h-[4px] bg-gray-300 border-r-2 ml-auto" />
                    <p className="text-gray-200 my-5">
                      {aboutData
                        ? aboutData.description_ar
                        : "Fetching description..."}
                    </p>
                    <button className="px-4 py-2 mt-4 bg-white text-blue-500 rounded-lg hover:bg-blue-700 hover:text-white transition duration-300 ml-auto block">
                      اقرأ أكثر
                    </button>
                  </div>
                </motion.div>

                {/* PHOTO */}
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
                    className="rounded-lg px-8 md:px-0 md:pr-4"
                  />
                </motion.div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default About;
