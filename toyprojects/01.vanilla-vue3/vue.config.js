// vue.config.js
module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.md$/,
          // raw-loader 대신 Webpack 5 내장 기능을 사용
          type: "asset/source",
        },
      ],
    },
  },
};
