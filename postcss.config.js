// postcss.config.js

// PostCSS 配置文件需要导出一个对象
module.exports = {
  // 配置要使用的相关插件
  plugins: {
    // 把 px 转为 viewport
    'postcss-px-to-viewport': {
      viewportWidth: 375
    }
  }
}
