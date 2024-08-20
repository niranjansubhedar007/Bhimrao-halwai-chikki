






"use client";
import MainNavbar from "@/components/MainNavbar";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Order = () => {
  const [products, setProducts] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://bhimrao-halwai-chikki-backend.vercel.app/api/productData");
         // Update the endpoint if needed
        const data = await response.json();
        console.log("Fetched products:", data); // Log fetched products
        setProducts(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleIconClick = (product, size) => {
    setPopupContent(product);
    setSelectedSize(size);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setPopupContent(null);
    setSelectedSize(null);
  };

  const renderProductSize = (
    product,
    size,
    sizeName,
    sizeWeight,
    sizePrice,
    sizeStock
  ) => (
    <div
      key={`${product._id}-${size}`}
      className="p-3 shadow-lg lg:p-4 md:p-3 relative hover:border-orange-700 border"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="block relative rounded overflow-hidden">
        <img
          alt="chikki"
          className="object-cover object-center h-full w-full"
          src="https://images.herzindagi.info/image/2022/Jan/health-benefits-of-jaggery-peanuts-chikki.jpg"
        />
        <img
          src="./images/veg.png"
          alt="Veg Icon"
          className="lg:w-8 lg:h-8 md:w-6 md:h-6 w-5 h-5 absolute lg:right-2 md:right-1 right-1 lg:top-2 md:top-1 top-1"
        />
        <div className="relative group">
          <FontAwesomeIcon
            icon={faEye}
            className="lg:w-5 lg:h-5 md:w-4 md:h-4 w-4 h-4 absolute bottom-2 right-2 cursor-pointer"
            onClick={() => handleIconClick(product, size)}
          />
          <div className="absolute bottom-8 right-2 bg-black text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Quick View
          </div>
        </div>
      </div>
      <div className="mt-2 justify-center flex">
        <div className="flex">
          <h2 className="text-gray-900 title-font lg:text-lg text-sm font-semibold flex text-center justify-center">
            {sizeName} ({sizeWeight})
          </h2>
        </div>
      </div>
      <div className="justify-center flex">
        <p className="mt-1 ml-2 font-medium text-md">Rs. {sizePrice}.00</p>
      </div>
      {sizeStock < 10 && sizeStock > 0 && (
        <div className="justify-center flex mt-1 text-red-600">
          Only {sizeStock} left
        </div>
      )}
      <div className="justify-center flex mt-1">
        {sizeStock > 0 ? (
          <Link href={`/cart?size=${size}&id=${product._id}`}>
            <button className="bg-orange-700 text-white hover:bg-orange-800 mt-1 rounded-full items-center px-5 py-2 text-center cursor-pointer">
              Order Now
            </button>
          </Link>
        ) : (
          <button
            className="bg-gray-400 text-white mt-1 rounded-full items-center px-5 py-2 text-center cursor-not-allowed"
            disabled
          >
            Sold Out
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <MainNavbar />
      <section className="text-gray-600 body-font bg-white lg:mt-24 md:mt-24 mt-16 font text-xs lg:text-base md:text-md">
        <div className="container lg:px-20 lg:py-12 md:py-24 md:px-5 py-5 px-2 mx-auto flex flex-col lg:flex-row">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 w-full">
            {products.map((product) => (
              <React.Fragment key={product._id}>
                {renderProductSize(
                  product,
                  "small",
                  product.smallSizeName,
                  "20g",
                  product.smallSizeRs,
                  product.smallSizeStock
                )}
                {renderProductSize(
                  product,
                  "medium",
                  product.mediumSizeName,
                  "125g",
                  product.mediumSizeRs,
                  product.mediumSizeStock
                )}
                {renderProductSize(
                  product,
                  "large",
                  product.largeSizeName,
                  "250g",
                  product.largeSizeRs,
                  product.largeSizeStock
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-xs lg:text-base md:text-md">
          <div className="bg-white lg:p-8 md:p-2 m-1 p-2 lg:mt-8 md:mt-10 mt-10 rounded shadow-lg flex flex-col lg:flex-row">
            <div className="lg:w-1/2 md:w-80 lg:p-4 md:p-2 p-1">
              <img
                alt="chikki"
                className="object-cover object-center h-full w-full lg:mb-4 md:mb-1 mb-1"
                src="https://images.herzindagi.info/image/2022/Jan/health-benefits-of-jaggery-peanuts-chikki.jpg"
              />
            </div>
            <div className="lg:w-1/2 md:w-80 lg:p-4 md:p-1 p-1">
              <h2 className="text-base lg:text-2xl md:text-base font-bold lg:mb-4 md:mb-1">
                {selectedSize === "small" && popupContent.smallSizeName}
                {selectedSize === "medium" && popupContent.mediumSizeName}
                {selectedSize === "large" && popupContent.largeSizeName}
              </h2>
              <p className="text-gray-600 lg:mb-4 md:mb-1 mb-1">
                {popupContent.description}
              </p>
              <div className="flex justify-between lg:mb-4 md:mb-1 mb-1">
                <p className="text-gray-900 title-font font-medium">
                  {selectedSize === "small" &&
                    `Rs. ${popupContent.smallSizeRs}.00`}
                  {selectedSize === "medium" &&
                    `Rs. ${popupContent.mediumSizeRs}.00`}
                  {selectedSize === "large" &&
                    `Rs. ${popupContent.largeSizeRs}.00`}
                </p>
                <p className="text-gray-600">
                  {selectedSize === "small" && "20g"}
                  {selectedSize === "medium" && "125g"}
                  {selectedSize === "large" && "250g"}
                </p>
              </div>
              <table className="w-full text-left border">
                <thead>
                  <tr>
                    <th className="border-b py-2 px-2">
                      Nutrition Information
                    </th>
                    <th className="border-b py-2 px-2">
                      per 100g (approx)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b py-2 px-2">Moisture</td>
                    <td className="border-b py-2 px-2">1.80%</td>
                  </tr>
                  <tr>
                    <td className="border-b py-2 px-2">Total Ash</td>
                    <td className="border-b py-2 px-2">0.51%</td>
                  </tr>
                  <tr>
                    <td className="border-b py-2 px-2">Total Fat</td>
                    <td className="border-b py-2 px-2">6.16%</td>
                  </tr>
                  <tr>
                    <td className="border-b py-2 px-2">Protein</td>
                    <td className="border-b py-2 px-2">2.76%</td>
                  </tr>
                  <tr>
                    <td className="border-b py-2 px-2">Carbohydrates</td>
                    <td className="border-b py-2 px-2">88.77%</td>
                  </tr>
                  <tr>
                    <td className="border-b py-2 px-2">
                      Calorific Value Kcal/100g
                    </td>
                    <td className="border-b py-2 px-2">421.56 Kcal</td>
                  </tr>
                </tbody>
              </table>
              <button
                className="bg-orange-800 text-white px-5 py-2 rounded-full mt-4"
                onClick={closePopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Order;
