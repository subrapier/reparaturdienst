"use client";

import { useEffect, useState } from "react";
import * as culori from "culori";

export default function AccentColor() {
  const [oklchString, setOklchString] = useState("oklch(0 0 0)");
  const [textColor, setTextColor] = useState("oklch(1 0 0)");
  useEffect(() => {
    const fetchAccentColor = async () => {
      const hex = "#ED0F35";
      // Convert directly to OKLCH
      const color = culori.oklch(culori.parse(hex));
      if (color) {
        const oklchString = `oklch(${color.l} ${color.c} ${color.h})`;
        setOklchString(oklchString);

        // Calculate text color based on lightness
        const textColor = color.l > 0.5 ? "oklch(0 0 0)" : "oklch(1 0 0)";
        setTextColor(textColor);
      }
    };

    fetchAccentColor();
  }, []);

  return (
    <style>
      {`
                :root {
                    --accent: ${oklchString} !important;
                    --text-accent: ${textColor} !important;
                }
                .dark {
                    --accent: ${oklchString} !important;
                    --text-accent: ${textColor} !important;
                }
            `}
    </style>
  );
}
