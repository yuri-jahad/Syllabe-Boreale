import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  theme: {
    extend: {
      tokens: {
        fonts: {
     
        },
        // Vous pouvez aussi définir des poids spécifiques si nécessaire
      },
    },
  },

  // Reste de la configuration
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
});
