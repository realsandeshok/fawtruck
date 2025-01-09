import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Enquiries } from "../api/api";

export default function Contact({ language }) {
  const { ref: leftRef, inView } = useInView({
    triggerOnce: false,
  });

  const { ref: rightRef } = useInView({
    triggerOnce: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    country: "saudi-arabia",
    contact: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage("");

    try {
      const response = await fetch(Enquiries, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // console.log(error);
      if (response.ok) {
        toast.success(
          language === "en"
            ? "Your message has been sent successfully!"
            : "لقد تم إرسال رسالتك بنجاح!"
        );
        setFormData({
          name: "",
          country: "",
          contact: "",
          email: "",
          message: "",
        });
      } else {
        toast.error(
          language === "en"
            ? "Failed to send your message. Please try again."
            : "Arabic Error"
        );
      }
    } catch (error) {
      toast.error(
        language === "en"
          ? "An error occurred. Please try again later."
          : "Arabic Server Error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {language === "en" ? (
        <section
          id="Contact"
          className="py-8 md:px-18 bg-gradient-to-r from-white via-white to-blue-500"
        >
          <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Contact Form */}
            <div
              ref={leftRef}
              className={`bg-white px-6 pb-6 md:px-8 md:pb-8 transform transition-all duration-1000 ${inView
                ? "opacity-100 translate-y-0"
                : "opacity-100 translate-y-0"
                }`}
              style={{ margin: "30px 0 30px 0px" }}
            >
              <h2 className="text-4xl font-bold mb-4 font-oswald">Contact Us</h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Our contact experts will help you with the choice of transport
                and advice on issues of interest.
              </p>
              <form className="space-y-4 text-lg" onSubmit={handleSubmit}>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Al Shamel Commercial Vehicles"
                  className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none px-4 py-2"
                />
                <select
                  required
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none px-4 py-2"
                >
                  <option value="saudi-arabia">Saudi Arabia</option>
                  <option value="uae">UAE</option>
                  <option value="qatar">Qatar</option>
                </select>
                <div className="flex items-center gap-2">
                  {/* <span className="text-xl">🇸🇦</span> */}
                  <input
                    required
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    type="number"
                    placeholder="+966 55 280 3657"
                    className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none px-4 py-2"
                  />
                </div>
                <div className="flex items-center gap-2">
                  {/* <span className="text-xl">🇸🇦</span> */}
                  <input
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="xyz@gmail.com"
                    className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none px-4 py-2"
                  />
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
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
              className="bg-black text-white p-6 md:p-8"
              style={{ margin: "30px 0" }}
            >
              <h3 className="text-4xl font-bold mb-14">Info</h3>
              <div className="space-y-10 md:space-y-16 md:text-[28px] font-[400] leading-[40px] text-[18px] sm:leading-[30px] sm:font-[400]">
                <div className="flex items-center gap-6">
                  <svg className="w-8 h-6 sm:w-8 sm:h-6 md:w-10 md:h-8" viewBox="0 0 40 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M31.6667 0.166504H8.33333C6.12401 0.16915 4.00593 1.04797 2.4437 2.6102C0.88147 4.17243 0.00264643 6.29051 0 8.49984L0 28.4998C0.00264643 30.7092 0.88147 32.8272 2.4437 34.3895C4.00593 35.9517 6.12401 36.8305 8.33333 36.8332H31.6667C33.876 36.8305 35.9941 35.9517 37.5563 34.3895C39.1185 32.8272 39.9974 30.7092 40 28.4998V8.49984C39.9974 6.29051 39.1185 4.17243 37.5563 2.6102C35.9941 1.04797 33.876 0.16915 31.6667 0.166504ZM8.33333 3.49984H31.6667C32.6646 3.5018 33.6392 3.80236 34.4649 4.36284C35.2906 4.92333 35.9298 5.71808 36.3 6.64484L23.5367 19.4098C22.5974 20.3454 21.3257 20.8706 20 20.8706C18.6743 20.8706 17.4026 20.3454 16.4633 19.4098L3.7 6.64484C4.07025 5.71808 4.70936 4.92333 5.53508 4.36284C6.3608 3.80236 7.33536 3.5018 8.33333 3.49984ZM31.6667 33.4998H8.33333C7.00725 33.4998 5.73548 32.973 4.7978 32.0354C3.86012 31.0977 3.33333 29.8259 3.33333 28.4998V10.9998L14.1067 21.7665C15.671 23.3269 17.7904 24.2032 20 24.2032C22.2096 24.2032 24.329 23.3269 25.8933 21.7665L36.6667 10.9998V28.4998C36.6667 29.8259 36.1399 31.0977 35.2022 32.0354C34.2645 32.973 32.9927 33.4998 31.6667 33.4998Z" fill="white" />
                  </svg>

                  <span>rasheed.hassan@fakhro.com</span>
                </div>
                <div className="flex items-center gap-6">
                  <svg className="w-8 h-6 sm:w-8 sm:h-6 md:w-[2.5rem] md:h-8" viewBox="0 0 40 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.6665 2.16689C21.6665 1.72486 21.842 1.30094 22.1546 0.988376C22.4672 0.675815 22.8911 0.50022 23.3331 0.50022C27.7519 0.505073 31.9883 2.26258 35.1129 5.38713C38.2374 8.51169 39.9949 12.7481 39.9998 17.1669C39.9998 17.6089 39.8242 18.0328 39.5116 18.3454C39.199 18.658 38.7751 18.8336 38.3331 18.8336C37.8911 18.8336 37.4671 18.658 37.1546 18.3454C36.842 18.0328 36.6664 17.6089 36.6664 17.1669C36.6625 13.6319 35.2564 10.2428 32.7568 7.74318C30.2572 5.24356 26.8681 3.83752 23.3331 3.83355C22.8911 3.83355 22.4672 3.65796 22.1546 3.3454C21.842 3.03284 21.6665 2.60891 21.6665 2.16689ZM23.3331 10.5002C25.1012 10.5002 26.7969 11.2026 28.0472 12.4528C29.2974 13.7031 29.9998 15.3988 29.9998 17.1669C29.9998 17.6089 30.1754 18.0328 30.4879 18.3454C30.8005 18.658 31.2244 18.8336 31.6664 18.8336C32.1085 18.8336 32.5324 18.658 32.845 18.3454C33.1575 18.0328 33.3331 17.6089 33.3331 17.1669C33.3305 14.5155 32.276 11.9735 30.4013 10.0987C28.5265 8.22395 25.9845 7.16954 23.3331 7.16689C22.8911 7.16689 22.4672 7.34248 22.1546 7.65504C21.842 7.9676 21.6665 8.39153 21.6665 8.83355C21.6665 9.27558 21.842 9.6995 22.1546 10.0121C22.4672 10.3246 22.8911 10.5002 23.3331 10.5002ZM38.4881 28.3986C39.4539 29.3671 39.9963 30.6791 39.9963 32.0469C39.9963 33.4147 39.4539 34.7267 38.4881 35.6952L36.9714 37.4436C23.3215 50.5119 -9.89517 17.3036 2.97148 3.61022L4.88814 1.94355C5.85775 1.00468 7.15802 0.485302 8.50764 0.497778C9.85726 0.510255 11.1477 1.05358 12.0998 2.01022C12.1515 2.06189 15.2398 6.07355 15.2398 6.07355C16.1562 7.03627 16.6663 8.3151 16.6641 9.64423C16.662 10.9733 16.1477 12.2505 15.2281 13.2102L13.2981 15.6369C14.3662 18.2321 15.9366 20.5906 17.919 22.577C19.9014 24.5635 22.2568 26.1386 24.8498 27.2119L27.2914 25.2702C28.2513 24.3514 29.5282 23.8377 30.8569 23.8359C32.1857 23.834 33.464 24.3441 34.4264 25.2602C34.4264 25.2602 38.4364 28.3469 38.4881 28.3986ZM36.1948 30.8219C36.1948 30.8219 32.2064 27.7536 32.1548 27.7019C31.8114 27.3614 31.3475 27.1704 30.8639 27.1704C30.3804 27.1704 29.9165 27.3614 29.5731 27.7019C29.5281 27.7486 26.1664 30.4269 26.1664 30.4269C25.9399 30.6072 25.6703 30.7254 25.3842 30.7698C25.0981 30.8142 24.8053 30.7834 24.5348 30.6802C21.1756 29.4295 18.1244 27.4715 15.5879 24.9387C13.0514 22.4059 11.0888 19.3576 9.83313 16.0002C9.7218 15.726 9.6855 15.427 9.72797 15.1341C9.77045 14.8412 9.89016 14.5649 10.0748 14.3336C10.0748 14.3336 12.7531 10.9702 12.7981 10.9269C13.1386 10.5835 13.3296 10.1196 13.3296 9.63605C13.3296 9.15253 13.1386 8.68858 12.7981 8.34522C12.7465 8.29522 9.67813 4.30355 9.67813 4.30355C9.32964 3.99107 8.87481 3.82371 8.40688 3.8358C7.93896 3.84788 7.49338 4.03849 7.16147 4.36855L5.24481 6.03522C-4.15851 17.3419 24.6264 44.5302 34.5348 35.1669L36.0531 33.4169C36.4089 33.0873 36.6226 32.6323 36.649 32.1481C36.6755 31.6638 36.5126 31.1882 36.1948 30.8219Z" fill="white" />
                  </svg>

                  <span>+966 55 280 3657</span>
                </div>
                <div className="flex items-center gap-6">
                  <svg className="w-10 h-8 sm:w-8 sm:h-6 md:w-[2.5rem] md:h-12" viewBox="0 0 40 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.9981 20C21.3167 20 22.6056 19.609 23.7019 18.8765C24.7983 18.1439 25.6528 17.1027 26.1573 15.8846C26.6619 14.6664 26.7939 13.3259 26.5367 12.0327C26.2795 10.7395 25.6445 9.55164 24.7122 8.61929C23.7798 7.68694 22.5919 7.052 21.2987 6.79476C20.0055 6.53753 18.6651 6.66955 17.4469 7.17414C16.2287 7.67872 15.1876 8.5332 14.455 9.62953C13.7225 10.7259 13.3315 12.0148 13.3315 13.3333C13.3315 15.1014 14.0339 16.7971 15.2841 18.0474C16.5343 19.2976 18.23 20 19.9981 20ZM19.9981 10C20.6574 10 21.3019 10.1955 21.85 10.5618C22.3982 10.928 22.8254 11.4486 23.0777 12.0577C23.33 12.6668 23.396 13.337 23.2674 13.9836C23.1388 14.6302 22.8213 15.2242 22.3552 15.6904C21.889 16.1565 21.295 16.474 20.6484 16.6026C20.0018 16.7312 19.3316 16.6652 18.7225 16.4129C18.1134 16.1606 17.5928 15.7334 17.2266 15.1852C16.8603 14.6371 16.6648 13.9926 16.6648 13.3333C16.6648 12.4493 17.016 11.6014 17.6411 10.9763C18.2662 10.3512 19.1141 10 19.9981 10ZM34.4315 15.2617L33.2331 14.8633C33.4488 12.9965 33.2674 11.1052 32.7008 9.31347C32.1343 7.52171 31.1953 5.86994 29.9456 4.46649C28.6959 3.06303 27.1637 1.9396 25.4494 1.16986C23.735 0.400112 21.8773 0.0014458 19.9981 0C18.0944 0.000734949 16.2129 0.40949 14.4805 1.19872C12.7481 1.98796 11.2049 3.13934 9.95501 4.57529C8.70511 6.01124 7.77749 7.69841 7.23466 9.52312C6.69182 11.3478 6.54638 13.2677 6.80814 15.1533C5.2132 15.4507 3.73835 16.2032 2.56147 17.32C1.74676 18.0946 1.09909 19.0276 0.65827 20.0617C0.217452 21.0958 -0.00719542 22.2092 -0.00186028 23.3333V30.125C0.00164238 31.9272 0.587793 33.68 1.66912 35.1218C2.75045 36.5635 4.26899 37.617 5.99814 38.125L10.7815 39.625C11.5849 39.875 12.4217 40.0015 13.2631 40C14.0265 39.999 14.7861 39.8947 15.5215 39.69L25.1548 36.84C26.013 36.6058 26.9183 36.6058 27.7765 36.84L31.7548 38.1733C32.7353 38.412 33.7572 38.4249 34.7434 38.2112C35.7296 37.9975 36.6545 37.5627 37.4482 36.9395C38.242 36.3164 38.8839 35.5212 39.3256 34.6139C39.7673 33.7065 39.9973 32.7108 39.9981 31.7017V23.12C39.9944 21.3957 39.4574 19.7147 38.4608 18.3076C37.4642 16.9004 36.0568 15.8359 34.4315 15.26V15.2617ZM12.9281 6.27C13.8552 5.33915 14.957 4.60054 16.1703 4.09655C17.3835 3.59257 18.6844 3.33313 19.9981 3.33313C21.3119 3.33313 22.6127 3.59257 23.826 4.09655C25.0393 4.60054 26.141 5.33915 27.0681 6.27C28.9384 8.1519 29.9897 10.6964 29.9931 13.3496C29.9965 16.0028 28.9519 18.5499 27.0865 20.4367L21.1648 26.195C20.8557 26.498 20.4402 26.6678 20.0073 26.6678C19.5745 26.6678 19.1589 26.498 18.8498 26.195L12.9281 20.4617C11.0539 18.5756 10.002 16.0247 10.002 13.3658C10.002 10.7069 11.0539 8.15602 12.9281 6.27ZM36.6648 31.7017C36.6658 32.2065 36.5517 32.7048 36.331 33.1589C36.1104 33.6129 35.789 34.0106 35.3915 34.3217C35.0158 34.6237 34.5783 34.8392 34.1099 34.953C33.6415 35.0668 33.1538 35.076 32.6815 34.98L28.7731 33.6667C27.2948 33.242 25.728 33.2327 24.2448 33.64L14.6048 36.4867C13.6786 36.7422 12.6984 36.7254 11.7815 36.4383L6.95814 34.9383C5.91423 34.6365 4.9964 34.0041 4.34247 33.1362C3.68854 32.2683 3.33379 31.2117 3.33147 30.125V23.3333C3.32773 22.6596 3.46182 21.9923 3.72551 21.3723C3.9892 20.7524 4.37691 20.1929 4.86481 19.7283C5.62857 19.0004 6.6015 18.5306 7.64647 18.385C8.31831 20.0503 9.31877 21.5632 10.5881 22.8333L16.5331 28.5883C17.4623 29.4982 18.711 30.0077 20.0115 30.0077C21.3119 30.0077 22.5606 29.4982 23.4898 28.5883L29.4281 22.8167C30.7577 21.4817 31.7878 19.879 32.4498 18.115L33.3448 18.4117C34.3154 18.7595 35.1551 19.3983 35.7493 20.2409C36.3434 21.0835 36.6632 22.089 36.6648 23.12V31.7017Z" fill="white" />
                  </svg>

                  <span>
                    313, Dahiyah King Fahd, Dammam 32314, Saudi Arabia
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <svg className="w-8 h-6  sm:w-8 sm:h-6 md:w-[2x.5rem] md:h-8" viewBox="0 0 40 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 0C16.0444 0 12.1776 1.17298 8.8886 3.37061C5.59962 5.56824 3.03617 8.69181 1.52242 12.3463C0.00866572 16.0009 -0.387401 20.0222 0.384303 23.9018C1.15601 27.7814 3.06082 31.3451 5.85787 34.1421C8.65492 36.9392 12.2186 38.844 16.0982 39.6157C19.9778 40.3874 23.9992 39.9913 27.6537 38.4776C31.3082 36.9638 34.4318 34.4004 36.6294 31.1114C38.827 27.8224 40 23.9556 40 20C39.9943 14.6974 37.8853 9.61368 34.1358 5.8642C30.3863 2.11471 25.3026 0.00573514 20 0V0ZM20 36.6667C16.7037 36.6667 13.4813 35.6892 10.7405 33.8578C7.99969 32.0265 5.86348 29.4235 4.60202 26.3781C3.34056 23.3326 3.0105 19.9815 3.65359 16.7485C4.29667 13.5155 5.88402 10.5458 8.2149 8.21489C10.5458 5.88401 13.5155 4.29667 16.7485 3.65358C19.9815 3.01049 23.3326 3.34055 26.3781 4.60201C29.4235 5.86347 32.0265 7.99968 33.8578 10.7405C35.6892 13.4813 36.6667 16.7036 36.6667 20C36.6618 24.4188 34.9043 28.6552 31.7798 31.7798C28.6552 34.9043 24.4188 36.6618 20 36.6667Z" fill="white" />
                  </svg>

                  <span>Sun - Thu : 08:00 AM - 05:00 PM</span>
                </div>
              </div>
            </div>
          </div>
          {/* Social Icons */}
          <div className="flex flex-col items-end justify-end gap-4">
            <div className="flex lg:flex-row gap-4">
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
      ) : (
        <section
          id="Contact"
          className="py-8 md:px-20 bg-gradient-to-r from-white via-white to-blue-500"
        >
          <div className="container lg:grid grid-cols-1 lg:grid-cols-2 gap-8 flex flex-col-reverse ">
            {/* Right Side - Info Section */}
            <div
              ref={rightRef}
              className="bg-black text-white p-6 md:p-8"
              style={{ margin: "30px 0" }}
            >
              <h3 className="text-4xl font-bold text-right mb-14">معلومات</h3>
              <div className="space-y-10  mt-6 text-right md:space-y-16 md:text-[28px] font-[400] leading-[40px] text-[18px] sm:leading-[30px] sm:font-[400]">

                <div className="flex items-center gap-6 justify-end">
                  <span>rasheed.hassan@fakhro.com</span>
                  <svg className="w-8 h-6 sm:w-8 sm:h-6 md:w-10 md:h-8" viewBox="0 0 40 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M31.6667 0.166504H8.33333C6.12401 0.16915 4.00593 1.04797 2.4437 2.6102C0.88147 4.17243 0.00264643 6.29051 0 8.49984L0 28.4998C0.00264643 30.7092 0.88147 32.8272 2.4437 34.3895C4.00593 35.9517 6.12401 36.8305 8.33333 36.8332H31.6667C33.876 36.8305 35.9941 35.9517 37.5563 34.3895C39.1185 32.8272 39.9974 30.7092 40 28.4998V8.49984C39.9974 6.29051 39.1185 4.17243 37.5563 2.6102C35.9941 1.04797 33.876 0.16915 31.6667 0.166504ZM8.33333 3.49984H31.6667C32.6646 3.5018 33.6392 3.80236 34.4649 4.36284C35.2906 4.92333 35.9298 5.71808 36.3 6.64484L23.5367 19.4098C22.5974 20.3454 21.3257 20.8706 20 20.8706C18.6743 20.8706 17.4026 20.3454 16.4633 19.4098L3.7 6.64484C4.07025 5.71808 4.70936 4.92333 5.53508 4.36284C6.3608 3.80236 7.33536 3.5018 8.33333 3.49984ZM31.6667 33.4998H8.33333C7.00725 33.4998 5.73548 32.973 4.7978 32.0354C3.86012 31.0977 3.33333 29.8259 3.33333 28.4998V10.9998L14.1067 21.7665C15.671 23.3269 17.7904 24.2032 20 24.2032C22.2096 24.2032 24.329 23.3269 25.8933 21.7665L36.6667 10.9998V28.4998C36.6667 29.8259 36.1399 31.0977 35.2022 32.0354C34.2645 32.973 32.9927 33.4998 31.6667 33.4998Z" fill="white" />
                  </svg>
                </div>
                <div className="flex items-center gap-6 justify-end">
                  <span>+966 55 280 3657</span>
                  <svg className="w-8 h-6 sm:w-8 sm:h-6 md:w-[2.5rem] md:h-8" viewBox="0 0 40 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.6665 2.16689C21.6665 1.72486 21.842 1.30094 22.1546 0.988376C22.4672 0.675815 22.8911 0.50022 23.3331 0.50022C27.7519 0.505073 31.9883 2.26258 35.1129 5.38713C38.2374 8.51169 39.9949 12.7481 39.9998 17.1669C39.9998 17.6089 39.8242 18.0328 39.5116 18.3454C39.199 18.658 38.7751 18.8336 38.3331 18.8336C37.8911 18.8336 37.4671 18.658 37.1546 18.3454C36.842 18.0328 36.6664 17.6089 36.6664 17.1669C36.6625 13.6319 35.2564 10.2428 32.7568 7.74318C30.2572 5.24356 26.8681 3.83752 23.3331 3.83355C22.8911 3.83355 22.4672 3.65796 22.1546 3.3454C21.842 3.03284 21.6665 2.60891 21.6665 2.16689ZM23.3331 10.5002C25.1012 10.5002 26.7969 11.2026 28.0472 12.4528C29.2974 13.7031 29.9998 15.3988 29.9998 17.1669C29.9998 17.6089 30.1754 18.0328 30.4879 18.3454C30.8005 18.658 31.2244 18.8336 31.6664 18.8336C32.1085 18.8336 32.5324 18.658 32.845 18.3454C33.1575 18.0328 33.3331 17.6089 33.3331 17.1669C33.3305 14.5155 32.276 11.9735 30.4013 10.0987C28.5265 8.22395 25.9845 7.16954 23.3331 7.16689C22.8911 7.16689 22.4672 7.34248 22.1546 7.65504C21.842 7.9676 21.6665 8.39153 21.6665 8.83355C21.6665 9.27558 21.842 9.6995 22.1546 10.0121C22.4672 10.3246 22.8911 10.5002 23.3331 10.5002ZM38.4881 28.3986C39.4539 29.3671 39.9963 30.6791 39.9963 32.0469C39.9963 33.4147 39.4539 34.7267 38.4881 35.6952L36.9714 37.4436C23.3215 50.5119 -9.89517 17.3036 2.97148 3.61022L4.88814 1.94355C5.85775 1.00468 7.15802 0.485302 8.50764 0.497778C9.85726 0.510255 11.1477 1.05358 12.0998 2.01022C12.1515 2.06189 15.2398 6.07355 15.2398 6.07355C16.1562 7.03627 16.6663 8.3151 16.6641 9.64423C16.662 10.9733 16.1477 12.2505 15.2281 13.2102L13.2981 15.6369C14.3662 18.2321 15.9366 20.5906 17.919 22.577C19.9014 24.5635 22.2568 26.1386 24.8498 27.2119L27.2914 25.2702C28.2513 24.3514 29.5282 23.8377 30.8569 23.8359C32.1857 23.834 33.464 24.3441 34.4264 25.2602C34.4264 25.2602 38.4364 28.3469 38.4881 28.3986ZM36.1948 30.8219C36.1948 30.8219 32.2064 27.7536 32.1548 27.7019C31.8114 27.3614 31.3475 27.1704 30.8639 27.1704C30.3804 27.1704 29.9165 27.3614 29.5731 27.7019C29.5281 27.7486 26.1664 30.4269 26.1664 30.4269C25.9399 30.6072 25.6703 30.7254 25.3842 30.7698C25.0981 30.8142 24.8053 30.7834 24.5348 30.6802C21.1756 29.4295 18.1244 27.4715 15.5879 24.9387C13.0514 22.4059 11.0888 19.3576 9.83313 16.0002C9.7218 15.726 9.6855 15.427 9.72797 15.1341C9.77045 14.8412 9.89016 14.5649 10.0748 14.3336C10.0748 14.3336 12.7531 10.9702 12.7981 10.9269C13.1386 10.5835 13.3296 10.1196 13.3296 9.63605C13.3296 9.15253 13.1386 8.68858 12.7981 8.34522C12.7465 8.29522 9.67813 4.30355 9.67813 4.30355C9.32964 3.99107 8.87481 3.82371 8.40688 3.8358C7.93896 3.84788 7.49338 4.03849 7.16147 4.36855L5.24481 6.03522C-4.15851 17.3419 24.6264 44.5302 34.5348 35.1669L36.0531 33.4169C36.4089 33.0873 36.6226 32.6323 36.649 32.1481C36.6755 31.6638 36.5126 31.1882 36.1948 30.8219Z" fill="white" />
                  </svg>
                </div>
                <div className="flex items-center gap-6 justify-end">
                  <span>
                    313, ضاحية الملك فهد, الدمام 32314, المملكة العربية السعودية
                  </span>
                  <svg className="w-10 h-8 sm:w-8 sm:h-6 md:w-[3.5rem] md:h-12" viewBox="0 0 40 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.9981 20C21.3167 20 22.6056 19.609 23.7019 18.8765C24.7983 18.1439 25.6528 17.1027 26.1573 15.8846C26.6619 14.6664 26.7939 13.3259 26.5367 12.0327C26.2795 10.7395 25.6445 9.55164 24.7122 8.61929C23.7798 7.68694 22.5919 7.052 21.2987 6.79476C20.0055 6.53753 18.6651 6.66955 17.4469 7.17414C16.2287 7.67872 15.1876 8.5332 14.455 9.62953C13.7225 10.7259 13.3315 12.0148 13.3315 13.3333C13.3315 15.1014 14.0339 16.7971 15.2841 18.0474C16.5343 19.2976 18.23 20 19.9981 20ZM19.9981 10C20.6574 10 21.3019 10.1955 21.85 10.5618C22.3982 10.928 22.8254 11.4486 23.0777 12.0577C23.33 12.6668 23.396 13.337 23.2674 13.9836C23.1388 14.6302 22.8213 15.2242 22.3552 15.6904C21.889 16.1565 21.295 16.474 20.6484 16.6026C20.0018 16.7312 19.3316 16.6652 18.7225 16.4129C18.1134 16.1606 17.5928 15.7334 17.2266 15.1852C16.8603 14.6371 16.6648 13.9926 16.6648 13.3333C16.6648 12.4493 17.016 11.6014 17.6411 10.9763C18.2662 10.3512 19.1141 10 19.9981 10ZM34.4315 15.2617L33.2331 14.8633C33.4488 12.9965 33.2674 11.1052 32.7008 9.31347C32.1343 7.52171 31.1953 5.86994 29.9456 4.46649C28.6959 3.06303 27.1637 1.9396 25.4494 1.16986C23.735 0.400112 21.8773 0.0014458 19.9981 0C18.0944 0.000734949 16.2129 0.40949 14.4805 1.19872C12.7481 1.98796 11.2049 3.13934 9.95501 4.57529C8.70511 6.01124 7.77749 7.69841 7.23466 9.52312C6.69182 11.3478 6.54638 13.2677 6.80814 15.1533C5.2132 15.4507 3.73835 16.2032 2.56147 17.32C1.74676 18.0946 1.09909 19.0276 0.65827 20.0617C0.217452 21.0958 -0.00719542 22.2092 -0.00186028 23.3333V30.125C0.00164238 31.9272 0.587793 33.68 1.66912 35.1218C2.75045 36.5635 4.26899 37.617 5.99814 38.125L10.7815 39.625C11.5849 39.875 12.4217 40.0015 13.2631 40C14.0265 39.999 14.7861 39.8947 15.5215 39.69L25.1548 36.84C26.013 36.6058 26.9183 36.6058 27.7765 36.84L31.7548 38.1733C32.7353 38.412 33.7572 38.4249 34.7434 38.2112C35.7296 37.9975 36.6545 37.5627 37.4482 36.9395C38.242 36.3164 38.8839 35.5212 39.3256 34.6139C39.7673 33.7065 39.9973 32.7108 39.9981 31.7017V23.12C39.9944 21.3957 39.4574 19.7147 38.4608 18.3076C37.4642 16.9004 36.0568 15.8359 34.4315 15.26V15.2617ZM12.9281 6.27C13.8552 5.33915 14.957 4.60054 16.1703 4.09655C17.3835 3.59257 18.6844 3.33313 19.9981 3.33313C21.3119 3.33313 22.6127 3.59257 23.826 4.09655C25.0393 4.60054 26.141 5.33915 27.0681 6.27C28.9384 8.1519 29.9897 10.6964 29.9931 13.3496C29.9965 16.0028 28.9519 18.5499 27.0865 20.4367L21.1648 26.195C20.8557 26.498 20.4402 26.6678 20.0073 26.6678C19.5745 26.6678 19.1589 26.498 18.8498 26.195L12.9281 20.4617C11.0539 18.5756 10.002 16.0247 10.002 13.3658C10.002 10.7069 11.0539 8.15602 12.9281 6.27ZM36.6648 31.7017C36.6658 32.2065 36.5517 32.7048 36.331 33.1589C36.1104 33.6129 35.789 34.0106 35.3915 34.3217C35.0158 34.6237 34.5783 34.8392 34.1099 34.953C33.6415 35.0668 33.1538 35.076 32.6815 34.98L28.7731 33.6667C27.2948 33.242 25.728 33.2327 24.2448 33.64L14.6048 36.4867C13.6786 36.7422 12.6984 36.7254 11.7815 36.4383L6.95814 34.9383C5.91423 34.6365 4.9964 34.0041 4.34247 33.1362C3.68854 32.2683 3.33379 31.2117 3.33147 30.125V23.3333C3.32773 22.6596 3.46182 21.9923 3.72551 21.3723C3.9892 20.7524 4.37691 20.1929 4.86481 19.7283C5.62857 19.0004 6.6015 18.5306 7.64647 18.385C8.31831 20.0503 9.31877 21.5632 10.5881 22.8333L16.5331 28.5883C17.4623 29.4982 18.711 30.0077 20.0115 30.0077C21.3119 30.0077 22.5606 29.4982 23.4898 28.5883L29.4281 22.8167C30.7577 21.4817 31.7878 19.879 32.4498 18.115L33.3448 18.4117C34.3154 18.7595 35.1551 19.3983 35.7493 20.2409C36.3434 21.0835 36.6632 22.089 36.6648 23.12V31.7017Z" fill="white" />
                  </svg>
                </div>
                <div className="flex items-center gap-6 justify-end">
                  <span>الأحد - الخميس : 08:00 صباحًا - 05:00 مساءً</span>
                  <svg className="w-8 h-6  sm:w-8 sm:h-6 md:w-[2x.5rem] md:h-8" viewBox="0 0 40 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 0C16.0444 0 12.1776 1.17298 8.8886 3.37061C5.59962 5.56824 3.03617 8.69181 1.52242 12.3463C0.00866572 16.0009 -0.387401 20.0222 0.384303 23.9018C1.15601 27.7814 3.06082 31.3451 5.85787 34.1421C8.65492 36.9392 12.2186 38.844 16.0982 39.6157C19.9778 40.3874 23.9992 39.9913 27.6537 38.4776C31.3082 36.9638 34.4318 34.4004 36.6294 31.1114C38.827 27.8224 40 23.9556 40 20C39.9943 14.6974 37.8853 9.61368 34.1358 5.8642C30.3863 2.11471 25.3026 0.00573514 20 0V0ZM20 36.6667C16.7037 36.6667 13.4813 35.6892 10.7405 33.8578C7.99969 32.0265 5.86348 29.4235 4.60202 26.3781C3.34056 23.3326 3.0105 19.9815 3.65359 16.7485C4.29667 13.5155 5.88402 10.5458 8.2149 8.21489C10.5458 5.88401 13.5155 4.29667 16.7485 3.65358C19.9815 3.01049 23.3326 3.34055 26.3781 4.60201C29.4235 5.86347 32.0265 7.99968 33.8578 10.7405C35.6892 13.4813 36.6667 16.7036 36.6667 20C36.6618 24.4188 34.9043 28.6552 31.7798 31.7798C28.6552 34.9043 24.4188 36.6618 20 36.6667Z" fill="white" />
                  </svg>
                </div>
              </div>
            </div>
            {/* Left Side - Contact Form */}
            <div
              ref={leftRef}
              className={`bg-white px-6 pb-6 md:px-8 md:pb-8 transform transition-all duration-1000 text-right ${inView
                ? "opacity-100 translate-y-0"
                : "opacity-100 translate-y-0"
                }`}
              style={{ margin: "30px 0 30px 0px" }}
            >
              <h2 className="text-4xl font-bold mb-4">اتصل بنا</h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                سيساعدك خبراؤنا في اختيار وسائل النقل وتقديم النصائح حول القضايا
                ذات الاهتمام.
              </p>

              <form className="space-y-4 text-lg" onSubmit={handleSubmit}>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="الشامل للمركبات التجارية"
                  className="w-full text-right border-b border-gray-300 focus:border-blue-500 focus:outline-none px-4 py-2"
                />
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full text-right border-b border-gray-300 focus:border-blue-500 focus:outline-none px-4 py-2"
                >
                  <option value="saudi-arabia">العربية السعودية</option>
                  <option value="uae">الإمارات العربية المتحدة</option>
                  <option value="qatar">قطر</option>
                </select>
                <div className="flex items-center gap-2">
                  {/* <span className="text-xl text-right">🇸🇦</span> */}
                  <input
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    type="tel"
                    placeholder="+966 55 280 3657"
                    className="w-full text-right border-b border-gray-300 focus:border-blue-500 focus:outline-none px-4 py-2"
                  />
                </div>
                <div className="flex items-center gap-2">
                  {/* <span className="text-xl">🇸🇦</span> */}
                  <input
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="xyz@gmail.com"
                    className="w-full text-right border-b border-gray-300 focus:border-blue-500 focus:outline-none px-4 py-2"
                  />
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="رسالة"
                  className="w-full text-right border-b border-gray-300 focus:border-blue-500 focus:outline-none px-4 py-2 h-24"
                ></textarea>
                <button className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800">
                  يرسل
                </button>
              </form>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex flex-col items-end justify-end gap-4">
            <div className="flex lg:flex-row gap-4">
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
      )}
    </>
  );
}
