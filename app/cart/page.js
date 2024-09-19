



"use client"
import React, { useState, useEffect, Suspense } from "react";
import MainNavbar from "@/components/MainNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const ProductCart = () => {
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState(null);
  const [id, setId] = useState(null);
  const [mainImage, setMainImage] = useState(
    "https://images.herzindagi.info/image/2022/Jan/health-benefits-of-jaggery-peanuts-chikki.jpg"
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const closePopup = () => {
    setPopupVisible(false);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sizeParam = queryParams.get("size");
    const idParam = queryParams.get("id");

    if (sizeParam && idParam) {
      setSize(sizeParam);
      setId(idParam);
    }
  }, []);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(
            `https://bhimrao-halwai-chikki.vercel.app/api/productData/${id}`
          );
          const data = await response.json();
          setProduct(data);
          if (data.images && data.images.length > 0) {
            setMainImage(data.images[0]);
            setCurrentImageIndex(0);
          }
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      };

      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    if (popupVisible) {
      const audio = new Audio("./images/errortune.mp3"); // Path to the sound file
      audio.play().catch((error) => console.error("Error playing audio:", error));
      console.log("error tune played");
    }
  }, [popupVisible]);

  const images = product?.images || [
    "https://images.herzindagi.info/image/2022/Jan/health-benefits-of-jaggery-peanuts-chikki.jpg",
    "https://www.cookwithmanali.com/wp-content/uploads/2018/01/Peanut-Chikki-500x500.jpg",
    "https://www.cookwithmanali.com/wp-content/uploads/2019/12/Mixed-Nuts-Chikki.jpg",
    "https://www.foodspotindia.com/wp-content/uploads/2020/01/Fancy-Crush-Peanut-Chikki.jpg",
  ];

  const handleArrowClick = (direction) => {
    let newIndex = currentImageIndex;
    if (direction === "up") {
      newIndex = (currentImageIndex - 1 + images.length) % images.length;
    } else if (direction === "down") {
      newIndex = (currentImageIndex + 1) % images.length;
    }
    setCurrentImageIndex(newIndex);
    setMainImage(images[newIndex]);
  };

  const addToCart = () => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const newItem = { id, size };

    // Check if the item already exists in the cart
    const itemExists = currentCart.some(
      (item) => item.id === newItem.id && item.size === newItem.size
    );

    if (!itemExists) {
      const updatedCart = [...currentCart, newItem];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.location.href = "/orderCart";
    } else {
      setPopupMessage(
        <div className="inset-0 w-full h-full flex flex-col items-center lg:text-base md:text-base text-xs">
          <p>This size of product is already in the cart.</p>
          <Link
            href="/orderCart"
            className="bg-orange-700 text-white lg:text-base md:text-base text-xs hover:bg-orange-800 mt-3 
            lg:px-6 lg:py-2 md:px-4 md:py-2 px-3 py-2 rounded-lg  "
          >
            View Cart
          </Link>
        </div>
      );
      setPopupVisible(true);
    }
  };

  return (
    <>
      <MainNavbar />
      <section className="text-gray-600 body-font bg-white lg:mt-28 md:mt-16 mt-16 font ">
        <div className="flex flex-col lg:flex-row md:flex-row justify-between p-2 max-w-5xl mx-auto">
          <div className="flex ">
            <div className="flex flex-col items-center lg:p-3 p-1 md:p-3 space-y-2">
              <FontAwesomeIcon
                icon={faArrowUp}
                className="cursor-pointer hover:text-orange-800 transition-colors duration-200 mb-3 w-5 h-5"
                onClick={() => handleArrowClick("up")}
              />
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`p-1 shadow-md cursor-pointer ${
                    index === currentImageIndex
                      ? "border-2 border-orange-800"
                      : ""
                  }`}
                  onClick={() => {
                    setMainImage(img);
                    setCurrentImageIndex(index);
                  }}
                >
                  <img
                    alt={`thumbnail-${index}`}
                    className="object-cover lg:w-24 lg:h-24 md:w-24 md:h-24 w-24 h-24 rounded-lg hover:scale-105 transition-transform duration-200"
                    src={img}
                  />
                </div>
              ))}
              <div>
                <FontAwesomeIcon
                  icon={faArrowDown}
                  className="cursor-pointer hover:text-orange-800 transition-colors duration-200 mt-3 w-5 h-5"
                  onClick={() => handleArrowClick("down")}
                />
              </div>
            </div>
            <div className="flex justify-center mt-16 h-96 w-96 ml-2">
              <img
                alt="main"
                className="object-cover w-full h-full rounded-md"
                src={mainImage}
              />
            </div>
          </div>
          <div className="lg:w-1/2 md:w-1/2 w-full lg:p-6 md:p-3 p-2 flex flex-col md:mt-0 mt-5 lg:mt-0 lg:ml-6 md:ml-4 ml-0 border">
            {product && (
              <div className="text-xs lg:text-lg md:text-base">
                <p className="mb-2 pb-2 border-b border-gray-200 text-orange-700 ">
                  {size === "small" && product.smallSizeDescription}
                  {size === "medium" && product.mediumSizeDescription}
                  {size === "large" && product.largeSizeDescription}
                </p>
                <h2 className="font-semibold">
                  <span className="font-light text-gray-900">Size :</span>{" "}
                  {size === "small" && product.smallSizeName}
                  {size === "medium" && product.mediumSizeName}
                  {size === "large" && product.largeSizeName}
                </h2>
                <div className="mb-1">
                  <p className="text-gray-900 title-font font-semibold">
                    <span className="font-light text-gray-900">Rs : </span>
                    {size === "small" && ` ${product.smallSizeRs}.00`}
                    {size === "medium" && ` ${product.mediumSizeRs}.00`}
                    {size === "large" && ` ${product.largeSizeRs}.00`}
                  </p>
                  <p className="text-gray-600 font-semibold">
                    <span className="font-light text-gray-900">Net wt : </span>
                    {size === "small" && "20g"}
                    {size === "medium" && "125g"}
                    {size === "large" && "250g"}
                  </p>
                  <p className="font-semibold">
                    <span className="font-light text-gray-900">
                      Product Type :
                    </span>{" "}
                    Ready To Eat
                  </p>
                  <p className="font-semibold">
                    <span className="font-light text-gray-900">
                      Shelf Life :
                    </span>{" "}
                    120 Days
                  </p>
                  <button
                    className="bg-orange-700 text-white hover:bg-orange-800 mt-5 lg:px-6 lg:py-2 md:px-4 md:py-2 px-3 py-2 rounded-lg text-sm"
                    onClick={addToCart}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            )}
            <table className="w-full text-left lg:text-sm text-xs mt-2">
              <thead>
                <tr>
                  <th className="border-b py-2 px-2">Nutrition Information</th>
                  <th className="border-b py-2 px-2">per 100g (approx)</th>
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
          </div>
        </div>
      </section>
      {popupVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={closePopup}
        >
          <div
            className="bg-white p-5 rounded shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-0 right-2 text-gray-700"
              onClick={closePopup}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <p>{popupMessage}</p>
           
          </div>
        </div>
      )}
    </>
  );
};

const ProductCartPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ProductCart />
  </Suspense>
);

export default ProductCartPage;
