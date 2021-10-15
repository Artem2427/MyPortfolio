'use strict';

let path = require('path'); // техническая переменная трогать её не нужно

module.exports = {
	mode: 'development', // режим в котором будет работать webpack 2 режим (product)
	entry: './js/script.js', // файл в который будут приходить все import и require 
	output: { 									// файл на выходе 
		filename: 'bundle.js',		// имя файла 
		path: __dirname + '/js'  // папка куда он пойдет 
	},
	watch: true,  // означает что webpack будет следить за каждым изменением
	devtool: 'source-map',  // сохранение исходных файлов
	module: {}  //
}