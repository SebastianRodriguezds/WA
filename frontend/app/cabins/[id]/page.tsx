"use client";
import { useState } from "react";
import cabinsData from "../../../src/data/cabins.json";

interface CabinDetailProps {
  params: { id: string };
}

export default function CabinDetailPage({ params }: CabinDetailProps) {
  const { id } = params;
  const cabin = cabinsData.find(c => c.id === Number(id));

  const [selectedDate, setSelectedDate] = useState("");
  const [nights, setNights] = useState(2);
  const [error, setError] = useState("");
  const [selectedCabin, setSelectedCabin] = useState<string>("");
  const [showPopup, setShowPopup] = useState(false);

  if (!cabin) return <p className="text-center mt-12">Cabin not found</p>;

  const handleAddReservation = () => {
    if (nights < 2) {
      setError("The minimum number of nights is 2 for logistical reasons.");
      return;
    }
    setError("");
    alert(`Reservation added for ${nights} nights at ${selectedCabin || cabin.name} starting ${selectedDate}`);
  };

  return (
    <main className="max-w-6xl mx-auto p-8">

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
    {cabin.images.map((img, idx) => (
      <div key={idx} className="relative rounded-lg overflow-hidden">
        <h3 className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm font-semibold">
          {cabin.name}
        </h3>
        <img
          src={img || `https://via.placeholder.com/400x250?text=${cabin.name}+Image+${idx+1}`}
          alt={`${cabin.name} - Image ${idx + 1}`}
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-2 left-2 flex gap-2">
          <button
            className={`bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 transition ${
              selectedCabin === cabin.name ? "opacity-70" : ""
            }`}
            onClick={() => setSelectedCabin(cabin.name)}
          >
            Select
          </button>
          <button
            className="bg-black text-white py-1 px-3 rounded hover:bg-blue-700 transition"
            onClick={() => setShowPopup(true)}
          >
            Info
          </button>
        </div>
      </div>
    ))}
  </div>

      {/* RESERVATION FORM */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block mb-1 font-semibold">Check-in Date*</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Number of Nights</label>
            <input
              type="number"
              min={2}
              value={nights}
              onChange={(e) => {
                const value = Number(e.target.value);
                setNights(value >= 2 ? value : 2);
              }}
              placeholder="Minimum 2 nights for logistical reasons"
              className="w-full border rounded p-2"
            />
            <p className="text-gray-500 text-sm mt-1">
              Minimum of 2 nights is required for logistical reasons such as distance and preparation time.
            </p>
            {error && <p className="text-red-600 mt-1">{error}</p>}
          </div>

          {/* CABIN SELECTION INPUT */}
          <div>
            <label className="block mb-1 font-semibold">Selected Cabin</label>
            <input
              type="text"
              value={selectedCabin}
              onChange={(e) => setSelectedCabin(e.target.value)}
              placeholder="Select a cabin or choose from the list"
              className="w-full border rounded p-2"
              list="cabins-list"
            />
            {/* DROPDOWN */}
            {!selectedCabin && (
              <datalist id="cabins-list">
                {cabinsData.map((c) => (
                  <option key={c.id} value={c.name} />
                ))}
              </datalist>
            )}
          </div>

          <button
            type="button"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            onClick={handleAddReservation}
          >
            Add to Reservation
          </button>
        </form>
      </div>

  {showPopup && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold"
        onClick={()=> setShowPopup(false)}
        >
          x
        </button>
        <h2 className="text-xl font-bold mb-4">{cabin.name} Info</h2>
        <p>{cabin.description}</p>
        <p className="mt-2">Capacity: {cabin.capacity} people</p>
        <p>Amenities: {cabin.amenities.join(", ")}</p>
      </div>
    </div>
  )}       
    

    </main>
  );
}
