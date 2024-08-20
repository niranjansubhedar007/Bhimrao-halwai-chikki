"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import MainNavbar from "@/components/MainNavbar";

const MainPage = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const images = [
    "https://images.herzindagi.info/image/2022/Jan/health-benefits-of-jaggery-peanuts-chikki.jpg",
    "https://www.secondrecipe.com/wp-content/uploads/2020/10/chikki-scaled-1-720x657.jpg",
    "https://www.cookwithmanali.com/wp-content/uploads/2018/01/Peanut-Chikki.jpg",
    "https://www.ruchiskitchen.com/wp-content/uploads/2019/01/Peanut-brittle-4.jpg.webp",
  ];
  const imageCount = images.length;
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToNext = () => {
    if (currentIndex === imageCount) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleTransitionEnd = () => {
    if (currentIndex === imageCount) {
      setIsTransitioning(false);
      setCurrentIndex(0);
      sliderRef.current.style.transition = "none";
      sliderRef.current.style.transform = `translateX(0%)`;

      // Force reflow
      sliderRef.current.offsetHeight;

      setIsTransitioning(true);
      sliderRef.current.style.transition = "transform 1s ease-out";
    }
  };

  return (
    <>
<MainNavbar/>
      <div className="flex  flex-col md:flex-row lg:flex-row items-center justify-between h-fit lg:mt-44 
      md:mt-32
       bg-white lg:p-4 md:p-4 p-2 font-sans lg:px-36  mt-20">
        <div className="lg:w-1/2 md:w-full w-full flex flex-col justify-center items-center text-center ">
          <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold lg:mb-2 md:mb-2 mb-1">
            Bhimrao Halwai Chikki
          </h1>
          <span className="text-xs mb-4">
            ( 135 Shaniwar peth, Satara Maharashatra pin - 415002 )
          </span>

          <Link href={"/orderNow"}>
            <button className="bg-orange-700 hover:bg-orange-800 text-white rounded-full items-center text-xs lg:text-base md:text-md lg:px-5 lg:py-3 md:py-3 md:px-4 py-2 px-3 text-center cursor-pointer">
              Order Now
            </button>
          </Link>
        </div>
        <div className="lg:w-1/2 md:w-full w-full overflow-hidden lg:ml-0 md:ml-4 lg:mt-0 md:mt-0  mt-5">
          <div
            ref={sliderRef}
            className={`flex transition-transform duration-${
              isTransitioning ? "1000" : "0"
            } ease-out relative`}
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translateX(-${
                currentIndex * (100 / (imageCount + 1))
              }%)`,
              width: `${(imageCount + 1) * 100}%`,
            }}
          >
            {images.concat(images[0]).map((image, index) => (
              <div key={index} className="relative w-full">
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <img
                  src="./images/veg.png"
                  alt="Veg Icon"
                  className="w-8 h-8 absolute top-2 right-2"
                />
              </div>
            ))}
          </div>
          <div className="flex space-x-4 justify-center w-full">
            <div className="space-x-2 mt-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentIndex % imageCount
                      ? "bg-gray-900"
                      : "bg-gray-400"
                  }`}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsTransitioning(true);
                  }}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
