const plugin = require("tailwindcss/plugin")

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: "#b986ff",
        secondary: "#b986ff",
        background: "#111111",
        "background-light": "#222222",
        "text-primary": "#dddddd",
        "text-secondary": "#b7b1c9",
        blur: "#b99ee7",
        transparent: "transparent",
        "border-color": "#ffffff10"
      },
      fontFamily: {
        inter: ["Inter"]
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".btn": {
          width: "100%",
          minHeight: "3rem",
          borderRadius: "0.75rem",
          color: "#ffffff",
          fontWeight: "500",
          fontSize: "0.875rem",
          background:
            "radial-gradient(#ffffff12, #ffffff06), radial-gradient(ellipse at bottom, #b99ee740, transparent)",
          backdropFilter: "blur(0.25rem)",
          borderWidth: "1px",
          borderColor: "#ffffff10",
          transitionDuration: "300ms",
          "&:hover": {
            boxShadow: "inset 0 1rem 2rem 0 #ffffff10"
          }
        }
      })
    })
  ]
}
