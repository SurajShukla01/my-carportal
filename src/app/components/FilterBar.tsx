import FilterBarProps from "@/types/FilterBarProps";
const FilterBar = ({
  brands,
  fuelTypes,
  seatingOptions,
  selectedBrand,
  selectedFuel,
  selectedSeating,
  onBrandChange,
  onFuelChange,
  onSeatingChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: FilterBarProps) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6 items-center">
      {/* Brand */}
      <select
        value={selectedBrand}
        onChange={(e) => onBrandChange(e.target.value)}
        className="p-2 border rounded-xl"
      >
        <option value="">All Brands</option>
        {brands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>

      {/* Fuel Type */}
      <select
        value={selectedFuel}
        onChange={(e) => onFuelChange(e.target.value)}
        className="p-2 border rounded-xl"
      >
        <option value="">All Fuel Types</option>
        {fuelTypes.map((fuel) => (
          <option key={fuel} value={fuel}>
            {fuel}
          </option>
        ))}
      </select>
      <select
        value={selectedSeating}
        onChange={(e) => onSeatingChange(e.target.value)}
        className="p-2 border rounded-xl"
      >
        <option value="">All Seating</option>
        {seatingOptions.map((seat) => (
          <option key={seat} value={seat}>
            {seat} Seats
          </option>
        ))}
      </select>

      {/* Price Range */}
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => onMinPriceChange(e.target.value)}
        className="p-2 border rounded-xl w-32"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => onMaxPriceChange(e.target.value)}
        className="p-2 border rounded-xl w-32"
      />
    </div>
  );
};

export default FilterBar;
