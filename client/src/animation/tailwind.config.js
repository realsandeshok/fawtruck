module.exports = {
    theme: {
      extend: {
        animation: {
          slideInLeft: "slideInLeft 1s ease-out",
          slideInRight: "slideInRight 1s ease-out",
        },
        keyframes: {
          slideInLeft: {
            "0%": { transform: "translateX(-100%)", opacity: 0 },
            "100%": { transform: "translateX(0)", opacity: 1 },
          },
          slideInRight: {
            "0%": { transform: "translateX(100%)", opacity: 0 },
            "100%": { transform: "translateX(0)", opacity: 1 },
          },
        },
      },
    },
    plugins: [],
  };
  