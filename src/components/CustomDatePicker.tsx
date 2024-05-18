import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  selectedDate: Date;
  onChange: (date: Date | null) => void;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onChange,
}) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      dateFormat="dd/MM/yyyy"
      placeholderText="Select Date"
      className="form-control" // Apply the same class as other inputs
    />
  );
};

export default CustomDatePicker;
