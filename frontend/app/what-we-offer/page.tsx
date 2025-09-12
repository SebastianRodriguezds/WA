"use client"
import { useState } from "react";
import cabinsData from "../../src/data/cabins.json";
import experiencesData from "../../src/data/experiences.json";
import experbundleData from "../../src/data/experbundle.json";
import { div, p } from "framer-motion/client";

type Cabin = typeof cabinsData[number];
type Experience = typeof experiencesData[number];
type Bundle = typeof experbundleData[number];

type CartItem = Cabin | Experience | Bundle;

export default function WhatWeOfferPage() {
    const displayedCabins = cabinsData.slice(0, 3);

    const [selectedCabin, setSelectedCabin] = useState<Cabin | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showCartButton, setShowCartButton] = useState(false);
    const [checkIn, setCheckIn] = useState<string>("");
    const [checkOut, setCheckOut] = useState<string>("");
    const [guests, setGuests] = useState<{ adults: number; children: number; infants: number, pets: number }>({
        adults: 1,
        children: 0,
        infants: 0,
        pets: 0,
    });

    const openModal = (cabin: Cabin) => setSelectedCabin(cabin);
    const closeModal = () => setSelectedCabin(null);

    const addToCart = (item: CartItem) => {
        setCart([...cart, item]);
        setIsCartOpen(true);
        setShowCartButton(true);
        closeModal();
    };
    const total = cart.reduce((acc, item: any) => acc + (item.pricePerNight || item.price || 0), 0);

    const getNights = () => {
        if (!checkIn || !checkOut) return 0;
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };
    const nights = getNights();
    const totalPrice = nights * (selectedCabin?.pricePerNight || 0);

    return (
        <div className="flex">
            {/* Contenido principal */}
            <main className="max-w-8xl mx-auto p-8 main-bg">
                <h1 className="text-3xl font-bold text-center mb-8">WHAT WE OFFER</h1>

                <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
                    Your adventure starts by choosing the days you'll stay in our cozy cabins, 
                    the perfect base to explore Potrerillos. From there, you can create your own personalized experience 
                    with activities adapted to your schedule and interests – mountains, lake, wine, and more await!
                </p>

                {/* Cabins */}
                <h2 className="text-2xl font-bold mb-6">Cabins</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {displayedCabins.map((cabin) => (
                        <div key={cabin.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src={cabin.images[0]} alt={cabin.name} className="w-full h-64 object-cover"/>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{cabin.name}</h3>
                                
                                

                                

                                <button 
                                    onClick={() => openModal(cabin)}
                                    className="w-full block text-center bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                                >
                                    More Info
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Experiences */}
                <h2 className="text-2xl font-bold mb-6">Experiences</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {experiencesData.map((exp) => (
                        <div key={exp.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src={exp.image} alt={exp.title} className="w-full h-48 object-cover"/>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
                                <p className="text-gray-700 mb-4">{exp.description.substring(0, 100)}...</p>
                                <button  
                                    onClick={() => addToCart(exp)}
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
                            <img src={bund.image} alt={bund.title} className="w-full h-48 object-cover"/>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{bund.title}</h3>
                                <p className="text-gray-700 mb-4">{bund.description.substring(0, 100)}...</p>
                                <button  
                                    onClick={() => addToCart(bund)}
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
                    {cart.map((item, index)=> (
                        <div className="mb-4 border-b pb-2" key={index}>
                            {"pricePerNight" in item ? (
                                <>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-green-600 font-semibold">${item.pricePerNight}</p>
                                </>
                            ): (
                                <>
                                    <p className="font-semibold">{item.title}</p>
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

            {/* Modal */}
            {selectedCabin && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto">
                    <div className="bg-white rounded-lg max-w-3xl w-full p-6 relative">
                        <button 
                            onClick={closeModal} 
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
                        >
                            &times;
                        </button>
                        <div className="grid grid-cols-2 gap-2 mb-4 h-66">
                            <div>
                                <img src={selectedCabin.images[0]} alt={selectedCabin.name} className="w-full h-66 object-cover rounded"
                                />
                            </div>
                            <div className="grid grid-rows-2 gap-2">
                                <img src={selectedCabin.images[1] || selectedCabin.images[0]} alt={`${selectedCabin.name} extra`} className="w-full h-32 object-cover rounded" />
                                <img src={selectedCabin.images[2] || selectedCabin.images[0]} alt={`${selectedCabin.name} extra`} className="w-full h-32 object-cover rounded" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{selectedCabin.name}</h3>
                        <p className="text-green-600 font-semibold mb-4">
                            From ${selectedCabin.pricePerNight} / night
                        </p>
                        <h4 className="text-xl font-semibold mb-2">About this space</h4>
                        <p className="text-gray-700 mb-4">{selectedCabin.details?.about}</p>

                        <h4 className="text-xl font-semibold mb-2">The space</h4>
                        <p className="text-gray-700 mb-4">{selectedCabin.details?.space}</p>

                        <h4 className="text-xl font-semibold mb-2">Amenities</h4>
                        <ul className="list-disc list-inside mb-4 text-gray-700 grid grid-cols-2 gap-x-4">
                            {selectedCabin.amenities.map((amenity,i)=>(
                                <li key={i}>{amenity}</li>
                            ))}
                        </ul>
                        
                        <h4 className="text-xl font-semibold mb-2">Where you'll sleep</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                           {selectedCabin.details?.bedrooms.map((room,idx)=> (
                            
                               <div className="border rounded p-3 bg-gray-50" key={idx}>
                                <p className="font-semibold">{room.name}</p>
                                <p className="text-gray-600">{room.beds}</p>
                            </div>
                            ))} 
                        </div>

                        <h4 className="text-xl font-semibold mb-2">House Rules</h4>
                        <p className="text-gray-700 mb-4">{selectedCabin.details?.rules}</p>

                        <p className="text-gray-500 mb-4 text-sm">Surface area: {selectedCabin.details?.surface}</p>
                        <p className="text-sm text-gray-500 mb-6">Location: {selectedCabin.details?.location}</p>
                        
                        <div className="mb-4 border p-4 rounded shadow-sm">
                                    <p className="text-green-600 font-semibold mb-2">
                                        ${selectedCabin?.pricePerNight} USD <span className="text-gray-600">/ night</span>
                                    </p>

                                    <div className="flex flex-col">
                                        <label htmlFor="" className="text-sm font-medium">Check-in</label>
                                        <input type="date"
                                        value={checkIn}
                                        className="border rounded p-2"
                                        onChange={(e)=> setCheckIn(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="" className="text-sm font-medium">Check-out</label>
                                        <input type="date"
                                        value={checkOut}
                                        className="border rounded p-2"
                                        onChange={(e)=> setCheckOut(e.target.value)}
                                        />
                                    </div>
                                </div>        
                        <div className="relative mb-2">
                                 <label htmlFor="" className="text-sm font-medium mt-4">Guest</label>
                                 <details className="border rounded p-2 cursor-pointer">
                                    <summary className="list-none">
                                        {guests.adults + guests.children + guests.infants + guests.pets} guests
                                    </summary>
                                    <div className="mt2 space-y-2">
                                        {["adults", "children", "infants", "pets"].map((type)=>(
                                            <div className="flex justify-between items-center" key={type}>
                                                <span className="capitalize">{type}</span>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        className="px-2 py-1 border rounded" 
                                                        onClick={()=> 
                                                            setGuests((prev)=> ({...prev, [type]: Math.max(prev[type as keyof typeof prev] - 1, 0)}))
                                                        }
                                                        >
                                                       -
                                                    </button>
                                                    <span>{guests[type as keyof typeof guests]}</span>
                                                    <button className="px-2 py-1 border rounded"
                                                    onClick={()=>
                                                        setGuests((prev) => ({...prev, [type]: prev[type as keyof typeof prev] + 1}))
                                                    }
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="flex justify-end mt-2">
                                            <button className="font-bold  underline px-3 py-2 rounded hover:bg-gray-300 transition"
                                            onClick={(e)=> {
                                                (e.target as HTMLElement).closest("details")!.removeAttribute("open");
                                            }}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                 </details>
                                </div>

                                {nights > 0 && (
                                    <div className="mt-3 text-sm text-gray-700">
                                        <p>${selectedCabin?.pricePerNight} USD x {nights} nights</p>
                                        <p className="font-bold">Total: ${totalPrice} USD</p>
                                        <p className="text-xs text-gray-500">
                                            Check-in {checkIn} - Checkout {checkOut}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Guest: {guests.adults} adults, {guests.children} children, {guests.infants} infants
                                        </p>
                                    </div>
                                )}

                        <button 
                            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                            onClick={() => addToCart(selectedCabin)}
                        >
                            Reserve Now
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
