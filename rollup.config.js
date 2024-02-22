import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";

export default {
  input: "src/main.jsx", // Ruta del archivo de entrada principal
  output: {
    file: "dist/bundle.js", // Ruta de salida del bundle
    format: "cjs", // Formato del bundle (CommonJS)
  },
  plugins: [
    resolve(), // Resuelve módulos externos
    babel({
      // Transpila código
      exclude: "node_modules/**", // Ignora node_modules
      presets: ["@babel/preset-env"], // Preset de Babel para ES5
    }),
  ],
};
