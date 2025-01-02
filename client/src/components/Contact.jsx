import React from "react";
import { useState, useEffect } from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { useInView } from "react-intersection-observer";

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
    country: "",
    contact: "",
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
      const response = await fetch("http://localhost:3000/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setResponseMessage("Your message has been sent successfully!");
        setFormData({
          name: "",
          country: "",
          contact: "",
          message: "",
        });
      } else {
        setResponseMessage("Failed to send your message. Please try again.");
      }
    } catch (error) {
      setResponseMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {language === "en" ? (
        <section
          id="Contact"
          className="py-8 md:px-20 bg-gradient-to-r from-white via-white to-blue-500"
        >
          <div className="container grid grid-cols-1 md:grid-cols-[2fr,2fr] gap-8">
            {/* Left Side - Contact Form */}
            <div
              ref={leftRef}
              className={`bg-white px-6 pb-6 md:px-8 md:pb-8 transform transition-all duration-1000 ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-100 translate-y-0"
              }`}
              style={{ margin: "30px 0 30px 0px" }}
            >
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our contact experts will help you with the choice of transport
                and advice on issues of interest.
              </p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Al Shamel Commercial Vehicles"
                  className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none px-4 py-2"
                />
                <select
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
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    type="tel"
                    placeholder="+966 55 280 3657"
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
                  <span>
                    313, Dahiyah King Fahd, Dammam 32314, Saudi Arabia
                  </span>
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
          {/* Social Icons */}
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
      ) : (
        <section
          id="Contact"
          className="py-8 md:px-20 bg-gradient-to-r from-white via-white to-blue-500"
        >
          <div className="container grid grid-cols-1 md:grid-cols-[2fr,2fr] gap-8">
            {/* Right Side - Info Section */}
            <div
              ref={rightRef}
              className="bg-black text-white p-6 md:p-8"
              style={{ margin: "30px 0" }}
            >
              <h3 className="text-4xl font-bold text-right">معلومات</h3>
              <div className="space-y-12 mt-6 text-right">
                <div className="flex items-center gap-3 justify-end">
                  <span>rasheed.hassan@fakhro.com</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.94 3.87A8 8 0 0116.12 17.06l-1.4-1.4a2.4 2.4 0 00-3.4-3.4l-1.38 1.38a8.3 8.3 0 01-1.4-.84l-1.42-1.42a8.3 8.3 0 01-.84-1.4l1.38-1.38a2.4 2.4 0 00-3.4-3.4l-1.4-1.4z" />
                  </svg>
                </div>
                <div className="flex items-center gap-3 justify-end">
                  <span>+966 55 280 3657</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V3z" />
                  </svg>
                </div>
                <div className="flex items-center gap-3 justify-end">
                  <span>
                    313, ضاحية الملك فهد, الدمام 32314, المملكة العربية السعودية
                  </span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
                  </svg>
                </div>
                <div className="flex items-center gap-3 justify-end">
                  <span>الأحد - الخميس : 08:00 صباحًا - 05:00 مساءً</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4.6 3.6A2.6 2.6 0 012 6.2v7.6a2.6 2.6 0 012.6 2.6h7.6a2.6 2.6 0 012.6-2.6V6.2A2.6 2.6 0 0112.2 3.6H4.6z" />
                  </svg>
                </div>
              </div>
            </div>
            {/* Left Side - Contact Form */}
            <div
              ref={leftRef}
              className={`bg-white px-6 pb-6 md:px-8 md:pb-8 transform transition-all duration-1000 text-right ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-100 translate-y-0"
              }`}
              style={{ margin: "30px 0 30px 0px" }}
            >
              <h2 className="text-2xl font-bold mb-4">اتصل بنا</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                سيساعدك خبراؤنا في اختيار وسائل النقل وتقديم النصائح حول القضايا
                ذات الاهتمام.
              </p>
              <form className="space-y-4" onSubmit={handleSubmit}>
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
          <div className="flex flex-col items-start justify-start gap-4">
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
      )}
    </>
  );
}
