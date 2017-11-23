/**
 * Created by lailai on 2017/11/22.
 */
let path=require('path');
let webpack=require('webpack');
let HtmlWebpackPlugin=require('html-webpack-plugin');
let ExtractTextPlugin=require('extract-text-webpack-plugin');

let ROOT_PATH=path.resolve(__dirname);
let ModuleConfig={};

ModuleConfig.entry=require('./webpack.config/module.config.js').entry;

ModuleConfig.output={
    path: path.join(ROOT_PATH,'/dist'),
    publicPath: '',
    filename: '[hash].[name].js'
};
ModuleConfig.plugins=require('./webpack.config/module.config.js').plugins;

ModuleConfig.resolve={};

ModuleConfig.module={
    loaders: [
        {
            test: /(\.jsx|\.js)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
            //query: {
            //    presets: ['react','es2015']
            //}
        },{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader','css-loader')
        },{
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader','css-loader!less-loader')
        }
    ]
};
ModuleConfig.devServer=require('./webpack.config/devServer.config.js');

module.exports=ModuleConfig;