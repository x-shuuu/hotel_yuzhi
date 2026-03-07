// vite.config.js
import { defineConfig, loadEnv } from "file:///D:/aprogram/hotel/hoteltwo/yuzhi-admin-vue3/node_modules/vite/dist/node/index.js";
import path2 from "path";

// vite/plugins/index.js
import vue from "file:///D:/aprogram/hotel/hoteltwo/yuzhi-admin-vue3/node_modules/@vitejs/plugin-vue/dist/index.mjs";

// vite/plugins/auto-import.js
import autoImport from "file:///D:/aprogram/hotel/hoteltwo/yuzhi-admin-vue3/node_modules/unplugin-auto-import/dist/vite.js";
function createAutoImport() {
  return autoImport({
    imports: [
      "vue",
      "vue-router",
      "pinia"
    ],
    dts: false
  });
}

// vite/plugins/svg-icon.js
import { createSvgIconsPlugin } from "file:///D:/aprogram/hotel/hoteltwo/yuzhi-admin-vue3/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
function createSvgIcon(isBuild) {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons/svg")],
    symbolId: "icon-[dir]-[name]",
    svgoOptions: isBuild
  });
}

// vite/plugins/compression.js
import compression from "file:///D:/aprogram/hotel/hoteltwo/yuzhi-admin-vue3/node_modules/vite-plugin-compression/dist/index.mjs";
function createCompression(env) {
  const { VITE_BUILD_COMPRESS } = env;
  const plugin = [];
  if (VITE_BUILD_COMPRESS) {
    const compressList = VITE_BUILD_COMPRESS.split(",");
    if (compressList.includes("gzip")) {
      plugin.push(
        compression({
          ext: ".gz",
          deleteOriginFile: false
        })
      );
    }
    if (compressList.includes("brotli")) {
      plugin.push(
        compression({
          ext: ".br",
          algorithm: "brotliCompress",
          deleteOriginFile: false
        })
      );
    }
  }
  return plugin;
}

// vite/plugins/setup-extend.js
import setupExtend from "file:///D:/aprogram/hotel/hoteltwo/yuzhi-admin-vue3/node_modules/unplugin-vue-setup-extend-plus/dist/vite.js";
function createSetupExtend() {
  return setupExtend({});
}

// vite/plugins/index.js
function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [vue()];
  vitePlugins.push(createAutoImport());
  vitePlugins.push(createSetupExtend());
  vitePlugins.push(createSvgIcon(isBuild));
  isBuild && vitePlugins.push(...createCompression(viteEnv));
  return vitePlugins;
}

// vite.config.js
var __vite_injected_original_dirname = "D:\\aprogram\\hotel\\hoteltwo\\yuzhi-admin-vue3";
var baseUrl = "http://localhost:8080";
var vite_config_default = defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_ENV } = env;
  return {
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.yuzhi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.yuzhi.vip/admin/，则设置 baseUrl 为 /admin/。
    base: VITE_APP_ENV === "production" ? "/" : "/",
    plugins: createVitePlugins(env, command === "build"),
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        "~": path2.resolve(__vite_injected_original_dirname, "./"),
        // 设置别名
        "@": path2.resolve(__vite_injected_original_dirname, "./src")
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
    },
    // 打包配置
    build: {
      // https://vite.dev/config/build-options.html
      sourcemap: command === "build" ? false : "inline",
      outDir: "dist",
      assetsDir: "assets",
      chunkSizeWarningLimit: 2e3,
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      }
    },
    // vite 相关配置
    server: {
      port: 90,
      host: true,
      open: true,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        "/dev-api": {
          target: baseUrl,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, "")
        },
        // springdoc proxy
        "^/v3/api-docs/(.*)": {
          target: baseUrl,
          changeOrigin: true
        }
      }
    },
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              }
            }
          }
        ]
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAidml0ZS9wbHVnaW5zL2luZGV4LmpzIiwgInZpdGUvcGx1Z2lucy9hdXRvLWltcG9ydC5qcyIsICJ2aXRlL3BsdWdpbnMvc3ZnLWljb24uanMiLCAidml0ZS9wbHVnaW5zL2NvbXByZXNzaW9uLmpzIiwgInZpdGUvcGx1Z2lucy9zZXR1cC1leHRlbmQuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxhcHJvZ3JhbVxcXFxob3RlbFxcXFxob3RlbHR3b1xcXFxodWFjYWktYWRtaW4tdnVlM1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcYXByb2dyYW1cXFxcaG90ZWxcXFxcaG90ZWx0d29cXFxcaHVhY2FpLWFkbWluLXZ1ZTNcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Fwcm9ncmFtL2hvdGVsL2hvdGVsdHdvL2h1YWNhaS1hZG1pbi12dWUzL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgY3JlYXRlVml0ZVBsdWdpbnMgZnJvbSAnLi92aXRlL3BsdWdpbnMnXG5cbmNvbnN0IGJhc2VVcmwgPSAnaHR0cDovL2xvY2FsaG9zdDo4MDgwJyAvLyBcdTU0MEVcdTdBRUZcdTYzQTVcdTUzRTNcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlLCBjb21tYW5kIH0pID0+IHtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKVxuICBjb25zdCB7IFZJVEVfQVBQX0VOViB9ID0gZW52XG4gIHJldHVybiB7XG4gICAgLy8gXHU5MEU4XHU3RjcyXHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzXHU1NDhDXHU1RjAwXHU1M0QxXHU3M0FGXHU1ODgzXHU0RTBCXHU3Njg0VVJMXHUzMDAyXG4gICAgLy8gXHU5RUQ4XHU4QkE0XHU2MEM1XHU1MUI1XHU0RTBCXHVGRjBDdml0ZSBcdTRGMUFcdTUwNDdcdThCQkVcdTRGNjBcdTc2ODRcdTVFOTRcdTc1MjhcdTY2MkZcdTg4QUJcdTkwRThcdTdGNzJcdTU3MjhcdTRFMDBcdTRFMkFcdTU3REZcdTU0MERcdTc2ODRcdTY4MzlcdThERUZcdTVGODRcdTRFMEFcbiAgICAvLyBcdTRGOEJcdTU5ODIgaHR0cHM6Ly93d3cuaHVhY2FpLnZpcC9cdTMwMDJcdTU5ODJcdTY3OUNcdTVFOTRcdTc1MjhcdTg4QUJcdTkwRThcdTdGNzJcdTU3MjhcdTRFMDBcdTRFMkFcdTVCNTBcdThERUZcdTVGODRcdTRFMEFcdUZGMENcdTRGNjBcdTVDMzFcdTk3MDBcdTg5ODFcdTc1MjhcdThGRDlcdTRFMkFcdTkwMDlcdTk4NzlcdTYzMDdcdTVCOUFcdThGRDlcdTRFMkFcdTVCNTBcdThERUZcdTVGODRcdTMwMDJcdTRGOEJcdTU5ODJcdUZGMENcdTU5ODJcdTY3OUNcdTRGNjBcdTc2ODRcdTVFOTRcdTc1MjhcdTg4QUJcdTkwRThcdTdGNzJcdTU3MjggaHR0cHM6Ly93d3cuaHVhY2FpLnZpcC9hZG1pbi9cdUZGMENcdTUyMTlcdThCQkVcdTdGNkUgYmFzZVVybCBcdTRFM0EgL2FkbWluL1x1MzAwMlxuICAgIGJhc2U6IFZJVEVfQVBQX0VOViA9PT0gJ3Byb2R1Y3Rpb24nID8gJy8nIDogJy8nLFxuICAgIHBsdWdpbnM6IGNyZWF0ZVZpdGVQbHVnaW5zKGVudiwgY29tbWFuZCA9PT0gJ2J1aWxkJyksXG4gICAgcmVzb2x2ZToge1xuICAgICAgLy8gaHR0cHM6Ly9jbi52aXRlanMuZGV2L2NvbmZpZy8jcmVzb2x2ZS1hbGlhc1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgLy8gXHU4QkJFXHU3RjZFXHU4REVGXHU1Rjg0XG4gICAgICAgICd+JzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vJyksXG4gICAgICAgIC8vIFx1OEJCRVx1N0Y2RVx1NTIyQlx1NTQwRFxuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpXG4gICAgICB9LFxuICAgICAgLy8gaHR0cHM6Ly9jbi52aXRlanMuZGV2L2NvbmZpZy8jcmVzb2x2ZS1leHRlbnNpb25zXG4gICAgICBleHRlbnNpb25zOiBbJy5tanMnLCAnLmpzJywgJy50cycsICcuanN4JywgJy50c3gnLCAnLmpzb24nLCAnLnZ1ZSddXG4gICAgfSxcbiAgICAvLyBcdTYyNTNcdTUzMDVcdTkxNERcdTdGNkVcbiAgICBidWlsZDoge1xuICAgICAgLy8gaHR0cHM6Ly92aXRlLmRldi9jb25maWcvYnVpbGQtb3B0aW9ucy5odG1sXG4gICAgICBzb3VyY2VtYXA6IGNvbW1hbmQgPT09ICdidWlsZCcgPyBmYWxzZSA6ICdpbmxpbmUnLFxuICAgICAgb3V0RGlyOiAnZGlzdCcsXG4gICAgICBhc3NldHNEaXI6ICdhc3NldHMnLFxuICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAyMDAwLFxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogJ3N0YXRpYy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ3N0YXRpYy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogJ3N0YXRpYy9bZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICAvLyB2aXRlIFx1NzZGOFx1NTE3M1x1OTE0RFx1N0Y2RVxuICAgIHNlcnZlcjoge1xuICAgICAgcG9ydDogOTAsXG4gICAgICBob3N0OiB0cnVlLFxuICAgICAgb3BlbjogdHJ1ZSxcbiAgICAgIHByb3h5OiB7XG4gICAgICAgIC8vIGh0dHBzOi8vY24udml0ZWpzLmRldi9jb25maWcvI3NlcnZlci1wcm94eVxuICAgICAgICAnL2Rldi1hcGknOiB7XG4gICAgICAgICAgdGFyZ2V0OiBiYXNlVXJsLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICByZXdyaXRlOiAocCkgPT4gcC5yZXBsYWNlKC9eXFwvZGV2LWFwaS8sICcnKVxuICAgICAgICB9LFxuICAgICAgICAgLy8gc3ByaW5nZG9jIHByb3h5XG4gICAgICAgICAnXi92My9hcGktZG9jcy8oLiopJzoge1xuICAgICAgICAgIHRhcmdldDogYmFzZVVybCxcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgcG9zdGNzczoge1xuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgcG9zdGNzc1BsdWdpbjogJ2ludGVybmFsOmNoYXJzZXQtcmVtb3ZhbCcsXG4gICAgICAgICAgICBBdFJ1bGU6IHtcbiAgICAgICAgICAgICAgY2hhcnNldDogKGF0UnVsZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhdFJ1bGUubmFtZSA9PT0gJ2NoYXJzZXQnKSB7XG4gICAgICAgICAgICAgICAgICBhdFJ1bGUucmVtb3ZlKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGFwcm9ncmFtXFxcXGhvdGVsXFxcXGhvdGVsdHdvXFxcXGh1YWNhaS1hZG1pbi12dWUzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcYXByb2dyYW1cXFxcaG90ZWxcXFxcaG90ZWx0d29cXFxcaHVhY2FpLWFkbWluLXZ1ZTNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGluZGV4LmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9hcHJvZ3JhbS9ob3RlbC9ob3RlbHR3by9odWFjYWktYWRtaW4tdnVlMy92aXRlL3BsdWdpbnMvaW5kZXguanNcIjtpbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcblxuaW1wb3J0IGNyZWF0ZUF1dG9JbXBvcnQgZnJvbSAnLi9hdXRvLWltcG9ydCdcbmltcG9ydCBjcmVhdGVTdmdJY29uIGZyb20gJy4vc3ZnLWljb24nXG5pbXBvcnQgY3JlYXRlQ29tcHJlc3Npb24gZnJvbSAnLi9jb21wcmVzc2lvbidcbmltcG9ydCBjcmVhdGVTZXR1cEV4dGVuZCBmcm9tICcuL3NldHVwLWV4dGVuZCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlVml0ZVBsdWdpbnModml0ZUVudiwgaXNCdWlsZCA9IGZhbHNlKSB7XG4gICAgY29uc3Qgdml0ZVBsdWdpbnMgPSBbdnVlKCldXG4gICAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVBdXRvSW1wb3J0KCkpXG5cdHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlU2V0dXBFeHRlbmQoKSlcbiAgICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZVN2Z0ljb24oaXNCdWlsZCkpXG5cdGlzQnVpbGQgJiYgdml0ZVBsdWdpbnMucHVzaCguLi5jcmVhdGVDb21wcmVzc2lvbih2aXRlRW52KSlcbiAgICByZXR1cm4gdml0ZVBsdWdpbnNcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcYXByb2dyYW1cXFxcaG90ZWxcXFxcaG90ZWx0d29cXFxcaHVhY2FpLWFkbWluLXZ1ZTNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxhcHJvZ3JhbVxcXFxob3RlbFxcXFxob3RlbHR3b1xcXFxodWFjYWktYWRtaW4tdnVlM1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcYXV0by1pbXBvcnQuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Fwcm9ncmFtL2hvdGVsL2hvdGVsdHdvL2h1YWNhaS1hZG1pbi12dWUzL3ZpdGUvcGx1Z2lucy9hdXRvLWltcG9ydC5qc1wiO2ltcG9ydCBhdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUF1dG9JbXBvcnQoKSB7XG4gICAgcmV0dXJuIGF1dG9JbXBvcnQoe1xuICAgICAgICBpbXBvcnRzOiBbXG4gICAgICAgICAgICAndnVlJyxcbiAgICAgICAgICAgICd2dWUtcm91dGVyJyxcbiAgICAgICAgICAgICdwaW5pYSdcbiAgICAgICAgXSxcbiAgICAgICAgZHRzOiBmYWxzZVxuICAgIH0pXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGFwcm9ncmFtXFxcXGhvdGVsXFxcXGhvdGVsdHdvXFxcXGh1YWNhaS1hZG1pbi12dWUzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcYXByb2dyYW1cXFxcaG90ZWxcXFxcaG90ZWx0d29cXFxcaHVhY2FpLWFkbWluLXZ1ZTNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXHN2Zy1pY29uLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9hcHJvZ3JhbS9ob3RlbC9ob3RlbHR3by9odWFjYWktYWRtaW4tdnVlMy92aXRlL3BsdWdpbnMvc3ZnLWljb24uanNcIjtpbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVN2Z0ljb24oaXNCdWlsZCkge1xuICAgIHJldHVybiBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG5cdFx0aWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaWNvbnMvc3ZnJyldLFxuICAgICAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJyxcbiAgICAgICAgc3Znb09wdGlvbnM6IGlzQnVpbGRcbiAgICB9KVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxhcHJvZ3JhbVxcXFxob3RlbFxcXFxob3RlbHR3b1xcXFxodWFjYWktYWRtaW4tdnVlM1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGFwcm9ncmFtXFxcXGhvdGVsXFxcXGhvdGVsdHdvXFxcXGh1YWNhaS1hZG1pbi12dWUzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxjb21wcmVzc2lvbi5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovYXByb2dyYW0vaG90ZWwvaG90ZWx0d28vaHVhY2FpLWFkbWluLXZ1ZTMvdml0ZS9wbHVnaW5zL2NvbXByZXNzaW9uLmpzXCI7aW1wb3J0IGNvbXByZXNzaW9uIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVDb21wcmVzc2lvbihlbnYpIHtcbiAgICBjb25zdCB7IFZJVEVfQlVJTERfQ09NUFJFU1MgfSA9IGVudlxuICAgIGNvbnN0IHBsdWdpbiA9IFtdXG4gICAgaWYgKFZJVEVfQlVJTERfQ09NUFJFU1MpIHtcbiAgICAgICAgY29uc3QgY29tcHJlc3NMaXN0ID0gVklURV9CVUlMRF9DT01QUkVTUy5zcGxpdCgnLCcpXG4gICAgICAgIGlmIChjb21wcmVzc0xpc3QuaW5jbHVkZXMoJ2d6aXAnKSkge1xuICAgICAgICAgICAgLy8gaHR0cDovL2RvYy5odWFjYWkudmlwL2h1YWNhaS12dWUvb3RoZXIvZmFxLmh0bWwjXHU0RjdGXHU3NTI4Z3ppcFx1ODlFM1x1NTM4Qlx1N0YyOVx1OTc1OVx1NjAwMVx1NjU4N1x1NEVGNlxuICAgICAgICAgICAgcGx1Z2luLnB1c2goXG4gICAgICAgICAgICAgICAgY29tcHJlc3Npb24oe1xuICAgICAgICAgICAgICAgICAgICBleHQ6ICcuZ3onLFxuICAgICAgICAgICAgICAgICAgICBkZWxldGVPcmlnaW5GaWxlOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbXByZXNzTGlzdC5pbmNsdWRlcygnYnJvdGxpJykpIHtcbiAgICAgICAgICAgIHBsdWdpbi5wdXNoKFxuICAgICAgICAgICAgICAgIGNvbXByZXNzaW9uKHtcbiAgICAgICAgICAgICAgICAgICAgZXh0OiAnLmJyJyxcbiAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtOiAnYnJvdGxpQ29tcHJlc3MnLFxuICAgICAgICAgICAgICAgICAgICBkZWxldGVPcmlnaW5GaWxlOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHBsdWdpblxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxhcHJvZ3JhbVxcXFxob3RlbFxcXFxob3RlbHR3b1xcXFxodWFjYWktYWRtaW4tdnVlM1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGFwcm9ncmFtXFxcXGhvdGVsXFxcXGhvdGVsdHdvXFxcXGh1YWNhaS1hZG1pbi12dWUzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxzZXR1cC1leHRlbmQuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Fwcm9ncmFtL2hvdGVsL2hvdGVsdHdvL2h1YWNhaS1hZG1pbi12dWUzL3ZpdGUvcGx1Z2lucy9zZXR1cC1leHRlbmQuanNcIjtpbXBvcnQgc2V0dXBFeHRlbmQgZnJvbSAndW5wbHVnaW4tdnVlLXNldHVwLWV4dGVuZC1wbHVzL3ZpdGUnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVNldHVwRXh0ZW5kKCkge1xuICAgIHJldHVybiBzZXR1cEV4dGVuZCh7fSlcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1UsU0FBUyxjQUFjLGVBQWU7QUFDdFcsT0FBT0EsV0FBVTs7O0FDRDhVLE9BQU8sU0FBUzs7O0FDQUosT0FBTyxnQkFBZ0I7QUFFblgsU0FBUixtQkFBb0M7QUFDdkMsU0FBTyxXQUFXO0FBQUEsSUFDZCxTQUFTO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDSjtBQUFBLElBQ0EsS0FBSztBQUFBLEVBQ1QsQ0FBQztBQUNMOzs7QUNYcVcsU0FBUyw0QkFBNEI7QUFDMVksT0FBTyxVQUFVO0FBRUYsU0FBUixjQUErQixTQUFTO0FBQzNDLFNBQU8scUJBQXFCO0FBQUEsSUFDOUIsVUFBVSxDQUFDLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxzQkFBc0IsQ0FBQztBQUFBLElBQ3hELFVBQVU7QUFBQSxJQUNWLGFBQWE7QUFBQSxFQUNqQixDQUFDO0FBQ0w7OztBQ1QyVyxPQUFPLGlCQUFpQjtBQUVwWCxTQUFSLGtCQUFtQyxLQUFLO0FBQzNDLFFBQU0sRUFBRSxvQkFBb0IsSUFBSTtB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
