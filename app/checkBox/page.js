


"use client"


import Navbar from "@/components/Navbar";
import {
  faArrowLeft,
  faPhone,
  faWhatsapp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CheckBox = () => {
  const [productDetails, setProductDetails] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    pincode: "",
    mobileNo: "",
    city: "",
    address: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    const storedProductDetails =
      JSON.parse(localStorage.getItem("productDetails")) || [];
    setProductDetails(storedProductDetails);
  }, []);

  useEffect(() => {
    if (successMessage) {
      const audio = new Audio("./images/errortune.mp3"); // Path to the sound file
      audio.play();
    }
  }, [successMessage]);




  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 4000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

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

  const getTotalPrice = () => {
    return productDetails.reduce(
      (total, item) => total + calculateTotalPrice(item),
      0
    );
  };

  const getNetWeight = (size) => {
    switch (size) {
      case "small":
        return "20g";
      case "medium":
        return "125g";
      case "large":
        return "250g";
      default:
        return "N/A";
    }
  };

  const getGrandTotal = () => {
    const totalPrice = getTotalPrice();
    const packingHandlingCharges = 20; // Fixed charge for Packing & Handling
    return totalPrice + packingHandlingCharges;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // const handleWhatsAppClick = async () => {
  //   // Validate form data
  //   const isFormValid = Object.values(formData).every(value => value.trim() !== "");
  //   if (!isFormValid) {
  //     setSuccessMessage("Please fill Form.");
  //     return;
  //   }
  
  //   try {
  //     // Aggregate stock updates
  //     const stockUpdates = {};
  
  //     // Create a dictionary of updates for each product
  //     productDetails.forEach(item => {
  //       const id = item._id; // Use _id instead of id
  //       if (!id) {
  //         console.error(`Product ID (_id) is missing for item:`, item);
  //         return; // Skip this item if no ID is present
  //       }
  
  //       const stockKey = `${item.size}SizeStock`;
  
  //       if (!stockUpdates[id]) {
  //         stockUpdates[id] = {};
  //       }
  
  //       const product = productDetails.find(p => p._id === id);
  //       if (product) {
  //         const currentStock = product[stockKey] || 0;
  
  //         // Update the stock quantity
  //         stockUpdates[id][stockKey] = currentStock - item.quantity;
  //       }
  //     });
  
  //     // Log updates for debugging
  //     console.log("Stock updates:", stockUpdates);
  
  //     // Update stock for each product
  //     await Promise.all(
  //       Object.entries(stockUpdates).map(async ([id, updateFields]) => {
  //         console.log(`Updating product ${id} with data:`, updateFields); // Debug log
  
  //         try {
  //           await axios.patch(
  //             `http://localhost:5000/api/productData/editData/${id}`,
  //             updateFields
  //           );
  //         } catch (error) {
  //           console.error(`Failed to update product ${id}:`, error.response || error.message);
  //         }
  //       })
  //     );
  
  //     // Save form data to the database
  //     const response = await axios.post(
  //       "http://localhost:5000/api/orderDelivery/addData",
  //       formData
  //     );
  //     console.log("Data submitted successfully:", response.data);
  
  //     // Prepare WhatsApp message
  //     const productDetailsMessage = productDetails
  //       .map(
  //         (item) =>
  //           `${item.size} x ${item.quantity} = ₹ ${calculateTotalPrice(item)}.00`
  //       )
  //       .join("\n");
  
  //     const totalPrice = getTotalPrice();
  //     const packingHandlingCharges = 20;
  //     const grandTotal = totalPrice + packingHandlingCharges;
  
  //     // Formatting the message
  //     const message =
  //       `*Bhimrao Halwai Chikki*\n\n` +
  //       `${productDetails
  //         .map((item) => {
  //           const price = calculateTotalPrice(item);
  //           return `${item.size.padEnd(7, " ")} x ${item.quantity
  //             .toString()
  //             .padEnd(2, " ")} = ₹ ${price}.00`;
  //         })
  //         .join("\n")}\n` +
  //       `--------------------------------------\n` +
  //       `Total of product price            ₹ ${getTotalPrice()}.00\n` +
  //       `Packing & Handling Charges  ₹ ${20}.00\n` +
  //       `--------------------------------------\n` +
  //       `*Grand total  ₹ ${getGrandTotal()}.00*\n\n` +
  //       `*Delivery Details:*\n` +
  //       `Name: ${formData.firstName} ${formData.lastName}\n` +
  //       `Mobile Number: ${formData.mobileNo}\n` +
  //       `Address: ${formData.address}, ${formData.city}, ${formData.pincode}`;
  
  //     const phoneNumber = "9922393007";
  //     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  //     window.open(whatsappUrl, "_blank");
  
  //     // Remove product details from local storage
  //     localStorage.removeItem("productDetails");
  //     localStorage.removeItem("cart");
  //     localStorage.removeItem("grandTotal");
  //     setProductDetails([]);
  
  //     // Clear form data
  //     setFormData({
  //       firstName: "",
  //       lastName: "",
  //       pincode: "",
  //       mobileNo: "",
  //       city: "",
  //       address: "",
  //     });
  
  //     // Hide form and show success message
  //     setShowForm(false);
  //     setSuccessMessage("Your message has been sent via WhatsApp. Thank you...!");
  //   } catch (error) {
  //     console.error("Error submitting data:", error);
  //     setSuccessMessage("There was an error sending your message. Please try again.");
  //   }
  // };
  

  const handleWhatsAppClick = async () => {
    // Validate form data
    const isFormValid = Object.values(formData).every(value => value.trim() !== "");
    if (!isFormValid) {
        setSuccessMessage("Please fill Form.");
        return;
    }

    try {
        // Aggregate stock updates
        const stockUpdates = {};

        // Create a dictionary of updates for each product
        productDetails.forEach(item => {
            const id = item._id; // Use _id instead of id
            if (!id) {
                console.error(`Product ID (_id) is missing for item:`, item);
                return; // Skip this item if no ID is present
            }

            const stockKey = `${item.size}SizeStock`;

            if (!stockUpdates[id]) {
                stockUpdates[id] = {};
            }

            const product = productDetails.find(p => p._id === id);
            if (product) {
                const currentStock = product[stockKey] || 0;

                // Update the stock quantity
                stockUpdates[id][stockKey] = currentStock - item.quantity;
            }
        });

        // Log updates for debugging
        console.log("Stock updates:", stockUpdates);

        // Update stock for each product
        await Promise.all(
            Object.entries(stockUpdates).map(async ([id, updateFields]) => {
                console.log(`Updating product ${id} with data:`, updateFields); // Debug log

                try {
                    await axios.patch(
                        `http://bhimrao-halwai-chikki-backend.vercel.app/api/productData/editData/${id}`,
                        updateFields
                    );
                } catch (error) {
                    console.error(`Failed to update product ${id}:`, error.response || error.message);
                }
            })
        );

        // Save form data and product details to the database
        const response = await axios.post(
            "http://bhimrao-halwai-chikki-backend.vercel.app/api/orderDelivery/addData",
            {
                ...formData,
                products: productDetails.map(item => ({
                    size: item.size,
                    quantity: item.quantity,
                    price: calculateTotalPrice(item)
                }))
            }
        );
        console.log("Data submitted successfully:", response.data);

        // Prepare WhatsApp message
        const productDetailsMessage = productDetails
            .map(
                (item) =>
                    `${item.size} x ${item.quantity} = ₹ ${calculateTotalPrice(item)}.00`
            )
            .join("\n");

        const totalPrice = getTotalPrice();
        const packingHandlingCharges = 20;
        const grandTotal = totalPrice + packingHandlingCharges;

        // Formatting the message
        const message =
            `*Bhimrao Halwai Chikki*\n\n` +
            `${productDetails
              .map((item) => {
                const price = calculateTotalPrice(item);
                return `${item.size.padEnd(7, " ")} x ${item.quantity
                  .toString()
                  .padEnd(2, " ")} = ₹ ${price}.00`;
              })
              .join("\n")}\n` +
            `--------------------------------------\n` +
            `Total of product price            ₹ ${getTotalPrice()}.00\n` +
            `Packing & Handling Charges  ₹ ${20}.00\n` +
            `--------------------------------------\n` +
            `*Grand total  ₹ ${getGrandTotal()}.00*\n\n` +
            `*Delivery Details:*\n` +
            `Name: ${formData.firstName} ${formData.lastName}\n` +
            `Mobile Number: ${formData.mobileNo}\n` +
            `Address: ${formData.address}, ${formData.city}, ${formData.pincode}`;

        const phoneNumber = "9922393007";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, "_blank");

        // Remove product details from local storage
        localStorage.removeItem("productDetails");
        localStorage.removeItem("cart");
        localStorage.removeItem("grandTotal");
        setProductDetails([]);

        // Clear form data
        setFormData({
            firstName: "",
            lastName: "",
            pincode: "",
            mobileNo: "",
            city: "",
            address: "",
        });

        // Hide form and show success message
        setShowForm(false);
        setSuccessMessage("Your message has been sent via WhatsApp. Thank you...!");
    } catch (error) {
        console.error("Error submitting data:", error);
        setSuccessMessage("There was an error sending your message. Please try again.");
    }
};

  

  const handleCallClick = () => {
    const phoneNumber = "9922393007";
    window.location.href = `tel:${phoneNumber}`;
    setSuccessMessage("Dialing the phone number...");
  };


  
  return (
    <>
<Navbar/>
    <div className="container mx-auto lg:mt-20 md:mt-10 mt-16 max-w-5xl py-4 text-xs lg:text-base md:text-sm">
        <h2 className="text-2xl font-bold mb-4 text-orange-700 px-6">
          Bhimrao Halwai Chikki
        </h2>

        {showForm ? (
          <div className="flex flex-col md:flex-row">
            <form className="space-y-4 px-6 bg-white rounded-lg w-full md:w-1/2">
              <input
                type="text"
                className="w-full px-4 py-2 capitalize border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleOnChange}
                required
              />
              <input
                type="text"
                className="w-full px-4 py-2 border capitalize rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleOnChange}
                required
              />
              <input
                type="text"
                maxLength={10}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Mobile Number"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleOnChange}
                required
              />
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleOnChange}
                required
              />
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleOnChange}
                required
              />
              <input
                type="text"
                className="w-full px-4 py-2 border capitalize rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleOnChange}
                required
              />
              <input
                type="text"
                className="w-full px-4 py-2 text-black border capitalize rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Maharashtra"
                readOnly
                required
              />
              <button
                onClick={handleCallClick}
                className="mt-5 text-base p-3.5 w-full bg-blue-100 hover:bg-blue-200 text-blue-800 border border-blue-300 rounded-lg"
              >
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                Call Us
              </button>
            </form>
            <div className="grid grid-cols-1 gap-3 w-full md:w-1/2 h-fit lg:p-0 md:p-2 p-2 lg:mt-0 md:mt-0 mt-5">
              {productDetails.map((item, index) => (
                <div
                  key={index}
                  className="border lg:p-4 md:p-3 p-1 rounded-lg flex items-center justify-between"
                >
                  <div className="flex relative flex-row lg:flex-row md:flex-row justify-between">
                    <div className="h-16 w-16">
                      <img
                        alt="product"
                        className="object-cover w-full h-full rounded-md"
                        src="https://images.herzindagi.info/image/2022/Jan/health-benefits-of-jaggery-peanuts-chikki.jpg" // Replace with actual image URL if available
                      />
                    </div>
                    <div className="flex flex-col ml-4">
                      <p>
                        Size: <span className="font-semibold">{item.size}</span>
                      </p>
                      <div className="w-5 h-5 items-center border border-gray-800 flex justify-center text-center absolute left-12 -top-2 bg-gray-50 rounded-full align-middle">
                        <span className="items-center text-xs">
                          {item.quantity}
                        </span>
                      </div>
                      <p>
                        <span className="">{getNetWeight(item.size)}</span>
                      </p>
                    </div>
                  </div>
                  <p>
                    <span className="">Rs {calculateTotalPrice(item)}.00</span>
                  </p>
                </div>
              ))}
              <div className="grid grid-cols-1 mt-1 h-fit">
                <div className="border lg:p-4  md:p-3 p-1 rounded-lg flex items-center justify-between">
                  <div className="flex justify-between">
                    <div className="h-16 w-16 border">
                      <img
                        alt="product"
                        className="object-cover w-full h-full rounded-md"
                        src="./images/box.png" // Replace with actual image URL if available
                      />
                    </div>
                    <div className="flex flex-col lg:ml-4 md:ml-3 ml-1 mt-5">
                      <p>
                        <span className="">Packing & Handling Charges</span>
                      </p>
                    </div>
                  </div>
                  <p className="-mt-1">
                    <span >Rs 20.00</span>
                  </p>
                </div>
                <div className="mt-4 text-right">
                  <h3 className="lg:text-xl md:text-base text-sm font-semibold">
                    Total: <span className="text-xs mr-2">INR</span> ₹{" "}
                    {getGrandTotal()}.00
                  </h3>
                </div>
              </div>
              <div className="flex h-fit">
                <button
                  onClick={handleWhatsAppClick}
                  className="lg:mt-5  md:mt-3 mt-1 p-3 flex w-full justify-center bg-green-100 hover:bg-green-200 text-green-800 border border-green-300 rounded-lg"
                >
                  <img
                    src="./images/wp-bg.png"
                    alt=""
                    className="w-8 -mt-1 h-8 lg:mr-2 md:mr-2 mr-1"
                  />
                  <span className="text-base">Send to WhatsApp</span>
                </button>
              </div>
              {successMessage && (
                <div className="mt-4  absolute left-4 bottom-4 border rounded-lg">
                  <p
                    className={`${
                      successMessage.includes("error")
                        ? "bg-red-100 text-red-800 border-red-300 p-5"
                        : "bg-green-100 text-green-800 border-green-300 p-5"
                    }`}
                  >
                    {successMessage}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl font-semibold mb-4">{successMessage}</p>
            <Link href={"/orderNow"}>
              <button className="bg-orange-50 hover:bg-red-100 text-orange-800 px-4 py-2 rounded-md mt-2">
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckBox;





