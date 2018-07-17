const states = [];
/**
 * test主模块
 */
const test = {
	name: 'test',
	url: '/test',
	templateUrl: './assets/views/test/test.html',
}
states.push(test)
/**
 * cropper使用
 */
const cropper = {	
	name: 'test.cropper',
	url: '/cropper',
	templateUrl: './assets/views/cropper/cropper.html',
	controller: 'cropperCtrl as vm',
	resolve: {
		loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
			return $ocLazyLoad.load("./assets/views/cropper/cropper.controller.js");
		}]
	}
}
states.push(cropper)
/**
 * 布局测试
 */
const layout = {
	name: 'test.layout',
	url: '/layout',
	templateUrl: './assets/views/layout/layout.html',
	controller: 'layoutCtrl as vm',
	resolve: {
		loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
			return $ocLazyLoad.load("./assets/views/layout/layout.controller.js");
		}]
	}
}
states.push(layout)

/**
 * 算法测试
 */
const algorithm = {
	name: 'test.algorithm',
	url: '/algorithm',
	templateUrl: './assets/views/algorithm/algorithm.html',
	controller: 'algorithmCtrl as vm',
	resolve: {
		loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
			return $ocLazyLoad.load("./assets/views/algorithm/algorithm.controller.js");
		}]
	}
}
states.push(algorithm)

const TEST_MODULE = angular.module('test', [])
	.config(['$stateRegistryProvider', function ($stateRegistry) {
		states.forEach(state => $stateRegistry.register(state));
	}])

export { TEST_MODULE }