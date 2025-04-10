import Image from "next/image";

interface Car {
  id: string;
  brand: string;
  model: string;
  price: number;
  fuelType: string;
  seatingCapacity: number;
  image: string;
}

interface CarCardProps {
  car: Car;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
}

const CarCard = ({ car, isWishlisted, onToggleWishlist }: CarCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all">
      <Image
        src={car.image}
        alt={`${car.brand} ${car.model}`}
        width={250}
        height={200}
        className="rounded-xl object-cover w-full"
      />
      <div className="flex justify-between">
        <div className="py-2">
          <h3 className="text-xl font-semibold mt-2">
            {car.brand} {car.model}
          </h3>
          <p className="text-sm text-gray-600">${car.price}</p>
          <p className="text-sm text-gray-600">
            {car.fuelType} | {car.seatingCapacity} Seater
          </p>
        </div>
        <div className="py-8 px-12">
          <button
            onClick={() => onToggleWishlist(car.id)}
            className={`text-2xl ${
              isWishlisted ? "text-red-500" : "text-gray-400"
            } hover:scale-110 transition-transform`}
          >
            ❤️
          </button>

          <button className="text-md font-semibold md:text-xl px-2 border-black cursor-pointer bg-gray-200 outline-blue-200 p-4">
            More Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
