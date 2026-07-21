const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const pkgSrc = (name) => path.resolve(__dirname, "..", name, "src");

module.exports = (_env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: path.resolve(__dirname, "src/index.tsx"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProduction ? "[name].[contenthash].js" : "[name].js",
      publicPath: "/",
      clean: true,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
      alias: {
        // Compile workspace packages straight from their TypeScript source.
        "stockflow-helpers": pkgSrc("stockflow-helpers"),
        "stockflow-component": pkgSrc("stockflow-component"),
        "stockflow-feature": pkgSrc("stockflow-feature"),
        // Force a single copy of these libraries across the workspace.
        react: path.resolve(__dirname, "node_modules/react"),
        "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
        "styled-components": path.resolve(
          __dirname,
          "node_modules/styled-components",
        ),
      },
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              configFile: false,
              presets: [
                ["@babel/preset-env", { targets: "defaults" }],
                ["@babel/preset-react", { runtime: "automatic" }],
                "@babel/preset-typescript",
              ],
              plugins: [
                [
                  "babel-plugin-styled-components",
                  { displayName: !isProduction, ssr: false },
                ],
              ],
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: path.resolve(__dirname, "tsconfig.json"),
        },
      }),
    ],
    devServer: {
      static: { directory: path.resolve(__dirname, "public") },
      historyApiFallback: true,
      hot: true,
      port: 3000,
      open: false,
      proxy: [
        {
          context: ["/api"],
          target: "http://localhost:3001",
          pathRewrite: { "^/api": "" },
        },
      ],
    },
    devtool: isProduction ? "source-map" : "eval-source-map",
  };
};
