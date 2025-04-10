"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CarCard from "./components/CarCard";
import LoadingIcon from "./components/Loading";
import FilterBar from "./components/FilterBar";
import DarkModeToggle from "./components/DarkModeToggle";

import Car from "../types/Car";
import Link from "next/link";

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");
  const [selectedSeating, setSelectedSeating] = useState("");
  const [wishlist, setWishlist] = useState<string[]>([]);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6;
  const router = useRouter();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("/data/cars.json");
        const data = await res.json();
        setCars(data);
        setFilteredCars(data);
      } catch (error) {
        console.error("Failed to fetch cars", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();

    // Restore wishlist on page load
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const storedWishlist = localStorage.getItem("wishlist");
        if (storedWishlist) {
          setWishlist(JSON.parse(storedWishlist));
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Initial load
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    let result = cars;

    if (selectedBrand) {
      result = result.filter((car) => car.brand === selectedBrand);
    }

    if (selectedFuel) {
      result = result.filter((car) => car.fuelType === selectedFuel);
    }

    if (selectedSeating) {
      result = result.filter(
        (car) => car.seatingCapacity === Number(selectedSeating)
      );
    }

    if (minPrice) {
      result = result.filter((car) => car.price >= Number(minPrice));
    }

    if (maxPrice) {
      result = result.filter((car) => car.price <= Number(maxPrice));
    }

    setFilteredCars(result);
    setCurrentPage(1);
  }, [selectedBrand, selectedFuel, minPrice, maxPrice, selectedSeating, cars]);

  const uniqueBrands = [...new Set(cars.map((car) => car.brand))];
  const uniqueFuels = [...new Set(cars.map((car) => car.fuelType))];
  const uniqueSeatingCapacities = [
    ...new Set(cars.map((car) => car.seatingCapacity)),
  ].sort((a, b) => a - b);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  const toggleWishlist = (carId: string) => {
    const updated = wishlist.includes(carId)
      ? wishlist.filter((id) => id !== carId)
      : [...wishlist, carId];

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <main className="px-24 py-28 bg-white text-black">
      <h1 className="text-5xl font-bold mb-6">Car Finder</h1>
      <FilterBar
        brands={uniqueBrands}
        fuelTypes={uniqueFuels}
        selectedBrand={selectedBrand}
        seatingOptions={uniqueSeatingCapacities}
        selectedFuel={selectedFuel}
        selectedSeating={selectedSeating}
        onBrandChange={setSelectedBrand}
        onFuelChange={setSelectedFuel}
        onSeatingChange={setSelectedSeating}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
      />
      <div>
        <DarkModeToggle />
        <Link
          href="/wishlist"
          className=" ml-4 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          View Wishlist
        </Link>
      </div>

      {loading ? (
        // <p>Loading cars...</p>
        <div className="flex items-center justify-center">
          <LoadingIcon />
        </div>
      ) : (
        <div className="px-16 py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                isWishlisted={wishlist.includes(car.id)}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </div>
          <div className="flex justify-center items-center mt-8 gap-2">
            <button
              className="px-4 py-2 rounded-md bg-gray-300 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {Array.from(
              { length: Math.ceil(filteredCars.length / carsPerPage) },
              (_, index) => (
                <button
                  key={index + 1}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              )
            )}

            <button
              className="px-4 py-2 rounded-md bg-gray-300 disabled:opacity-50"
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(
                    prev + 1,
                    Math.ceil(filteredCars.length / carsPerPage)
                  )
                )
              }
              disabled={
                currentPage === Math.ceil(filteredCars.length / carsPerPage)
              }
            >
              Next
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
