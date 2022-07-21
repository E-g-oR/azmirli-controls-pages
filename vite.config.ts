import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin"
import svgrPlugin from "vite-plugin-svgr"
import { viteStaticCopy } from "vite-plugin-static-copy"
import checker from "vite-plugin-checker"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgrPlugin({
      svgrOptions: {
        ref: true,
      }
    }),
    checker({
      typescript: true,
      eslint: {
        lintCommand: "eslint src"
      }
    }),
    vanillaExtractPlugin(),
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "./meta.json",
          dest: "./",
        }
      ]
    })
  ],
  // assetsInclude: ["jpg", "woff2", "woff", "ttf", "eot"].map(extension => "**/*."+ extension)
  assetsInclude: ["**/*.jpg", "**/*.svg", "**/*.png"],
  build: {
    outDir: "./build",
    // assetsDir: ""
  },
  resolve: {
    alias: [
      {
        find: "./runtimeConfig",
        replacement: "./runtimeConfig.browser",
      },
    ],
  },
})
