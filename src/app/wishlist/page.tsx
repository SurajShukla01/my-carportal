"use client";

import { useEffect, useState } from "react";
import CarCard from "../components/CarCard";
import Car from "../../types/Car";
import Link from "next/link";

const WishlistPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("/data/cars.json");
        const data = await res.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();

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

  const filteredCars = cars.filter((car) => wishlist.includes(car.id));

  const toggleWishlist = (carId: string) => {
    const updated = wishlist.includes(carId)
      ? wishlist.filter((id) => id !== carId)
      : [...wishlist, carId];

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <main className="px-24 py-28">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold mb-6">My Wishlist</h1>
        <Link
          href="/"
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Visit Home
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredCars.length === 0 ? (
        <p>No cars in wishlist yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              isWishlisted={wishlist.includes(car.id)}
              onToggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default WishlistPage;
