const Aboutus = () => {
  return (
    <section id="aboutus" className="bg-[#fff8f6] px-6 py-20 sm:py-24">
      <p className="text-3xl md:text-4xl mb-10 font-bold w-full text-center uppercase tracking-[0.12em] text-violet-700">
        About Suraksha
      </p>
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-20 items-center">
        <div className="md:border-r border-gray-500">
          <h2 className="text-xl md:text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">
            Support should feel close, wherever life takes you.
          </h2>
        </div>

        <div className="space-y-5 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
          <p>
            Suraksha brings together the people and tools that can help you feel
            more connected:- trusted circles, location sharing, emergency
            alerts, and messaging.
          </p>
          <p>
            It is designed to make reaching out simpler, not to replace local
            emergency services. In an immediate emergency, contact your local
            emergency number.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
