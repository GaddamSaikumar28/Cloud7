// // // /** @type {import('tailwindcss').Config} */
// // // export default {
// // //   content: [
// // //     "./index.html",
// // //     "./src/**/*.{js,ts,jsx,tsx}",
// // //   ],
// // //   theme: {
// // //     extend: {
// // //       colors: {
// // //         // Cloud7 Custom Dark Theme
// // //         cloud: {
// // //           900: '#0a0a0a', // Deep Black Background
// // //           800: '#121212', // Card/Section Background
// // //           500: '#3b82f6', // Primary Blue Glow (Standard Potency)
// // //           400: '#60a5fa', // Lighter Blue Accent
// // //           accent: '#ef4444', // Red/Orange Glow (Max Potency)
// // //           text: '#e5e5e5', // Off-white text for readability
// // //           muted: '#a3a3a3', // Muted text for descriptions
// // //         }
// // //       },
// // //       fontFamily: {
// // //         sans: ['Inter', 'sans-serif'], // Clean, modern font
// // //       },
// // //       animation: {
// // //         'float': 'float 6s ease-in-out infinite',
// // //         'float-delayed': 'float 6s ease-in-out 3s infinite',
// // //         'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
// // //       },
// // //       keyframes: {
// // //         float: {
// // //           '0%, 100%': { transform: 'translateY(0)' },
// // //           '50%': { transform: 'translateY(-20px)' },
// // //         }
// // //       }
// // //     },
// // //   },
// // //   plugins: [],
// // // }
// // /** @type {import('tailwindcss').Config} */
// // export default {
// //   content: [
// //     "./index.html",
// //     "./src/**/*.{js,ts,jsx,tsx}",
// //   ],
// //   theme: {
// //     extend: {
// //       colors: {
// //         dark: {
// //           900: '#0a0a0c', // Deep charcoal/black background
// //           800: '#121216',
// //           700: '#1c1c24',
// //         },
// //         brand: {
// //           glow: '#a8c7fa', // The blueish-white glow
// //         }
// //       },
// //       backgroundImage: {
// //         'smoke-gradient': 'radial-gradient(circle at center, rgba(168, 199, 250, 0.1) 0%, transparent 70%)',
// //         'glass': 'linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
// //       },
// //       boxShadow: {
// //         'glow': '0 0 20px rgba(168, 199, 250, 0.3)',
// //         'glow-sm': '0 0 10px rgba(168, 199, 250, 0.3)',
// //         'glow-lg': '0 0 40px rgba(168, 199, 250, 0.2)',
// //       },
// //       animation: {
// //         'float': 'float 6s ease-in-out infinite',
// //         'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
// //       },
// //       keyframes: {
// //         float: {
// //           '0%, 100%': { transform: 'translateY(0)' },
// //           '50%': { transform: 'translateY(-20px)' },
// //         }
// //       }
// //     },
// //   },
// //   plugins: [],
// // }
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         dark: {
//           900: '#0a0a0c',
//           800: '#121216',
//           700: '#1c1c24',
//         },
//         brand: {
//           glow: '#a8c7fa',
//           accent: '#0ea5e9', // Blue for the 7Tabz accent
//         }
//       },
//       animation: {
//         'float': 'float 6s ease-in-out infinite',
//         'float-delayed': 'float 6s ease-in-out 3s infinite',
//         'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
//         'spin-slow': 'spin 12s linear infinite',
//         'marquee': 'marquee 25s linear infinite',
//         'smoke-drift': 'drift 20s linear infinite',
//       },
//       keyframes: {
//         float: {
//           '0%, 100%': { transform: 'translateY(0)' },
//           '50%': { transform: 'translateY(-20px)' },
//         },
//         marquee: {
//           '0%': { transform: 'translateX(0%)' },
//           '100%': { transform: 'translateX(-100%)' },
//         },
//         drift: {
//           '0%': { transform: 'translateX(0) translateY(0)' },
//           '50%': { transform: 'translateX(-20px) translateY(-10px)' },
//           '100%': { transform: 'translateX(0) translateY(0)' },
//         }
//       }
//     },
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0a0a0c',
          800: '#121216',
        },
        brand: {
          glow: '#a8c7fa',
        }
      },
      animation: {
        'marquee': 'marquee 20s linear infinite', // Scroll R -> L
        'shimmer': 'shimmer 3s linear infinite',
        'smoke-drift': 'drift 60s linear infinite',
      },
      keyframes: {
        // marquee: {
        //   '0%': { transform: 'translateX(0%)' },
        //   '100%': { transform: 'translateX(-50%)' }, // Moves to -50% because we duplicate content
        // },
        // drift: {
        //   '0%': { transform: 'translate(0, 0)' },
        //   '50%': { transform: 'translate(-50px, -20px)' },
        //   '100%': { transform: 'translate(0, 0)' },
        // },
        // float: {
        //   '0%, 100%': { transform: 'translateY(0)' },
        //   '50%': { transform: 'translateY(-20px)' },
        // }
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }, 
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        drift: {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-50px, -20px)' },
          '100%': { transform: 'translate(0, 0)' },
        }
      }
    },
  },
  plugins: [],
}