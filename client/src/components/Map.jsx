import React from 'react';
import { useInView } from 'react-intersection-observer';

function Map() {
  const { ref, inView } = useInView({
    triggerOnce: false, // Allow animation to trigger every time it comes into view
  });

  return (
    <div>
      <div
        ref={ref}
        className={`my-12 px-[50px] h-[300px] rounded-lg transition-transform duration-1000 ${
          inView ? 'transform scale-100 opacity-100' : 'transform scale-90 opacity-0'
        }`}
      >
        {/* Map Embed */}
        <div className="w-full h-full rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3573.635798016259!2d50.01158537399738!3d26.40295158181417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e3603e3654e1a5d%3A0x113a729945c94f75!2sAl%20Shamel%20Commercial%20Vehicles!5e0!3m2!1sen!2sin!4v1733303952546!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Map;
