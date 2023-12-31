import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.join(__dirname, "src"),
            "@components": path.join(__dirname, "src/components"),
            "@pages": path.join(__dirname, "src/pages"),
            "@state": path.join(__dirname, "src/state"),
            "@assets": path.join(__dirname, "src/assets"),
        },
    },
});
