const path = require("path");
// PLUGINS NECESARIOS PARA INICIAR MIN WEBPACK
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// CLOSE PLUGINS NECESARIOS PARA INICIAR MIN WEBPACK

module.exports = {
  // ENTRADA DE DATOS
  entry: "./src/index.js",
  // SALIDA DE DATOS
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    // EXTENCIONES QUE DEBE LEER
    extensions: [".js", ".jsx"],
    // ALIAS CREADOS PARA HACER MAS RAPIDO EL LLAMADO DE DATOS
    alias: {
      "@styles": path.resolve(__dirname, "src/styles"),
      "@components": path.resolve(__dirname, "src/components"),
      "@images": path.resolve(__dirname, "src/assets/images"),
      "@services": path.resolve(__dirname, "src/services"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@router": path.resolve(__dirname, "./src/router"),
      "@middlewares": path.resolve(__dirname, "./src/middlewares"),
      "@reducer": path.resolve(__dirname, "./src/reducer"),
      "@slices": path.resolve(__dirname, "./src/slices"),
    },
  },
  module: {
    rules: [
      {
        // ESTO ES REQUERIDO PARA PODER LEER DATOS JS,JSX Y
        // LOS CARGA A BABEL PARA SER LEIDO POR CUALQUIER NAVEGADOR
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        // REQUERIDO PAR PODER LEER CUALQUIER HTML
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        // REQUERIDO PAR PODER LEER CSS O SCSS HTML
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        // REQUERIDO PARA PODER LEER IMAGENES O GIF
        test: /\.(png|gif|jpg|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: { name: "assets/[hash].[ext]" },
          },
        ],
      },
    ],
  },
  plugins: [
    // CONFIGURACION DE PLUGINS
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/[name].css",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    historyApiFallback: true,
    open: true,
    // PUERTO EN EL QUE QUIERO EJECUTAR EL PROYECTO
    port: 3007,
  },
};
