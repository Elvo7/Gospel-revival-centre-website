import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";

const API_URL = "http://localhost:5000/api/settings/public";

function Hero() {
  const slides = [hero1, hero2, hero3];

  const [settings, setSettings] = useState({
    church_name: "Gospel Revival Centre",
    church_tagline: "Reviving Lives Through the Gospel",
    address: "Kangemi",
  });

  useEffect(() => {
    let mounted = true;

    const loadSettings = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (mounted && data.success && data.settings) {
          setSettings((current) => ({
            ...current,
            ...data.settings,
          }));
        }
      } catch (error) {
        console.error("Failed to load homepage settings:", error);
      }
    };

    loadSettings();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="pt-20">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {slides.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-screen bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className="absolute inset-0 bg-black/60"></div>

              <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
                <div className="text-white max-w-4xl">

                  <h3 className="uppercase tracking-[5px] text-green-400 mb-4">
                    Welcome to
                  </h3>

                  <h1 className="text-6xl font-extrabold">
                    {settings.church_name}
                  </h1>

                  <p className="text-2xl mt-4 text-gray-200">
                    {settings.address || "Kangemi"}
                  </p>

                  <p className="mt-8 text-lg">
                    {settings.church_tagline}
                  </p>

                  <div className="mt-10 flex justify-center gap-6">
                    <button className="bg-green-700 px-8 py-4 rounded-lg hover:bg-green-800">
                      Join Us
                    </button>

                    <button className="border px-8 py-4 rounded-lg hover:bg-white hover:text-black">
                      Watch Live
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Hero;