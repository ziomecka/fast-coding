/** CSS */
const postcssFlexbugs = require('postcss-flexbugs-fixes');
const postcssLost = require('lost');
const postcssImport = require('postcss-import');
const postcssNext = require('postcss-cssnext');
const cssDeclarationSorter = require('css-declaration-sorter');
const cssMqpacker = require('css-mqpacker');

module.exports = [
    {
        test: /\.(js|jsx)?$/,
        use: [ 'babel-loader' ],
        exclude: /node_modules/,
    },
    {
        test: /\.svg$/,
        use: [
            "babel-loader",
            {
                loader: "react-svg-loader",
                options: {
                    jsx: true,
                    svgo: {
                        plugins: [{ removeTitle: false }],
                        floatPrecision: 2
                    }
                }
            }
        ]
    },
  {
    test: /\.sass$/,
    exclude: /node_modules/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          sourceMap: false
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            postcssFlexbugs(),
            postcssLost(),
            postcssImport(),
            postcssNext({
              browsers: ['last 2 version', 'Safari 7', 'ie 10'],
            }),
            cssDeclarationSorter({
              order: 'concentric-css',
            }),
            cssMqpacker(),
          ],
          sourceMap: false,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: false
        }
      },
    ],
  },
];