import typescript from "rollup-plugin-typescript2"
import svgr from "@svgr/rollup"
import { defineConfig } from "rollup"
import postcss from "rollup-plugin-postcss"

export default defineConfig({
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  external: ["react", "react-dom", "daisyui", "dayjs", "tailwindcss"],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      clean: true,
      exclude: ["**/__tests__/**", "**/*.test.ts", "**/*.test.tsx"],
      tsconfigOverride: {
        compilerOptions: {
          jsx: "react",
          declaration: true,
        },
      },
    }),
    svgr({
      typescript: true,
      dimensions: false,
    }),
    postcss({
      config: {
        path: "./postcss.config.cjs",
        ctx: {},
      },
    }),
  ],
})
