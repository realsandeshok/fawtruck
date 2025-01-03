import React from "react";
import { useState, useEffect } from "react";
import TruckModelsCarousel from "./TruckModelsCarousel";
import { TruckModel } from "../api/api";

const TruckModels = ({ language }) => {
  const [truckModels, setTruckModels] = useState([]);
  useEffect(() => {
    const fetchTruckModels = async () => {
      try {
        const response = await fetch(TruckModel);
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
    <>
      {language === "en" ? (
        <section id="Models" className="py-12 px-20 bg-white">
          <div className="container mx-auto px-4">
            {/* Title with Horizontal Lines */}
            <div className="flex items-center justify-center mb-12">
              <div className="h-px w-1/5 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
              <h2 className="text-center text-3xl font-bold mx-4">
                Truck Models
              </h2>
              <div className="h-px w-1/5 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            </div>
            <p className="text-center text-black text-sm md:text-lg lg:text-xl leading-relaxed md:leading-loose mb-4 md:mb-6 lg:mb-8 px-4 md:px-16 lg:px-20">
              Automotive enterprise with the largest sales volume in the world
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
                    alt={truck.truck_name}
                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Overlay for Dimming */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-30 transition-all duration-300"></div>
                  {/* Text on Image */}
                  <h3 className="absolute inset-x-0 bottom-4 text-center text-white text-lg font-semibold">
                    {truck.truck_name}
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
      ) : (
        <section id="Models" className="py-12 px-20 bg-white">
          <div className="container mx-auto px-4">
            {/* Title with Horizontal Lines */}
            <div className="flex items-center justify-center mb-12">
              <div className="h-px w-1/5 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
              <h2 className="text-center text-3xl font-bold mx-4">
                نماذج الشاحنات
              </h2>
              <div className="h-px w-1/5 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            </div>
            <p className="text-center text-black text-sm md:text-lg lg:text-xl leading-relaxed md:leading-loose mb-4 md:mb-6 lg:mb-8 px-4 md:px-16 lg:px-20">
              شركة السيارات التي تمتلك أكبر حجم مبيعات في العالم
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
                    alt={truck.truck_name_ar}
                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Overlay for Dimming */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-30 transition-all duration-300"></div>
                  {/* Text on Image */}
                  <h3 className="absolute inset-x-0 bottom-4 text-center text-white text-lg font-semibold">
                    {truck.truck_name_ar}
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
      )}
    </>
  );
};

export default TruckModels;
