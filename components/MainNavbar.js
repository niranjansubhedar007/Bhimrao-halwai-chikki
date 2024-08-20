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

// const MainNavbar = () => {
//   const [advertisementText, setAdvertisementText] = useState(
//     "SALE: Get 20% off on selected items!"
//   );

//   useEffect(() => {
//     const advertisementTexts = [
//       "SALE: Get best Discount on selected items!",
//       "Limited Time Offer: Shop now and save!",
//     ];

//     let currentIndex = 0;
//     // Rotate the advertisement text every 2 seconds
//     const interval = setInterval(() => {
//       currentIndex = (currentIndex + 1) % advertisementTexts.length;
//       setAdvertisementText(advertisementTexts[currentIndex]);
//     }, 4000);

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, []);

//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   const [first, setfirst] = useState(false);

//   const openLogin = () => {
//     setfirst(!first);
//   };

//   return (
//     <>
//       <div className="advertisement-text-animation advertisement-background-animation">

//       </div>
//       <div className="  ">
//         {/* Black strip for sale advertisement

//              <style jsx>{`
//           @keyframes moveText {
//             0% {
//               transform: translateX(-100%);
//             }
//             100% {
//               transform: translateX(100%);
//             }
//           }
//           .advertisement-text-animation {
//             animation: moveText 20s linear infinite;
//           }

//           @keyframes moveBackground {
//             0% {
//               transform: translateX(-100%);
//             }
//             100% {
//               transform: translateX(100%);
//             }
//           }
//           .advertisement-background-animation {
//             animation: moveBackground 10s linear infinite;
//           }
//         `}</style>

//           */}
//         <nav className="border-gray-200 w-full flex justify-between bg-orange-900 dark:bg-gray-800 dark:border-gray-700 z-50">
//           <div className=" flex items-center px-5  p-2">
//             <div
//               className="  bg-orange-800 text-white rounded-full items-center w-10 h-fit px-2 py-2  text-center cursor-pointer"
//               onClick={toggleMenu}
//             >
//               <FontAwesomeIcon
//                 icon={faBars}
//                 className="w-4 h-4 font-semibold cursor-pointer  hover:text-white"
//               />
//             </div>
//             <p className=" lg:text-2xl md:text-xl text-base ml-4 font-semibold text-white">
//               Bhimrao halwai
//             </p>
//           </div>

//           {/*     <div className="p-2 flex  bg-orange-800 pr-5 pl-5 float-right   justify-end  ml-auto">
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
//           </div>    */}

//         </nav>

//         {isMenuOpen && (
//           <aside
//             id="default-sidebar"
//             className="fixed top-16 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
//             aria-label="Sidebar"
//           >
//             <div className="h-full px-1 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
//               <ul className="space-y-2 font-light">
//                 <li className="">
//                   <Link
//                     href={"/"}
//                     className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//                   >
//                     <img
//                       src="./images/location.png"
//                       alt=""
//                       className="h-7 w-7"
//                     />

//                     <p className="ml-4 ">Track Current Order</p>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href={"/"}
//                     className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//                   >
//                     <img
//                       src="./images/order-history.png"
//                       alt=""
//                       className="h-7 w-7"
//                     />
//                     <span className="ml-4">Order History</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href={"/"}
//                     className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//                   >
//                     <img
//                       src="./images/house.png"
//                       alt=""
//                       className="h-5 w-5 ml-1"
//                     />

//                     <span className="ml-5">Home</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href={"/"}
//                     className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//                   >
//                     <img
//                       src="./images/feedback.png"
//                       alt=""
//                       className="h-7 w-7"
//                     />

//                     <span className="ml-4">Feedback</span>
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </aside>
//         )}
//       </div>
//     </>
//   );
// };

// export default MainNavbar;

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
          <Link href={"/mainPage"}>
            <FontAwesomeIcon icon={faHome} className="lg:w-6 lg:h-6 text-white cursor-pointer mt-1" />
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MainNavbar;
