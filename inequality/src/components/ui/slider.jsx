// src/components/ui/slider.jsx
import React, { useState } from 'react';

export function Slider({ defaultValue, min, max, step, onValueChange, className = '' }) {
  const [value, setValue] = useState(defaultValue[0]);
  
  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onValueChange([newValue]);
  };
  
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={handleChange}
      className={`slider ${className}`}
    />
  );
}