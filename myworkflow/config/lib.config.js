let libs = [
	'./src/lib/jquery-1.11.1.min.js',
	'./node_modules/angular/angular.min.js',
	'./node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
	'./node_modules/oclazyload/dist/ocLazyLoad.min.js',
	'./src/lib/bootstrap.js',
	'./src/lib/cropper.js',
];

libs = libs.map(lib => {
	let obj = {
		outputPath: 'assets/lib/',
		publicPath: 'assets/lib/',
		includeSourcemap: false,
		filepath : lib
	}
	return obj
})
module.exports = libs;