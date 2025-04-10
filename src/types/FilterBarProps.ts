export default interface FilterBarProps {
  brands: string[];
  fuelTypes: string[];
  selectedBrand: string;
  selectedFuel: string;
  onBrandChange: (val: string) => void;
  onFuelChange: (val: string) => void;
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (val: string) => void;
  onMaxPriceChange: (val: string) => void;
  selectedSeating: string;
  onSeatingChange: (val: string) => void;
  seatingOptions: number[];
}
