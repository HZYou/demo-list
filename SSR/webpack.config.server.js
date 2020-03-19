module.exports = {
    mode: 'none',
    entry: './src/index-server.js',
    output: {
        filename: 'server.js',
    },
    target: 'node',
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/env'
                ]
            }
        },

        {
            test: /\.css$/,
            use: ['isomorphic-style-loader', 'css-loader']
        }
        ]
    },
    node: {
        __dirname: false
    }
}