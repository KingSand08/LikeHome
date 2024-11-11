"use client";
import {
  HotelsSearchAmenitiesOptions,
  HotelsSearchAmenitiesOptionsType,
} from "@/lib/rapid-hotel-api/zod/hotel-search-schemas";
import TemplateCheckbox from "../../Templates-UI/TemplateCheckbox";

type AmenitiesCheckboxProps = {
  selectedOptions: HotelsSearchAmenitiesOptionsType[];
  onChange: (options: HotelsSearchAmenitiesOptionsType[]) => void;
};

const AmenitiesCheckbox: React.FC<AmenitiesCheckboxProps> = ({
  selectedOptions,
  onChange,
}) => {
  return (
    <TemplateCheckbox
      title="Select Amenities Options"
      options={
        [...HotelsSearchAmenitiesOptions] as HotelsSearchAmenitiesOptionsType[]
      }
      selectedOptions={selectedOptions}
      onChange={onChange}
    />
  );
};

export default AmenitiesCheckbox;
