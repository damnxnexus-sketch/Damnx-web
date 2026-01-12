"use client";

import { useEffect, useState } from "react";

export default function IntroLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const text = "DAMNX SOLUTION ";
  const radius = 40; // small & tight circle
  const size = 80; // container size

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "black",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Local animation */}
      <style>{`
        @keyframes rotateCircle {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div
        style={{
          position: "relative",
          width: size,
          height: size,
        }}
      >
        {/* Rotating text wrapper */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            animation: "rotateCircle 8s linear infinite",
          }}
        >
          {text.split("").map((char, i) => {
            const angle = (360 / text.length) * i;

            return (
              <span
                key={i}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: `
                    rotate(${angle}deg)
                    translateY(-${radius}px)
                  `,
                  transformOrigin: "center",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  color: "#f5f5f5",
                  fontFamily:
                    "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                  whiteSpace: "pre",
                }}
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
