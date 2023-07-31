import CopyWebpackPlugin from "copy-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import path from "path";

const assetsPath = path.resolve(__dirname, "src", "assets");
const entryPoint = path.resolve(__dirname, "src", "typescript", "app.ts");
const outputPath = path.resolve(__dirname, "dist");
const outputFilename = "js/app-[hash].js";

const babelLoaderRule = {
  test: /\.(ts)$/
  , exclude: /node_modules/
  , use: {
    loader: "babel-loader"
    , options: {
      babelrc: false
      , plugins: [
        "@babel/plugin-syntax-dynamic-import"
        , "@babel/plugin-proposal-class-properties"
      ]
      , presets: [
        "@babel/preset-typescript"
        , [
          "@babel/preset-env"
          , {
            corejs: {
              version: 3
              , proposals: true
            }
            , targets: "> 0.5%, last 2 versions, Firefox ESR, not dead"
            , useBuiltIns: "usage"
          }
        ]
      ]
    }
  }
};

const copyWebpackPluginConfig = {
  patterns: [
    { from: assetsPath
      , to: outputPath
    }
  ]
};

const devServerConfig = {
  contentBase: path.resolve(__dirname, "dist")
  , historyApiFallback: true
  , host: "0.0.0.0"
  , hot: true
  , inline: true
  , open: true
  , port: "3000"
  , stats: {
    assetsSort: "size"
    , modules: false
  }
  , writeToDisk: true
};

export const commonConfig: any = {
  entry: {
    app: entryPoint
  }
  , module: {
    rules: [babelLoaderRule]
  }
  , output: {
    filename: outputFilename
    , path: outputPath
  }
  , plugins: [
    new CleanWebpackPlugin()
    , new CopyWebpackPlugin(copyWebpackPluginConfig)
  ]
  , devServer: devServerConfig
};
