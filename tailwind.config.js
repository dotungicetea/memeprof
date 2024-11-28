/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: "#a1df24",
        // bg_color: "var(--tg-theme-bg-color)",
        // secondary_bg_color: "var(--tg-theme-secondary-bg-color)",
        // text_color: "var(--tg-theme-text-color)",
        // hint_color: "var(--tg-theme-hint-color)",
        // link_color: "var(--tg-theme-link-color)",
        // button_color: "#A1DF24",
        // button_text_color: "var(--tg-theme-button-text-color)",
        // header_bg_color: "var(--tg-theme-header-bg-color)",
        // accent_text_color: "var(--tg-theme-accent-text-color)",
        // section_bg_color: "var(--tg-theme-section-bg-color)",
        // section_header_text_color: "var(--tg-theme-section-header-text-color)",
        // subtitle_text_color: "var(--tg-theme-subtitle-text-color)",
        // destructive_text_color: "var(--tg-theme-destructive-text-color)",
        // bg_dark_primary: "#191a19",
        primary: "#a1df24",
        bg_color: "#191819",
        secondary_bg_color: "#000000",
        text_color: "#ffffff",
        hint_color: "#a8a8a8",
        link_color: "#2678b6",
        button_color: "#A1DF24",
        button_text_color: "#ffffff",
        header_bg_color: "#242326",
        accent_text_color: "#839ef0",
        section_bg_color: "#181819",
        section_header_text_color: "#8b9ff9",
        subtitle_text_color: "#7e7e7f",
        destructive_text_color: "#ee686f",
        bg_dark_primary: "#191a19",
        tertiary_bg_color: "#0E2511",
      },
    },
  },
  plugins: [],
};
