const {createPlugin} = require('docz-core')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const style = ({env = {}} = {}) =>
  createPlugin({
    modifyBundlerConfig: (config, dev) => {
      if (!dev) {
        config.plugins.push(
          new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
          })
        )
      }

      const cssLoader = {
        loader: require.resolve('css-loader'),
        options: {importLoaders: 1, sourceMap: !dev},
      }

      const cssModulesLoader = {
        loader: cssLoader.loader,
        options: {
          ...cssLoader.options,
          modules: true,
          importLoaders: 1,
          localIdentName: '[name]-[local]-[hash:base64:4]',
        },
      }

      const postCSSLoader = {
        loader: require.resolve('postcss-loader'),
        options: {
          sourceMap: !dev,
          ident: 'postcss',
          plugins: [
            require('postcss-preset-env')({
              stage: 3,
              ...env,
            }),
            !dev && require('cssnano'),
          ].filter(Boolean),
        },
      }

      const getLoaders = ({modules = false} = {}) => {
        return [
          dev ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
          modules ? cssModulesLoader : cssLoader,
          postCSSLoader,
        ]
      }

      config.module.rules.push({
        test: /\.css$/,
        oneOf: [
          {
            include: /\.module\.css$/,
            use: getLoaders({modules: true}),
          },
          {
            use: getLoaders(),
          },
        ],
      })

      return config
    },
  })

module.exports = style
