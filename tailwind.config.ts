import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  plugins: [
    plugin(require('@tailwindcss/forms')),
    plugin(function({ matchVariant }){
      matchVariant(
        'not',
        (value) => {
          return `&:not(${value})`
        }
      )
      matchVariant(
        'is',
        (value) => {
          return `&:is(${value})`
        }
      )
    })
  ],
};
export default config;
