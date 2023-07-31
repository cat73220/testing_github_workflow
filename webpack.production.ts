import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";
import path from "path";
import sass from "sass";
import {commonConfig} from "./webpack.common";
import {errorPagesConfig} from "./webpack.error-pages";
import {merge} from "webpack-merge";

const clientUrl = "https://console.livemasq.com";
const ejsTemplate = path.resolve(__dirname, "src", "ejs", "index.ejs");
const cssFilename = "css/app-[hash].css";
const robotsDirectives = "all";
const googleAnalytics = true;

const scssRule = {
  test: /\.scss$/
  , use: [
    {loader: MiniCssExtractPlugin.loader}
    , {loader: "css-loader"}
    , {
      loader: "sass-loader"
      , options: {
        implementation: sass
        , sassOptions: {outputStyle: "compressed"}
      }
    }
  ]
};

const productionConfig: any = {
  mode: "production"
  , module: {
    rules: [scssRule]
  }
  , optimization: {
    minimizer: [new OptimizeCssAssetsPlugin()]
  }
  , plugins: [
    new HTMLWebpackPlugin({
      inject: "body"
      , minimize: true
      , template: ejsTemplate
      , xhtml: true
      , robotsDirectives
      , googleAnalytics
      , clientUrl
    })
    , new MiniCssExtractPlugin({
      filename: cssFilename
    })
  ]
};

module.exports = merge(commonConfig, productionConfig, errorPagesConfig);
