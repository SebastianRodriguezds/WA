"use client"
import { useState } from "react";
import cabinsData from "../../src/data/cabins.json";
import experiencesData from "../../src/data/experiences.json";
import experbundleData from "../../src/data/experbundle.json";
import Link from "next/link";
import { useCart } from "../context/CartContext";


type Cabin = typeof cabinsData[number];
type Experience = typeof experiencesData[number];
type Bundle = typeof experbundleData[number];

type CartItem = Cabin | Experience | Bundle;

export default function WhatWeOfferPage() {
    const displayedCabins = cabinsData.slice(0, 3);

    const [selectedCabin, setSelectedCabin] = useState<Cabin | null>(null);
    const { cart, addToCart } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showCartButton, setShowCartButton] = useState(false);

    const total = cart.reduce((acc, item: any) => acc + (item.pricePerNight || item.price || 0), 0);

    return (
        <div className="flex">
  
            <main className="max-w-8xl mx-auto p-8 main-bg">
                <h1 className="text-3xl font-bold text-center mb-8">WHAT WE OFFER</h1>

                <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
                    Your adventure starts by choosing the days you'll stay in our cozy cabins,
                    the perfect base to explore Potrerillos. From there, you can create your own personalized experience
                    with activities adapted to your schedule and interests – mountains, lake, wine, and more await!
                </p>

                <h2 className="text-2xl font-bold mb-6">Cabins</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {displayedCabins.map((cabin) => (
                        <div key={cabin.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src={cabin.images[0]} alt={cabin.name} className="w-full h-64 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{cabin.name}</h3>
                                <Link href={`/cabins/${cabin.id}`}>
                                    <button className="w-full block text-center bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                                        More Info
                                    </button>
                                </Link>

                            </div>
                        </div>
                    ))}
                </div>


                <h2 className="text-2xl font-bold mb-6">Experiences</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {experiencesData.map((exp) => (
                        <div key={exp.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src={exp.image} alt={exp.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
                                <p className="text-gray-700 mb-4">{exp.description.substring(0, 100)}...</p>
                                <button
                                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                                >
                                    Reserve Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* packs */}
                <h2 className="text-2xl font-bold mb-6">Combine & Explore</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {experbundleData.map((bund: Bundle) => (
                        <div key={bund.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src={bund.image} alt={bund.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{bund.title}</h3>
                                <p className="text-gray-700 mb-4">{bund.description.substring(0, 100)}...</p>
                                <button
                                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                                >
                                    Reserve Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>


            {showCartButton && !isCartOpen && (
                <button className="fixed top-2 right-4 bg-green-600 text-white p-3 rounded-full shadow-lg z-50 hover:bg-green-700 transition"
                    onClick={() => setIsCartOpen(true)}
                >
                    🛒
                </button>
            )}


            {/* Sidebar / Cart */}
            {isCartOpen && (
                <aside className="w-4/12 ml-6 bg-gray-100 p-6 shadow-lg fixed top-24 right-0 h-auto">
                    <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        onClick={() => setIsCartOpen(false)}
                    >
                        &times;
                    </button>

                    <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
                    {cart.map((item, index) => (
                        <div className="mb-4 border-b pb-2" key={index}>
                            {"pricePerNight" in item ? (
                                <>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-green-600 font-semibold">${item.price}</p>
                                </>
                            ) : (
                                <>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-green-600 font-semibold">${item.price || 0}</p>
                                </>
                            )}
                        </div>
                    ))}
                    <hr className="my-4" />
                    <p className="text-xl font-bold">Total: ${total}</p>
                    <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                        Checkout
                    </button>
                </aside>
            )}
        </div>
    );
}
