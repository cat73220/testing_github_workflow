import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import RobotstxtPlugin from "robotstxt-webpack-plugin";
import sass from "sass";
import { commonConfig } from "./webpack.common";
import { errorPagesConfig } from "./webpack.error-pages";
import { merge } from "webpack-merge";

const clientUrl = "https://stage-console.livemasq.com";
const cssFilename = "css/app-[hash].css";
const ejsTemplate = path.resolve(__dirname, "src", "ejs", "index.ejs");
const enableCssInJs = true;
const robotsDirectives = "noindex,nofollow,noarchive";

const robotstxtPluginOptions = {
  policy: [
    { userAgent: "*"
      , disallow: "/"
    }
  ]
};

const scssRule = {
  test: /\.scss$/
  , use: [
    { loader: enableCssInJs ? "style-loader" : MiniCssExtractPlugin.loader }
    , { loader: "css-loader" }
    , { loader: "sass-loader"
      , options: { implementation: sass }
    }
  ]
};

const plugins: any = [
  new HTMLWebpackPlugin({
    inject: "body"
    , template: ejsTemplate
    , xhtml: true
    , robotsDirectives
    , clientUrl
  })
  , new RobotstxtPlugin(robotstxtPluginOptions)
];

if (!enableCssInJs) {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: cssFilename
    })
  );
}

const developmentConfig: any = {
  devtool: "inline-source-map"
  , mode: "development"
  , module: {
    rules: [scssRule]
  }
  , plugins
};

module.exports = merge(commonConfig, developmentConfig, errorPagesConfig);
