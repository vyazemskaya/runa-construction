const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
// const FileIncludeWebpackPlugin = require('file-include-webpack-plugin-replace');
const fs = require('fs');
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

const entryPoints = {
  index: path.resolve(__dirname, 'src', 'index.js'),
  home: path.resolve(__dirname, 'src', 'index.js'),
  'home-w-team': path.resolve(__dirname, 'src', 'index.js'),
  projects: path.resolve(__dirname, 'src', 'index.js'),
  project: path.resolve(__dirname, 'src', 'index.js'),
  portfolio: path.resolve(__dirname, 'src', 'index.js'),
  contacts: path.resolve(__dirname, 'src', 'index.js'),
  'about-company': path.resolve(__dirname, 'src', 'index.js'),
};

const htmlPlugins = Object.keys(entryPoints).map(entryName => {
  return new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src', `${entryName}.html`),
    filename: `${entryName}.html`,
    cache: false,
    chunks: 'all',
  });
});

function processNestedHtml(content, loaderContext, resourcePath = '') {
  let fileDir =
    resourcePath === ''
      ? path.dirname(loaderContext.resourcePath)
      : path.dirname(resourcePath);
  const INCLUDE_PATTERN =
    /\<include src=\"(\.\/)?(.+)\"\/?\>(?:\<\/include\>)?/gi;

  function replaceHtml(match, pathRule, src) {
    if (pathRule === './') {
      fileDir = loaderContext.context;
    }
    const filePath = path.resolve(fileDir, src);
    loaderContext.dependency(filePath);
    const html = fs.readFileSync(filePath, 'utf8');
    console.log(html);

    return processNestedHtml(html, loaderContext, filePath);
  }

  if (!INCLUDE_PATTERN.test(content)) {
    return content;
  } else {
    return content.replace(INCLUDE_PATTERN, replaceHtml);
  }
}

function processHtmlLoader(content, loaderContext) {
  let newContent = processNestedHtml(content, loaderContext);
  return newContent;
}

module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    static: path.resolve(__dirname, 'src'),
    port: 3000,
    open: true,
    hot: true,
    watchFiles: path.join(__dirname, 'src'),
    // watchOptions: {
    //   ignored: /node_modules/,
    // },
    // watchFiles: ["src/*.html"],
  },
  entry: {
    main: path.resolve(__dirname, 'src', 'index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: '[name][contenthash].js',
    assetModuleFilename: 'assets/images/',
  },

  plugins: [
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   template: 'src/index.html',
    //   chunks: 'all',
    //   cache: false,
    // }),
    ...htmlPlugins,
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: {
              // sources: false,
              minimize: false,
              esModule: false,
              preprocessor: processHtmlLoader,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|webp|gif|svg)$/i,
        use: devMode
          ? []
          : [
              {
                loader: 'image-webpack-loader',
                options: {
                  mozjpeg: {
                    progressive: true,
                  },
                  optipng: {
                    enabled: false,
                  },
                  pngquant: {
                    quality: [0.65, 0.9],
                    speed: 4,
                  },
                  gifsicle: {
                    interlaced: false,
                  },
                  webp: {
                    quality: 75,
                  },
                },
              },
            ],
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
      {
        test: /\.(?:js|mjs|cjs)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
      {
        test: /\.(mov|mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      '...',
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              'imagemin-gifsicle',
              'imagemin-mozjpeg',
              'imagemin-pngquant',
              'imagemin-svgo',
            ],
          },
        },
        generator: [
          {
            preset: 'webp',
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              plugins: ['imagemin-webp'],
            },
          },
        ],
      }),

      new ImageminWebpWebpackPlugin({
        config: [
          {
            test: /\.(jpe?g|png)/,
            options: {
              quality: 75,
            },
          },
        ],
        overrideExtension: true,
        detailedLogs: false,
        silent: false,
        strict: true,
      }),
    ],
    minimize: true,
  },
};
