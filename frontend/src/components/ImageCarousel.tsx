"use client"
import { useState } from "react"
import { FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

interface ImageCarouselProps {
    images: string[]
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openModal = (index: number) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    const closeModal = () => setIsOpen(false);

    const prevImage = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextImage = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <>
            {/* Thumbnails */}
            <div className="grid grid-cols-[2fr_1fr] gap-5 mb-7 h-80">
                <div>
                    <img
                        src={images[0]}
                        alt="Cabin main"
                        className="w-full h-82 object-cover rounded cursor-pointer hover:scale-105 transition"
                        onClick={() => openModal(0)}
                    />
                </div>
                <div className="grid grid-rows-2 gap-2">
                    <img
                        src={images[1] || images[0]}
                        alt="Cabin extra 1"
                        className="w-full h-40 object-cover rounded cursor-pointer hover:scale-105 transition"
                        onClick={() => openModal(1)}
                    />
                    <img
                        src={images[2] || images[0]}
                        alt="Cabin extra 2"
                        className="w-full h-40 object-cover rounded cursor-pointer hover:scale-105 transition"
                        onClick={() => openModal(2)}
                    />
                </div>
            </div>

            {/* Modal */}
            {isOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    onClick={closeModal}
  >
      <button
        className="absolute top-5 right-5 flex items-center gap-2 text-white hover:text-gray-300 z-50"
        onClick={closeModal}
      >
        <XMarkIcon className="w-6 h-6" />
        <span className="text-base font-medium">Close</span>
      </button>
      
    <div
      className="relative p-4"
      onClick={(e) => e.stopPropagation()} // evitar cerrar al clickear dentro
    >
      {/* Close button */}

      {/* Image */}
      <div className="flex justify-center items-center">
        <button
          className="text-3xl text-white hover:text-gray-300 px-4"
          onClick={prevImage}
        >
          <ChevronLeftIcon className="w-6 h-6 text-white hover:text-gray-300" />
        </button>

        <img
          src={images[currentIndex]}
          alt={`Cabin image ${currentIndex}`}
          className="w-[600px] h-[400px] object-cover rounded"
        />

        <button
            className="text-3xl text-white hover:text-gray-300 px-4"
            onClick={nextImage}
        >
        <ChevronRightIcon className="w-6 h-6 text-white hover:text-gray-300" />
        </button>
      </div>
    </div>
  </div>
)}
        </>
    )
}