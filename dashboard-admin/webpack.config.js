module.exports = {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,  // Ekstensi yang akan diproses oleh Babel
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],  // Tambahkan .jsx agar dapat diproses
    },
  };
  