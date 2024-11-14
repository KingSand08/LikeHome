"use client";
import {
  HotelsSearchPaymentTypeOptions,
  HotelsSearchPaymentTypeOptionsType,
} from "@/lib/rapid-hotel-api/zod/hotel-search-schemas";
import TemplateCheckbox from "../../Templates-UI/TemplateCheckbox";

type PaymentTypeCheckboxProps = {
  selectedOptions: HotelsSearchPaymentTypeOptionsType[];
  onChange: (options: HotelsSearchPaymentTypeOptionsType[]) => void;
};

const PaymentTypeCheckbox: React.FC<PaymentTypeCheckboxProps> = ({
  selectedOptions,
  onChange,
}) => {
  return (
    <TemplateCheckbox
      title="Select Payment Type Options"
      options={
        [
          ...HotelsSearchPaymentTypeOptions,
        ] as HotelsSearchPaymentTypeOptionsType[]
      }
      selectedOptions={selectedOptions}
      onChange={onChange}
    />
  );
};

export default PaymentTypeCheckbox;
