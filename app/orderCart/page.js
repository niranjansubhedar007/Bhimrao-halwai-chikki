





"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import MainNavbar from "@/components/MainNavbar";
import Link from "next/link";

const AddToOrderCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [mainImage, setMainImage] = useState(
    "https://images.herzindagi.info/image/2022/Jan/health-benefits-of-jaggery-peanuts-chikki.jpg"
  );
  const [warning, setWarning] = useState({}); // State to store warnings

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const details = await Promise.all(
        cartItems.map(async (item) => {
          const response = await fetch(
            `http://localhost:5000/api/productData/${item.id}`
          );
          const data = await response.json();
          return { ...data, size: item.size, quantity: item.quantity || 1 };
        })
      );

      // Calculate totals and update localStorage
      const updatedDetails = details.map((item) => {
        const total = calculateTotalPrice(item);
        return { ...item, total };
      });

      const grandTotal = updatedDetails.reduce(
        (total, item) => total + item.total,
        0
      );

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(cartItems));
      localStorage.setItem("productDetails", JSON.stringify(updatedDetails));
      localStorage.setItem("grandTotal", grandTotal.toString());

      setProductDetails(updatedDetails);
    };

    if (cartItems.length > 0) {
      fetchProductDetails();
    }
  }, [cartItems]);

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Recalculate and update localStorage
    const updatedDetails = productDetails.filter((_, i) => i !== index);
    const grandTotal = updatedDetails.reduce(
      (total, item) => total + item.total,
      0
    );
    localStorage.setItem("productDetails", JSON.stringify(updatedDetails));
    localStorage.setItem("grandTotal", grandTotal.toString());
    setProductDetails(updatedDetails);
  };

  const updateQuantity = (index, increment) => {
    const updatedDetails = [...productDetails];
    const newQuantity = updatedDetails[index].quantity + increment;
    const stock = updatedDetails[index][`${updatedDetails[index].size}SizeStock`]; // Get stock based on size

    if (newQuantity > 0) {
      if (increment > 0 && stock - newQuantity < 0) {
        // Show warning message if stock is less than 10
        setWarning(prevWarning => ({
          ...prevWarning,
          [index]: `Only ${stock} left`
        }));
        return;
      } else {
        setWarning(prevWarning => ({
          ...prevWarning,
          [index]: ""
        }));
      }
      
      updatedDetails[index].quantity = newQuantity;
      updatedDetails[index].total = calculateTotalPrice(updatedDetails[index]);
      setProductDetails(updatedDetails);

      // Update localStorage
      const updatedCart = [...cartItems];
      updatedCart[index].quantity = newQuantity;
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      const grandTotal = updatedDetails.reduce(
        (total, item) => total + item.total,
        0
      );
      localStorage.setItem("productDetails", JSON.stringify(updatedDetails));
      localStorage.setItem("grandTotal", grandTotal.toString());
    }
  };

  const calculateTotalPrice = (item) => {
    switch (item.size) {
      case "small":
        return item.smallSizeRs * item.quantity;
      case "medium":
        return item.mediumSizeRs * item.quantity;
      case "large":
        return item.largeSizeRs * item.quantity;
      default:
        return 0;
    }
  };

  // Define getGrandTotal function
  const getGrandTotal = () => {
    const grandTotal = localStorage.getItem("grandTotal");
    return grandTotal ? parseFloat(grandTotal) : 0;
  };

  return (
    <>
      <MainNavbar />
      <section className="text-gray-600 body-font bg-white font text-xs lg:text-base md:text-base">
        <div className="container max-w-5xl mx-auto lg:mt-20 md:mt-16 mt-16">
          {productDetails.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 p-1">
              {productDetails.map((item, index) => (
                <div
                  key={index}
                  className="border  py-2 lg:py-4 md:py-4 px-1 lg:px-4 md:px-4 rounded-lg flex items-center relative justify-between"
                >
                  <div className="flex">
                    <p className="mr-2 items-center">{index + 1}.</p>
                    <div className="lg:h-32 lg:w-32 md:h-28 w-14 h-14 md:w-28 lg:ml-2 md:ml-2 -ml-2">
                      <img
                        alt="main"
                        className="object-cover w-full h-full rounded-md"
                        src={mainImage}
                      />
                    </div>
                    <div className=" text-xs lg:text-base md:text-base flex flex-col lg:ml-12 md:ml-12 ml-2 lg:mt-6 md:mt-6 mt-2">
                      <p>
                        Size:
                        <span className="font-semibold">{item.size}</span>
                      </p>
                      <p>
                        Rs:{" "}
                        <span className="font-semibold">
                          {item.size === "small"
                            ? item.smallSizeRs
                            : item.size === "medium"
                            ? item.mediumSizeRs
                            : item.largeSizeRs}
                          .00
                        </span>
                      </p>
                      <p className="font-basic">
                        Net wt:{" "}
                        <span className="font-semibold">
                          {item.size === "small"
                            ? "20g"
                            : item.size === "medium"
                            ? "125g"
                            : "250g"}
                        </span>
                      </p>
                      {warning[index] && (
                        <p className="text-red-600 text-xs">{warning[index]}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <div>
                      <button
                        className="bg-orange-100 text-red-800 lg:px-3 lg:py-1 md:px-3  px-0.5 py-1 md:py-1 rounded-l"
                        onClick={() => updateQuantity(index, -1)}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="text-center lg:w-12 md:w-12 w-5 text-xs lg:text-base md:text-base"
                      />
                      <button
                        className="bg-orange-100 text-red-800 lg:px-3 lg:py-1 md:px-3 px-0.5 py-1 md:py-1 rounded-r"
                        onClick={() => updateQuantity(index, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex text-xs lg:text-base md:text-base">
                    <p className="mt-2">Rs {item.total}.00</p>
                  </div>
                  <div className="lg:w-10 md:w-10 w-6 rounded-full items-center lg:h-10 md:h-10 h-6 justify-center flex bg-orange-100">
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="cursor-pointer text-red-800 lg:w-5 md:w-5 w-3 lg:h-5 md:h-5 h-3"
                      onClick={() => removeFromCart(index)}
                    />
                  </div>
                </div>
              ))}
              <div className="mx-auto flex justify-between w-full">
                <div>
                  <Link href={"/orderNow"}>
                    <button className="bg-orange-50 hover:bg-red-100 text-orange-800  px-2 py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 rounded-md 
                      lg:mt-6 md:mt-6 mt-4">
                      <FontAwesomeIcon icon={faArrowLeft} />
                      <span className="ml-1"> Continue Shopping</span>
                    </button>
                  </Link>
                </div>
                <div className="flex flex-col text-center">
                  <p className="text-md font-bold -mt-2 mb-2">
                    Grand Total: Rs {getGrandTotal()}.00
                  </p>
                  <Link href={"/checkBox"}>
                    <button className="bg-orange-50 hover:bg-red-100 px-2 py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 rounded-md text-orange-800">
                    <span className="mr-2">  Proceed to Checkout</span>
                    
                   
                    <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              <p className="text-orange-800">No Order</p>
              <Link href={"/orderNow"}>
                <button className="bg-orange-50 hover:bg-red-100 text-orange-800 px-4 py-2 rounded-md mt-4">
                  <FontAwesomeIcon icon={faArrowLeft} />
                  <span className="ml-1"> Continue Shopping</span>
                </button>
              </Link>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default AddToOrderCart;
