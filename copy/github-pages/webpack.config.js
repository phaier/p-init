const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => {
  const enabledSourceMap = argv.mode !== 'production';
  const outputStyle = enabledSourceMap ? 'nested' : 'compressed';

  return [
    {
      entry: {
        index: './src/entries/index.tsx',
      },
      devtool: 'source-map',
      output: {
        path: path.join(__dirname, './dist/repo/js'),
        filename: '[name].js',
      },
      target: ['web'],
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
          },
          {
            test: /\.css$/,
            use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader', options: { importLoaders: 1 } }],
          },
          {
            test: /\.scss/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  url: false,
                  sourceMap: enabledSourceMap,
                  importLoaders: 2,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: enabledSourceMap,
                  sassOptions: {
                    outputStyle,
                  },
                },
              },
            ],
          },
        ],
      },
      plugins: [
        new webpack.WatchIgnorePlugin({
          paths: [/\.js$/, /\.d\.ts$/],
        }),
        new MiniCssExtractPlugin({
          filename: '[name].css',
        }),
      ],

      externals: {
        jquery: 'jQuery',
        vue: 'Vue',
        react: 'React',
        'react-dom': 'ReactDOM',
      },
      resolve: {
        alias: {
          vue$: 'vue/dist/vue.esm.js',
        },
        extensions: ['.ts', '.tsx', '.js', '.json'],
        plugins: [new TsconfigPathsPlugin({ configFile: 'tsconfig.json' })],
      },
    },
  ];
};
