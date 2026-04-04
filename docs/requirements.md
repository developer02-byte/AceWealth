## Packages
framer-motion | Page transitions and scroll-triggered animations
embla-carousel-react | For the Client Stories carousel
@hookform/resolvers | Form validation with Zod
react-hook-form | Form state management
lucide-react | Icons

## Notes
Tailwind Config - add these colors to tailwind.config.ts if not already present:
theme: {
  extend: {
    colors: {
      brand: {
        yellow: "#F5A623",
        blue: "#1E40AF",
        dark: "#0B132B"
      }
    },
    fontFamily: {
      sans: ["var(--font-sans)"],
      display: ["var(--font-display)"],
    }
  }
}
