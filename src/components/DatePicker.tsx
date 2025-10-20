import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DateChangeHandler = (date: Date | null) => void;

function MyDatePicker({ onDateChange }: { onDateChange: DateChangeHandler }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    onDateChange(date); // notify parent
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleChange}
      dateFormat="yyyy-MM-dd"
      inline
    />
  );
}

export default MyDatePicker;
