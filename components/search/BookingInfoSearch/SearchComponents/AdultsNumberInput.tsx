"use client";
import { useState } from "react";
import TemplateInput from "../../Templates-UI/TemplateInput";
import {
  DEFAULT_MAX_ADULTS_NUMBER,
  DEFAULT_MIN_ADULTS_NUMBER,
} from "@/lib/rapid-hotel-api/constants/USER_OPTIONS";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type AdultsNumberInputProps = {
  selectedNumber: number;
  pricePerNight: number;
};

const numberRegex = /^\d*$/;

const AdultsNumberInput: React.FC<AdultsNumberInputProps> = ({
  selectedNumber,
  pricePerNight,
}) => {
  const [value, setValue] = useState(selectedNumber);
  const [open, onOpenChange] = useState(false);

  const handleInputChange = (inputValue: string) => {
    if (inputValue === "") {
      setValue(0);
    } else if (numberRegex.test(inputValue)) {
      const intValue = parseInt(inputValue);
      setValue(intValue);
    }
  };

  return (
    <div className="flex flex-row items-center">
      <TemplateInput
        title="Number of Adults"
        placeholder={`Enter number of adults (${DEFAULT_MIN_ADULTS_NUMBER}-${DEFAULT_MAX_ADULTS_NUMBER})`}
        regex={numberRegex}
        value={value.toString()}
        onChange={handleInputChange}
        required={true}
      />
      {selectedNumber != value && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogTrigger asChild>
            <Button
              className={
                value >= DEFAULT_MIN_ADULTS_NUMBER &&
                value <= DEFAULT_MAX_ADULTS_NUMBER
                  ? ""
                  : "btn-disabled cursor-not-allowed"
              }
            >
              Save
            </Button>
          </DialogTrigger>
          <DialogContent>
            {value > selectedNumber ? (
              <p>
                A charge of ${(value - selectedNumber) * pricePerNight} will be
                charged to the card on file.
              </p>
            ) : (
              <p>
                A reimbursement of ${(selectedNumber - value) * pricePerNight}{" "}
                will be credited to the card on file
              </p>
            )}
            <DialogFooter>
              <Button type="submit" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdultsNumberInput;
