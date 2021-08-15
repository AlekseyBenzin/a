const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const withPWA = require('next-pwa')

const { ESBuildMinifyPlugin } = require('esbuild-loader')

function UseEsbuildMinify(config, options) {
  const terserIndex = config.optimization.minimizer.findIndex(
    minimizer => minimizer.constructor.name === 'TerserPlugin'
  )

  if (terserIndex > -1) {
    config.optimization.minimizer.splice(
      terserIndex,
      1,
      new ESBuildMinifyPlugin(options)
    )
  }
}

function UseEsbuildLoader(config, options) {
  const jsLoader = config.module.rules.find(
    rule => rule.test && rule.test.test('.js')
  )

  if (jsLoader && jsLoader.use) {
    if (jsLoader.use.length > 0) {
      jsLoader.use.forEach(e => {
        e.loader = 'esbuild-loader'
        e.options = options
      })
    } else {
      jsLoader.use.loader = 'esbuild-loader'
      jsLoader.use.options = options
    }
  }
}

const nextConfig = {
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en'
  },

  webpack(config, { webpack, isServer, dev }) {
    config.plugins.push(
      new webpack.ProvidePlugin({
        React: 'react'
      })
    )

    UseEsbuildMinify(config)
    UseEsbuildLoader(config, {
      loader: 'jsx',
      target: 'es2017'
    })

    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader']
    })

    if (isServer && dev) {
      require('./scripts/sitemap')
    }

    return config
  }
}

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: 'public',
          disable: process.env.NODE_ENV === 'development',
          publicExcludes: [
            '!img/textures/**/*',
            '!img/thumb/**/*',
            '!models/**/*'
          ]
        }
      }
    ],
    withBundleAnalyzer
  ],
  nextConfig
)
