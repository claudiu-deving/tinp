'use strict';

const path = require('path');

/**@type {import('webpack').Configuration}*/
const clientConfig = {
    target: 'node',
    mode: 'none',
    entry: './client/src/extension.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'extension.js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        vscode: 'commonjs vscode'
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    devtool: 'nosources-source-map'
};

/**@type {import('webpack').Configuration}*/
const serverConfig = {
    target: 'node',
    mode: 'none',
    entry: './server/server.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        vscode: 'commonjs vscode'
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    devtool: 'nosources-source-map'
};

module.exports = [clientConfig, serverConfig];