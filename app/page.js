import MainPage from "./mainPage/page";

export default function Home() {
  return (
    <>
      <MainPage />
    </>
  );
}




// "use client";
// import Navbar from "@/components/Navbar";
// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const CheckBox = () => {
//   const [productDetails, setProductDetails] = useState([]);
//   const [data, setData] = useState([]);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     pincode: "",
//     mobileNo: "",
//     city: "",
//     companyName: "",
//     address: "",
//   });

//   useEffect(() => {
//     const storedProductDetails =
//       JSON.parse(localStorage.getItem("productDetails")) || [];
//     setProductDetails(storedProductDetails);
//   }, []);

//   const calculateTotalPrice = (item) => {
//     switch (item.size) {
//       case "small":
//         return item.smallSizeRs * item.quantity;
//       case "medium":
//         return item.mediumSizeRs * item.quantity;
//       case "large":
//         return item.largeSizeRs * item.quantity;
//       default:
//         return 0;
//     }
//   };

//   const getTotalPrice = () => {
//     return productDetails.reduce(
//       (total, item) => total + calculateTotalPrice(item),
//       0
//     );
//   };

//   const getNetWeight = (size) => {
//     switch (size) {
//       case "small":
//         return "20g";
//       case "medium":
//         return "125g";
//       case "large":
//         return "250g";
//       default:
//         return "N/A";
//     }
//   };

//   const getGrandTotal = () => {
//     const totalPrice = getTotalPrice();
//     const packingHandlingCharges = 20; // Fixed charge for Packing & Handling
//     return totalPrice + packingHandlingCharges;
//   };

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((previous) => ({
//       ...previous,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/orderDelivery/addData",
//         formData
//       );
//       console.log("Data submitted successfully:", response.data);
//       // Optionally clear the form or show a success message
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       // Optionally show an error message
//     }
//   };




  

//   const handleWhatsAppClick = () => {
//     const productDetailsMessage = productDetails
//       .map(
//         (item) =>
//           `${item.size}  x  ${item.quantity}  =  ₹ ${calculateTotalPrice(item)}.00`
//       )
//       .join("\n");
  
//     const totalPrice = getTotalPrice();
//     const packingHandlingCharges = 20;
//     const grandTotal = totalPrice + packingHandlingCharges;
  
//     const message = `Bhimrao Halwai Chikki\n\n${productDetailsMessage}\n--------------------------------------\nTotal of product price            ₹ ${totalPrice}.00\nPacking & Handling Charges  ₹ ${packingHandlingCharges}.00\n--------------------------------------\nGrand total  ₹ ${grandTotal}.00`;
  
//     const phoneNumber = "9922393007";
//     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
//       message
//     )}`;
  
//     window.open(whatsappUrl, "_blank");
//   };
  

//   return (
//     <>
//       <Navbar />
//       <div className="container mx-auto mt-8 max-w-5xl">
//         <h2 className="text-2xl font-bold mb-4">Bhimrao Halwai Chikki</h2>

//         <div className="flex flex-col md:flex-row">
//           <form
//             className="space-y-4 px-6 bg-white rounded-lg w-full md:w-1/2"
//             onSubmit={handleSubmit}
//           >
//             <input
//               type="text"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="First Name"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleOnChange}
//               required
//             />
//             <input
//               type="text"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Last Name"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleOnChange}
//               required
//             />
//             <input
//               type="text"
//               maxLength={10}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Mobile Number"
//               name="mobileNo"
//               value={formData.mobileNo}
//               onChange={handleOnChange}
//               required
//             />
//             <input
//               type="text"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Address"
//               name="address"
//               value={formData.address}
//               onChange={handleOnChange}
//               required
//             />
//             <input
//               type="number"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Pincode"
//               name="pincode"
//               value={formData.pincode}
//               onChange={handleOnChange}
//               required
//             />
//             <input
//               type="text"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="City"
//               name="city"
//               value={formData.city}
//               onChange={handleOnChange}
//               required
//             />
//             <input
//               type="text"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Company Name"
//               name="companyName"
//               value={formData.companyName}
//               onChange={handleOnChange}
//               required
//             />
//             <button
//               type="submit"
//               className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               Submit
//             </button>
//           </form>
//           <div className="grid grid-cols-1 gap-3 w-full md:w-1/2">
//             {productDetails.map((item, index) => (
//               <div
//                 key={index}
//                 className="border p-4 rounded-lg flex items-center justify-between"
//               >
//                 <div className="flex relative flex-col md:flex-row justify-between">
//                   <div className="h-16 w-16">
//                     <img
//                       alt="product"
//                       className="object-cover w-full h-full rounded-md"
//                       src="https://images.herzindagi.info/image/2022/Jan/health-benefits-of-jaggery-peanuts-chikki.jpg" // Replace with actual image URL if available
//                     />
//                   </div>
//                   <div className="flex flex-col ml-4">
//                     <p>
//                       Size: <span className="font-semibold">{item.size}</span>
//                     </p>
//                     <div className="w-5 h-5 items-center border border-gray-800 flex justify-center text-center absolute left-12 -top-2 bg-gray-50 rounded-full align-middle">
//                       <span className="items-center text-xs">
//                         {item.quantity}
//                       </span>
//                     </div>
//                     <p>
//                       <span className="">{getNetWeight(item.size)}</span>
//                     </p>
//                   </div>
//                 </div>
//                 <p>
//                   <span className="">Rs {calculateTotalPrice(item)}.00</span>
//                 </p>
//               </div>
//             ))}
//             <div className="grid grid-cols-1 mt-1">
//               <div className="border p-4 rounded-lg flex items-center justify-between">
//                 <div className="flex justify-between">
//                   <div className="h-16 w-16 border">
//                     <img
//                       alt="product"
//                       className="object-cover w-full h-full rounded-md"
//                       src="./images/box.png" // Replace with actual image URL if available
//                     />
//                   </div>
//                   <div className="flex flex-col ml-4 mt-4">
//                     <p>
//                       <span className=""> Packing & Handling Charges</span>
//                     </p>
//                   </div>
//                 </div>
//                 <p>
//                   <span className="">Rs 20.00</span>
//                 </p>
//               </div>
//               <div className="mt-4 text-right">
//                 <h3 className="text-xl font-semibold">
//                   Total: <span className="text-xs mr-2">INR</span> ₹{" "}
//                   {getGrandTotal()}.00
//                 </h3>
//               </div>
//             </div>
//             <button
//               onClick={handleWhatsAppClick}
//               className="mt-4 px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
//             >
//               Send to WhatsApp
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CheckBox;
// ``
