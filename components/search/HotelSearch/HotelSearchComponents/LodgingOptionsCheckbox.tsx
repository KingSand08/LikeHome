"use client";
import {
  HotelsSearchLodgingOptions,
  HotelsSearchLodgingOptionsType,
} from "@/lib/rapid-hotel-api/zod/hotel-search-schemas";
import TemplateCheckbox from "../../Templates-UI/TemplateCheckbox";

type LodgingOptionsCheckboxProps = {
  selectedOptions: HotelsSearchLodgingOptionsType[];
  onChange: (options: HotelsSearchLodgingOptionsType[]) => void;
};

const LodgingOptionsCheckbox: React.FC<LodgingOptionsCheckboxProps> = ({
  selectedOptions,
  onChange,
}) => {
  return (
    <TemplateCheckbox
      title="Select Lodging Options"
      options={
        [...HotelsSearchLodgingOptions] as HotelsSearchLodgingOptionsType[]
      }
      selectedOptions={selectedOptions}
      onChange={onChange}
      selectedOptionsLimit={3}
    />
  );
};

export default LodgingOptionsCheckbox;
