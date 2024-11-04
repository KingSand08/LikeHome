"use client";
import {
  HotelsSearchAccessibilityOptions,
  HotelsSearchAccessibilityOptionsType,
} from "@/lib/rapid-hotel-api/zod/hotel-search-schemas";
import TemplateCheckbox from "../../Templates-UI/TemplateCheckbox";

type AccessibilityCheckboxProps = {
  selectedOptions: HotelsSearchAccessibilityOptionsType[];
  onChange: (options: HotelsSearchAccessibilityOptionsType[]) => void;
};

const AccessibilityCheckbox: React.FC<AccessibilityCheckboxProps> = ({
  selectedOptions,
  onChange,
}) => {
  return (
    <TemplateCheckbox
      title="Select Accessibility Options"
      options={
        [
          ...HotelsSearchAccessibilityOptions,
        ] as HotelsSearchAccessibilityOptionsType[]
      }
      selectedOptions={selectedOptions}
      onChange={onChange}
    />
  );
};

export default AccessibilityCheckbox;
