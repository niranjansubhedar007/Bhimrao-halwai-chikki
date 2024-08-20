// "use client";
// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import {
//   faArrowLeft,
//   faArrowRight,
//   faCartArrowDown,
//   faEnvelope,
//   faHeart,
//   faMagnifyingGlass,
//   faPersonBreastfeeding,
//   faPhone,
//   faTrademark,
//   faInstagram,
//   faLocationDot,
//   faPlane,
//   faPaperPlane,
//   faSortDown,
//   faStar,
//   faTimes,
//   faSearch,
//   faA,
//   faBars,
//   faCartShopping,
//   faCaretDown,
//   faEye,
//   faComment,
//   faCommentDots,
//   faUser,
//   faHome,
// } from "@fortawesome/free-solid-svg-icons";
// import Link from "next/link";

// const Navbar = () => {

//   return (
//     <>
//       <div className="  ">
//         <nav className=" flex justify-between bg-orange-900 z-50">
//           <div className="p-2 flex  bg-orange-800 pr-5 pl-5 float-right   justify-end  ml-auto">
//             <div className=" bg-white text-orange-800 rounded-full items-center w-9 h-fit px-1 py-1.5  text-center cursor-pointer">
//               <FontAwesomeIcon
//                 icon={faUser}
//                 className="w-4 h-4 font-semibold cursor-pointer  items-center text-center "
//               />
//             </div>
//             <div className="ml-4 text-white  text-center mt-1">
//               <p className="text-xs">MY ACCOUNT</p>
//               <p className="text-xs">Login / Signup</p>
//             </div>
//           </div>
//         </nav>
//       </div>
//     </>
//   );
// };

// export default Navbar;



"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArrowLeft,
  faArrowRight,
  faCartArrowDown,
  faEnvelope,
  faHeart,

  faHome,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const MainNavbar = () => {
  const [advertisementText, setAdvertisementText] = useState(
    "SALE: Get 20% off on selected items!"
  );

  useEffect(() => {
    const advertisementTexts = [
      "SALE: Get best Discount on selected items!",
      "Limited Time Offer: Shop now and save!",
    ];

    let currentIndex = 0;
    // Rotate the advertisement text every 2 seconds
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % advertisementTexts.length;
      setAdvertisementText(advertisementTexts[currentIndex]);
    }, 4000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const [first, setfirst] = useState(false);

  const openLogin = () => {
    setfirst(!first);
  };

  return (
    <>
      <div className="advertisement-text-animation advertisement-background-animation"></div>
      <div className="  ">
        {/* Black strip for sale advertisement 
          
             <style jsx>{`
          @keyframes moveText {
            0% {
              transform: translateX(-100%);
            } 
            100% {
              transform: translateX(100%);
            } 
          }
          .advertisement-text-animation {
            animation: moveText 20s linear infinite;
          }

          @keyframes moveBackground {
            0% {
              transform: translateX(-100%);
            } 
            100% {
              transform: translateX(100%);
            } 
          }
          .advertisement-background-animation {
            animation: moveBackground 10s linear infinite;
          }
        `}</style>
          
          */}
        <nav className="border-gray-200 w-full fixed top-0 flex justify-between bg-orange-900 dark:bg-gray-800 dark:border-gray-700 z-50">
          <div className=" flex items-center px-5  p-2">
            <p className=" lg:text-2xl md:text-xl text-base  font-semibold text-white">
              Bhimrao halwai
            </p>
          </div>
          <div className=" items-center text-center flex justify-center px-5 ">
          <Link href={"/orderCart"}>
            <FontAwesomeIcon icon={ faArrowLeft} className="lg:w-6 lg:h-6 text-white cursor-pointer mt-1" />
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MainNavbar;