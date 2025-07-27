import { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

// Reusable color picker component that syncs text input and color swatch
interface Props {
  // Current hex color value (e.g. "ff0000")
  value?: string;
  // Callback to notify parent of color changes
  onPickerChange: (color: string) => void;
}

const ColorPicker = ({ value, onPickerChange }: Props) => {
  return (
    <div className="relative">
      {/* Text input prefixed with “#” for hex code entry */}
      <div className="flex flex-row items-center">
        <p>#</p>
        <HexColorInput
          color={value}
          onChange={onPickerChange}
          className="h-full flex-1 bg-transparent font-ibm-plex-sans outline-none"
        />
      </div>
      {/* Interactive color swatch picker */}
      <HexColorPicker color={value} onChange={onPickerChange} />
    </div>
  );
};

export default ColorPicker;
