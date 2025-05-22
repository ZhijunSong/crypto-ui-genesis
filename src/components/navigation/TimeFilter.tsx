
import React from "react";

type TimeOption = {
  label: string;
  value: string;
};

type TimeFilterProps = {
  options: TimeOption[];
  activeTime: string;
  onChange: (value: string) => void;
};

const TimeFilter: React.FC<TimeFilterProps> = ({
  options,
  activeTime,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-center space-x-2 py-2 bg-gmgn-bg">
      {options.map((option) => (
        <button
          key={option.value}
          className={`time-filter-button ${
            activeTime === option.value ? "active" : ""
          }`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default TimeFilter;
