const path = require('path')
const {
  addBabelPlugin,
  addDecoratorsLegacy,
  addPostcssPlugins,
  addWebpackAlias,
  useEslintRc
} = require('customize-cra')

const resolve = function (dir) {
  return path.resolve(__dirname, 'src', dir)
}

/**
 * `react-app-rewire-hot-loader` https://www.npmjs.com/package/react-app-rewire-hot-loader
 */
const rewireHotLoader = (config, env) => {
  if (env === 'production') {
    return config
  }
  // Find a rule which contains eslint-loader
  const condition = u => typeof u === 'object' && u.loader && u.loader.includes('eslint-loader')
  const rule = config.module.rules.find(rule => rule.use && rule.use.some(condition))
  if (rule) {
    const use = rule.use.find(condition)
    if (use) {
      // Inject the option for eslint-loader
      use.options.emitWarning = true
    }
  }
  // If in development, add 'react-hot-loader/babel' to babel plugins.
  return addBabelPlugin('react-hot-loader/babel')(config)
}

// postcss vw plugins
const postCssPlugins = [
  require('postcss-flexbugs-fixes'),
  require('postcss-aspect-ratio-mini'),
  require('postcss-px-to-viewport')({
    viewportWidth: 750, // (Number) The width of the viewport.
    viewportHeight: 1334, // (Number) The height of the viewport.
    unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
    viewportUnit: 'vw', // (String) Expected units.
    // 排除UI组件前缀 antd-mobile 为 .am，markdown-css前缀 .markdown
    selectorBlackList: ['.ignore', '.hairlines', '.am', '.markdown'], // (Array) The selectors to ignore and leave as px.
    minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
    mediaQuery: false // (Boolean) Allow px to be converted in media queries.
  }),
  require('postcss-write-svg')({
    utf8: false
  }),
  require('postcss-cssnext'),
  require('postcss-viewport-units'),
  require('cssnano')({
    preset: 'advanced',
    autoprefixer: false,
    'postcss-zindex': false
  })
]

/**
 * 修改默认配置
 */
module.exports = function (config, env) {
  // 开发模式使用react-hot-loader
  rewireHotLoader(config, env)

  // 添加postcss插件
  addPostcssPlugins(postCssPlugins)(config)

  // 按需加载组件代码和样式
  addBabelPlugin(['import', {
    libraryName: 'antd-mobile',
    style: 'css'
  }])(config)

  // 使用自定义.eslintrc
  useEslintRc('./.eslintrc')(config)

  // 装饰器，主要用于mobx
  addDecoratorsLegacy()(config)

  // 别名
  addWebpackAlias({
    '@src': resolve(''),
    '@api': resolve('api'),
    '@utils': resolve('utils'),
    '@store': resolve('store'),
    '@routes': resolve('routes'),
    '@pages': resolve('pages'),
    '@layouts': resolve('layouts'),
    '@components': resolve('components'),
    '@styles': resolve('assets/styles'),
    '@images': resolve('assets/images')
  })(config)

  // 返回config
  return config
}

