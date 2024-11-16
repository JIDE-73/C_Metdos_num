import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

//https://vite.dev/config/
//base es la modificacion de nuestra enlace de apaertura
export default defineConfig({
  plugins: [react()],
  base: "https://JIDE-73.github.io/C_Metdos_num",
});
