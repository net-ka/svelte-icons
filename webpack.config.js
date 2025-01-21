const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.html', '.js', '.svelte', '.mjs', '.svg'],
  },
  module: {
    rules: [
      {
        test: /\.svelte\.ts$/,
        use: [ "svelte-loader", { loader: "ts-loader", options: { transpileOnly: true } }],
      },
      // This is the config for other .ts files - the regex makes sure to not process .svelte.ts files twice
      {
        test: /(?<!\.svelte)\.ts$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true, // you should use svelte-check for type checking
        }
      },
      {
        test: /\.(svelte|svelte\.js)$/,
        loader: 'svelte-loader',
        options: {
          compilerOptions: {
            css: "external",
          },
        }
      },
      {
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
  },
};