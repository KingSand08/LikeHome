"use client";
import {
  HotelsSearchMealPlanOptions,
  HotelsSearchMealPlanOptionsType,
} from "@/lib/rapid-hotel-api/zod/hotel-search-schemas";
import TemplateCheckbox from "../../Templates-UI/TemplateCheckbox";

type MealPlanCheckboxProps = {
  selectedOptions: HotelsSearchMealPlanOptionsType[];
  onChange: (options: HotelsSearchMealPlanOptionsType[]) => void;
};

const MealPlanCheckbox: React.FC<MealPlanCheckboxProps> = ({
  selectedOptions,
  onChange,
}) => {
  return (
    <TemplateCheckbox
      title="Select Meal Plan Options"
      options={
        [...HotelsSearchMealPlanOptions] as HotelsSearchMealPlanOptionsType[]
      }
      selectedOptions={selectedOptions}
      onChange={onChange}
    />
  );
};

export default MealPlanCheckbox;
