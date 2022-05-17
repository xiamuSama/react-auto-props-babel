const path = require('path');

module.exports = {
  entry: {
    index: './src/index.tsx',
    framework: ['react','react-dom'],
  },
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  }
}
