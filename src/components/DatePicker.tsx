import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DateChangeHandler = (date: Date | null) => void;

function MyDatePicker({ onDateChange }: { onDateChange: DateChangeHandler }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const pickerRef = useRef<DatePicker>(null);

  const handleChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      onDateChange(date);
    }
  };

  const shiftDate = (days: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(d);
    onDateChange(d);
  };

  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <div className="date-nav">
        <button
          className="date-nav-arrow"
          onClick={() => shiftDate(-1)}
          aria-label="Previous day"
        >
          &#8249;
        </button>
        <button
          className="date-nav-label"
          onClick={() => pickerRef.current?.setOpen(true)}
        >
          {formattedDate}
        </button>
        <button
          className="date-nav-arrow"
          onClick={() => shiftDate(1)}
          aria-label="Next day"
        >
          &#8250;
        </button>
      </div>

      <DatePicker
        ref={pickerRef}
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="yyyy-MM-dd"
        withPortal
        customInput={<input style={{ display: "none" }} readOnly />}
      />
    </>
  );
}

export default MyDatePicker;
