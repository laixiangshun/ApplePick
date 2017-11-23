/**
 * Created by lailai on 2017/11/23.
 */
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
ModuleConfig.plugins.push(new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify("production")
    }
}));
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
            loader: ExtractTextPlugin.extract('style-loader','css-loader','less-loader')
        },{
            test: /\.(png|jpg|jpeg|gif|bmp)$/,
            loader: 'url?limit=8192' //小于8k直接转换为base64
        },{
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=10000&minetype=application/font-woff'
        },{
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader'
        }
    ]
};
ModuleConfig.devServer=require('./webpack.config/devServer.config.js');

module.exports=ModuleConfig;