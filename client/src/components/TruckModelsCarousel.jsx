import React, { useState, useEffect } from "react";
import Slider from "react-slick";

export default function TruckModelsCarousel({ language }) {
  const [truckModels, setTruckModels] = useState([]);

  // Fetch truck models from the backend
  useEffect(() => {
    const fetchTruckModels = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/trucks");
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

  // console.log(truckModels)

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, // For desktop
        settings: {
          slidesToShow: 3, // Show 3 slides at a time on desktop
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // For tablets and smaller devices
        settings: {
          slidesToShow: 2, // Show 2 slides at a time on tablets
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // For mobile
        settings: {
          slidesToShow: 1, // Show 1 slide at a time on mobile
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {language === "en" ? (
        <div className="bg-white py-8">
          <div className="container mx-auto">
            {/* Carousel */}
            <Slider {...settings}>
              {truckModels.map((truck) => (
                <div key={truck.id}>
                  <div className="relative bg-gray-900 rounded-lg overflow-hidden group max-w-lg mx-auto">
                    {/* Truck Image */}
                    <img
                      src={truck.image_url} // Use the image_url field from the API response
                      alt={truck.truck_name}
                      className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-30 transition-all duration-300"></div>
                    {/* Truck Name */}
                    <h3 className="absolute inset-x-0 bottom-4 text-center text-white text-lg font-semibold">
                      {truck.truck_name}
                    </h3>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      ) : (
        <div className="bg-white py-8">
          <div className="container mx-auto">
            {/* Carousel */}
            <Slider {...settings}>
              {truckModels.map((truck) => (
                <div key={truck.id}>
                  <div className="relative bg-gray-900 rounded-lg overflow-hidden group max-w-lg mx-auto">
                    {/* Truck Image */}
                    <img
                      src={truck.image_url} // Use the image_url field from the API response
                      alt={truck.truck_name_ar}
                      className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-30 transition-all duration-300"></div>
                    {/* Truck Name */}
                    <h3 className="absolute inset-x-0 bottom-4 text-center text-white text-lg font-semibold">
                      {truck.truck_name_ar}
                    </h3>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </>
  );
}
