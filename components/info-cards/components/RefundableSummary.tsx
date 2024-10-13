import React from "react";
import { RiRefund2Fill } from "react-icons/ri";

interface RefundableSummaryProps {
  isRefundable: boolean;
}

const RefundableSummary = ({ isRefundable }: RefundableSummaryProps) => {
  return (
    <div className={`flex flex-row items-center`}>
      <p>{`${isRefundable ? `Fully` : `Not`} Refundable`}</p>
      <RiRefund2Fill className="text-xl" />
    </div>
  );
};

export default RefundableSummary;
