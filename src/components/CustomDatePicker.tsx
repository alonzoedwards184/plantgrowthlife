import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomDatePickerProps {
  selectedDateString: string;
  onChange: (date: Date | null) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selectedDateString,
  onChange,
}) => {
  // Parse the dateString into a Date object
  const dateObject = new Date(selectedDateString);

  // Format the date as MM/DD/YYYY
  const formattedDate =
    ("0" + (dateObject.getMonth() + 1)).slice(-2) +
    "/" +
    ("0" + dateObject.getDate()).slice(-2) +
    "/" +
    dateObject.getFullYear();

  return (
    <div>
      <DatePicker
        selected={dateObject}
        onChange={onChange}
        dateFormat="MM/dd/yyyy" // Adjusted dateFormat to display as MM/DD/YYYY
        placeholderText="Select Date"
        className="form-control" // Apply the same class as other inputs
      />
      <div>Selected Date: {formattedDate}</div>
    </div>
  );
};

export default CustomDatePicker;
