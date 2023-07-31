import HTMLWebpackPlugin from "html-webpack-plugin";
import path from "path";

type PluginOption = {
  errorCode: number
  , fileName: string
  , errorTitle: string
  , errorDescription: string
  , helpfulMessage: string
};

const ejsTemplate = path.resolve(__dirname, "src", "ejs", "error-page.ejs");
const robotsDirectives = "noindex";

const badRequestErrorCode = 400;
const forbiddenErrorCode = 403;
const notFoundErrorCode = 404;
const methodNotAllowedErrorCode = 405;
const requestUriTooLarge = 414;
const requestedRangeNotSatisfiable = 416;
const internalServerError = 500;
const notImplemented = 501;
const badGateway = 502;
const serviceUnavailable = 503;
const gatewayTimeOut = 504;

const targetErrorCodes: number[] =
  [
    badRequestErrorCode
    , forbiddenErrorCode
    , notFoundErrorCode
    , methodNotAllowedErrorCode
    , requestUriTooLarge
    , requestedRangeNotSatisfiable
    , internalServerError
    , notImplemented
    , badGateway
    , serviceUnavailable
    , gatewayTimeOut
  ];

const errorCodeToPluginOption = (errorCode: number) : PluginOption => {
  switch (errorCode) {
  case badRequestErrorCode:
    return {
      errorCode
      , fileName: "400_bad_request.html"
      , errorTitle: "400 Bad Request"
      , errorDescription:
        "<span>不正な</span>\
        <span>リクエストです</span>"
      , helpfulMessage:
        "<span>お使いの</span>\
        <span>ブラウザー</span>\
        <span>のキャッシュの</span>\
        <span>削除や</span>\
        <span>Cookieの</span>\
        <span>削除を</span>\
        <span>お試しいただき</span>\
        <span>再度閲覧を</span>\
        <span>お試しください</span>"
    };

  case forbiddenErrorCode:
    return {
      errorCode
      , fileName: "403_forbidden.html"
      , errorTitle: "403 Forbidden"
      , errorDescription:
        "<span>このページへの</span>\
        <span>アクセス権限</span>\
        <span>がありません</span>"
      , helpfulMessage:
        "<span>管理者へ</span>\
        <span>ご確認ください</span>"
    };

  case notFoundErrorCode:
    return {
      errorCode
      , fileName: "404_not_found.html"
      , errorTitle: "404 Not Found"
      , errorDescription:
        "<span>リンクに</span>\
        <span>問題があるか、</span>\
        <span>ページが</span>\
        <span>削除された</span>\
        <span>恐れが</span>\
        <span>あります</span>"
      , helpfulMessage:
        "<span>管理者へ</span>\
        <span>ご確認ください</span>"
    };

  case methodNotAllowedErrorCode:
    return {
      errorCode
      , fileName: "405_method_not_allowed.html"
      , errorTitle: "405 Method Not Allowed"
      , errorDescription:
        "<span>無効なメソッドが</span>\
        <span>使用されているため</span>\
        <span>ページを</span>\
        <span>表示できません</span>"
      , helpfulMessage:
        "<span>許可されていない</span>\
        <span>接続です</span>"
    };

  case requestUriTooLarge:
    return {
      errorCode
      , fileName: "414_request_uri_too_large.html"
      , errorTitle: "414 Request URI too large"
      , errorDescription:
        "<span>リクエストされた</span>\
        <span>URIが</span>\
        <span>サーバーで</span>\
        <span>扱える長さを</span>\
        <span>超えています</span>"
      , helpfulMessage:
        "<span></span>"
    };

  case requestedRangeNotSatisfiable:
    return {
      errorCode
      , fileName: "416_requested_range_not_satisfiable.html"
      , errorTitle: "416 Requested Range Not Satisfiable"
      , errorDescription:
        "<span>リクエストされた</span>\
        <span>範囲は</span>\
        <span>リソースの</span>\
        <span>サイズを</span>\
        <span>超えています</span>"
      , helpfulMessage:
        "<span></span>"
    };

  case internalServerError:
    return {
      errorCode
      , fileName: "500_internal_server_error.html"
      , errorTitle: "500 Internal Server Error"
      , errorDescription:
          "<span>サーバーに</span>\
          <span>何らかの</span>\
          <span>問題が</span>\
          <span>発生</span>\
          <span>しています</span>"
      , helpfulMessage:
          "<span>時間をおいて</span>\
          <span>改めて</span>\
          <span>アクセスして</span>\
          <span>ください</span>"
    };

  case notImplemented:
    return {
      errorCode
      , fileName: "501_not_implemented.html"
      , errorTitle: "501 Not Implemented"
      , errorDescription:
        "<span>リクエストされた</span>\
        <span>メソッドは</span>\
        <span>サーバーが</span>\
        <span>対応していないため</span>\
        <span>扱えません</span>"
      , helpfulMessage:
        "<span></span>"
    };

  case badGateway:
    return {
      errorCode
      , fileName: "502_bad_gateway.html"
      , errorTitle: "502 Bad Gateway"
      , errorDescription:
        "<span>メンテナンスなどの</span>\
        <span>理由で</span>\
        <span>サーバーが</span>\
        <span>停止しています</span>"
      , helpfulMessage:
        "<span></span>"
    };

  case serviceUnavailable:
    return {
      errorCode
      , fileName: "503_service_unavailable.html"
      , errorTitle: "503 Service Unavailable"
      , errorDescription:
        "<span>サーバーが</span>\
        <span>メンテナンスや</span>\
        <span>負荷で</span>\
        <span>ダウン</span>\
        <span>しています</span>"
      , helpfulMessage:
        "<span>時間を</span>\
        <span>おいて</span>\
        <span>改めて</span>\
        <span>アクセスして</span>\
        <span>ください</span>"
    };

  case gatewayTimeOut:
    return {
      errorCode
      , fileName: "504_gateway_time_out.html"
      , errorTitle: "504 Gateway Timeout"
      , errorDescription:
        "<span>接続が</span>\
        <span>タイムアウト</span>\
        <span>しました</span>"
      , helpfulMessage:
        "<span>ページを</span>\
        <span>再読み込み</span>\
        <span>するか、</span>\
        <span>時間をおいて</span>\
        <span>改めて</span>\
        <span>アクセスして</span>\
        <span>ください</span>"
    };

  default:
    return {
      errorCode
      , fileName: "error_page.html"
      , errorTitle: "Error"
      , errorDescription:
        "<span>エラーが</span>\
        <span>発生しました</span>"
      , helpfulMessage:
        "<span></span>"
    };
  }
};

const errorPageHtmlWebpackPlugins =
(( ): any[] => {
  const plugins: any[] = [];
  for (const errorCode of targetErrorCodes) {
    const option = errorCodeToPluginOption(errorCode);
    plugins.push(new HTMLWebpackPlugin({
      errorCode: option.errorCode.toString()
      , errorTitle: option.errorTitle
      , errorDescription: option.errorDescription
      , filename: path.resolve("dist", "error_pages", option.fileName)
      , helpfulMessage: option.helpfulMessage
      , inject: "body"
      , minify: {
        collapseWhitespace: true
        , keepClosingSlash: true
        , removeComments: true
        , removeRedundantAttributes: true
        , removeScriptTypeAttributes: true
        , removeStyleLinkTypeAttributes: true
        , useShortDoctype: false
      }
      , robotsDirectives
      , template: ejsTemplate
      , xhtml: true
    }));
  }

  return plugins;
})();

export const errorPagesConfig: any = {
  plugins: errorPageHtmlWebpackPlugins
};
