"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import cabinsData from "../../../src/data/cabins.json";
import { useCart } from "../../context/CartContext";
import ImageCarousel from "../../../src/components/ImageCarousel";

type Cabin = typeof cabinsData[number];

interface PageProps {
  params: {id : string};
}

export default function CabinDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const cabin = cabinsData.find((c)=> c.id.toString() === params.id);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });

  if (!cabin) return <p>Cabin not found</p>

  const getNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const today = new Date().toISOString().split("T")[0];
  const nights = getNights();
  const totalPrice = nights * (cabin?.pricePerNight || 0);

  const handleAddToCartAndContinue = () => {
    addToCart({
      id: cabin.id,
      type: "cabin",
      name: cabin.name,
      price: totalPrice,
      nights,
      guests,
    });
    router.push("/what-we-offer")
  };

  const guestSummary = Object.entries(guests)
  .filter(([_, count])=> count > 0)
  .map(([type, count]) => `${count} ${type}`)
  .join(", ");

  return (
    <div className="flex justify-center relative px-4 py-6">
      <button className="absolute underline top-6 left-6 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
      onClick={() => router.push("/what-we-offer")}
      >
        ← Volver
      </button>
                    <div className="bg-white rounded-lg max-w-2xl w-full px-4 py-6 relative">                 
                        <div className="grid grid-cols-2 gap-2 mb-4 h-66">
                            <div>
                                <img src={cabin.images[0]} alt={cabin.name} className="w-full h-66 object-cover rounded"
                                />
                            </div>
                            <div className="grid grid-rows-2 gap-2">
                                <img src={cabin.images[1] || cabin.images[0]} alt={`${cabin.name} extra`} className="w-full h-32 object-cover rounded" />
                                <img src={cabin.images[2] || cabin.images[0]} alt={`${cabin.name} extra`} className="w-full h-32 object-cover rounded" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{cabin.name}</h3>
                        <p className="text-green-600 font-semibold mb-4">
                            From ${cabin.pricePerNight} / night
                        </p>
                        <h4 className="text-xl font-semibold mb-2">About this space</h4>
                        <p className="text-gray-700 mb-4">{cabin.details?.about}</p>

                        <h4 className="text-xl font-semibold mb-2">The space</h4>
                        <p className="text-gray-700 mb-4">{cabin.details?.space}</p>

                        <h4 className="text-xl font-semibold mb-2">Amenities</h4>
                        <ul className="list-disc list-inside mb-4 text-gray-700 grid grid-cols-2 gap-x-4">
                            {cabin.amenities.map((amenity,i)=>(
                                <li key={i}>{amenity}</li>
                            ))}
                        </ul>
                        
                        <h4 className="text-xl font-semibold mb-2">Where you'll sleep</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                           {cabin.details?.bedrooms.map((room,idx)=> (
                            
                               <div className="border rounded p-3 bg-gray-50" key={idx}>
                                <p className="font-semibold">{room.name}</p>
                                <p className="text-gray-600">{room.beds}</p>
                            </div>
                            ))} 
                        </div>

                        <h4 className="text-xl font-semibold mb-2">House Rules</h4>
                        <p className="text-gray-700 mb-4">{cabin.details?.rules}</p>

                        <p className="text-gray-500 mb-4 text-sm">Surface area: {cabin.details?.surface}</p>
                        <p className="text-sm text-gray-500 mb-6">Location: {cabin.details?.location}</p>
                        
                        <div className="mb-4 border p-4 rounded shadow-sm">
                                    <p className="text-green-600 font-semibold mb-2">
                                        ${cabin?.pricePerNight} USD <span className="text-gray-600">/ night</span>
                                    </p>

                                    <div className="flex flex-col">
                                        <label htmlFor="" className="text-sm font-medium">Check-in</label>
                                        <input type="date"
                                        min={today}
                                        value={checkIn}
                                        className="border rounded p-2"
                                        onChange={(e)=> setCheckIn(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="" className="text-sm font-medium">Check-out</label>
                                        <input type="date"
                                        value={checkOut}
                                        min={checkIn ? checkIn : today}
                                        className="border rounded p-2"
                                        onChange={(e)=> setCheckOut(e.target.value)}
                                        />
                                    </div>

                                    {nights > 0 && (
                                      <p className="mt-2 text-gray-700 font-semibold">
                                        ${cabin?.pricePerNight} x {nights} nights = ${totalPrice} USD
                                      </p>
                                    )}
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
                                        <p>${cabin?.pricePerNight} USD x {nights} nights</p>
                                        <p className="font-bold">Total: ${totalPrice} USD</p>
                                        <p className="text-xs text-gray-500">
                                            Check-in {checkIn} - Checkout {checkOut}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {guestSummary || "Select the number of guests"}
                                        </p>
                                    </div>
                                )}

                        <button 
                            className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                            onClick={handleAddToCartAndContinue}
                            disabled={nights=== 0}
                        >
                            Add to basket and continue planning your adventure
                        </button>
                    </div>
                </div>
  )
}