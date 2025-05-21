const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    bundle: './src/main.ts',
    menu: './src/menu.ts'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@models': path.resolve(__dirname, 'src/models/'),
      '@controllers': path.resolve(__dirname, 'src/controllers/'),
      '@services': path.resolve(__dirname, 'src/services/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@views': path.resolve(__dirname, 'src/views/')
    }
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
