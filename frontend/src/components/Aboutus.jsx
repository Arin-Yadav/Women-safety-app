import React from "react";

const Aboutus = () => {
  return (
    <section id="aboutus" className="py-10 md:py-20 px-6 bg-purple-50">
      <p className="text-purple-600 text-4xl sm:text-5xl font-bold mb-10 w-full text-center">
        About us
      </p>
      <div className="max-w-7xl lg:px-10 mx-auto grid lg:grid-cols-2 gap-10 items-center">
        <h2 className="text-2xl md:text-5xl font-bold leading-tight">
          A movement toward safety, confidence, and empowerment.
        </h2>

        <div className="text-gray-600 text-base sm:text-lg leading-relaxed space-y-6">
          <p>
            We are dedicated to creating a safer world for women through
            technology. Our Women Safety WebApp empowers users with instant
            emergency alerts, live location tracking, and trusted contact
            support.
          </p>
          <p>
            Beyond safety, our vision is to foster awareness, build supportive
            communities, and promote equality. This project is more than just an
            app - it is a movement toward security, confidence, and empowerment
            for women everywhere.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
