import React from "react";
import Slider from "react-slick";

// Truck model details with names and image paths
const truckModels = [
  {
    name: "New Energy",
    image: "https://s3-alpha-sig.figma.com/img/bb55/6d3d/09d082e434fe93ad5f78bca9adb58e6f?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JqQcb963mTTZnguNqqYIN25plS-pjAc0Pdcl~W-4OTjK-HRSdxDgAAPfC4124N~LEAHwQ5secHGpg71UCbR9i-9idXkjLDzG6l8mBa-prqBlbyYWtCdY4jhvsBVsp1IzeYOmY5P~EUR0CeJ47JrT1YVFmv24FEfcqb2rDEzw0z62a8Xwz7PSc2KYsIXyftT7T6hN7OsbyaIj51p615wWqf-HwR8hyonsK-DgrleAEegcr8ARN1hVmtcucH02Eqi4FOiyHinfY9M7cPYI3tQz-GHUYUUjMGrbZgc3CnKkv7WxWMb1EgJp7kXGLJmVIrvBaylWorFOd2ugk78sjq71tw__", // Replace with actual image path
  },
  {
    name: "Tractor",
    image: "https://s3-alpha-sig.figma.com/img/b8bc/0c04/8694280927d06f5fbc8cab3c66d7c9c7?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KQ9434S4YQZ03caUz97faRloxOa0Fldq5GU-T4OjDhUq~hvIO3Yc344o40qaj1VFnnRyhMhpxHInvvS62ZrLpYGsPglgYMA8bPo6I8N16UwJPCjTbM5COvDKXli4deZc7vEweUBcnX5wKMGuZpL6B3zyADX~vAl2I7bo7K7POPGdyQOfTfew9tMCMAKUH57ha0P-YKQ4pkEQkVCza2exUqUANmU3MjZxEpcIw5yQrMxhSslPXWATnECcFP1PJ7AzoAdYALSnai~P95Nxjs6cZQhLCTO2zimsuwUD152-Q9or9K7FPqiMWQwtdgC-Y11YDY2L66VMrr9M53PxjrzXXw__", // Replace with actual image path
  },
  {
    name: "Rigid Truck",
    image: "https://s3-alpha-sig.figma.com/img/ba2c/cefb/3fbb68d389bcf2b5fe0727943a303568?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=plmsPOnO9eGXCah42RJdOGCDcmJi4e6SH2DpJDpju75ODiyFD6LH5tf9furlxRefEKA9NBzVvBXlPM-QCgjzg6gwOIIsL4FhsblVE9LZtVWQj8HB2hSLNUtOZxtr7svpLnLGCLiidJVRPOYq8UDH4ZWBZUhJgG6iogTD0WRnCwsRtrVa5QAIRCVrhioE7hm9R~rKPfF9N3l3Wm3sf0-aFfbUoJX7UJGTxwbsRD0yoRiqOZsDjiLgsj36gf3TRvbzo6CTPiqBjgb8IlugUkI4yr4z0D~i3FxPek67JmAaU5n39LjfRbQipv4ToYO~BcXAHGLxHf~3XW63l9SxByIITQ__", // Replace with actual image path
  },
  {
    name: "Dump Truck",
    image: "https://s3-alpha-sig.figma.com/img/18ee/42a9/c5fb91a54fa08774ac4495ffa5e2a63f?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VWWS-t8NZlAv7aIk1IVrGQ6JdRhMhZA87vf3hvmszRv3uatdI9-Yve1KnVcuxzbHA2PBnIejWY5sbBkOnjJ5QrAhuu7ES-VZugN-TAFxu1d3kEkgYaEMXCUiBWLvZdZkQ7FXg6gXjeA4Y00ZdzX2LBQsK91YsFiOGlZToL00gnnNytc1yVB9WgsbcWi1dJ0cNssaCBIrEinEL7-AUotSalWALSihGpCGMiTDZpqgycseq7RgiINPKWghNpLGvSfJAe4Mn7svrbF9Vl8ReG9oIWTvinUfsvaT~k444RMElkwggwItefFVhCHXDN2K-lssLw1Zd11hAemGxFBEAmtBLA__", // Replace with actual image path
  },
  {
    name: "Special Purpose",
    image: "https://s3-alpha-sig.figma.com/img/b64f/4ee6/b6e14dfa1c95bb4d169f1feb49a627f0?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eOPN8x76XvzFUyNTOgxHk1mhQBBkfGfRaHQw5OdSliQPQlpXTbv~pM3YTnfh2Ook-iu3mJUGQ6nNLlLBZ1nXVfyC9EyTSI375XQxtcAL7hZb-8FeGj2NgpAMR7HKG5mgpI8Z4KjzvfC62zfhPMFfbr~RTCLY~QrQevL91tJU5oW3NXqlmZ2Y6JVJVhbhIXlJjeOavLn9QwESFRkWp~QKU2IqlKgbXNd8klVPiSeDq7c7da-KxfieVFxwDEy2-yIvhfP~E~izzLVfJBOtj1yk6lweybHBtv~2JDws2pG7T~3VcfRYGtf-4xCjZbqfqKr9XT3uL7d9Q5KN7XnXRcdu~w__", // Replace with actual image path
  },
];

export default function TruckModelsCarousel() {
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
    <div className="bg-white py-8">
      <div className="container mx-auto">
        {/* Carousel */}
        <Slider {...settings}>
        {truckModels.map((truck, index) => (
          <div key={index} >
            <div className="relative bg-gray-900 rounded-lg overflow-hidden group max-w-lg mx-auto">
              {/* Truck Image */}
              <img
                src= "../../../../" // Dynamically load the image
                alt={truck.name}
                className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-30 transition-all duration-300"></div>
              {/* Truck Name */}
              <h3 className="absolute inset-x-0 bottom-4 text-center text-white text-lg font-semibold">
                {truck.name}
              </h3>
            </div>
          </div>
        ))}
      </Slider>
      
      </div>
    </div>
  );
}
 