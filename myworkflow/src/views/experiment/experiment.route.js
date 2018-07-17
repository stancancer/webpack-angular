import angular from 'angular';
const experiment = require('./experiment.html');
const corpperView = require('./cropper/cropper.html');
const algorithmView = require('./algorithm/algorithm.html');
const layoutView = require('./layout/layout.html');

const states = [];
/**
 * test主模块
 */
const test = {
	name: 'test',
	url: '/test',
	template: experiment,
	lazyLoad: ($transition$) => {
		const $ocLazyLoad = $transition$.injector().get("$ocLazyLoad");
		return import(
			/* webpackChunkName: "experiment.module" */
			'./index'
		)
			.then(mod => $ocLazyLoad.load(mod.default))
	}
}
states.push(test)
/**
 * cropper使用
 */
const cropper = {
	name: 'test.cropper',
	url: '/cropper',
	template: corpperView,
	controller: 'cropperCtrl as vm',
}
states.push(cropper)
/**
 * 布局测试
 */
const layout = {
	name: 'test.layout',
	url: '/layout',
	template: layoutView,
	controller: 'layoutCtrl as vm',
}
states.push(layout)

/**
 * 算法测试
 */
const algorithm = {
	name: 'test.algorithm',
	url: '/algorithm',
	template: algorithmView,
	controller: 'algorithmCtrl as vm',
}
states.push(algorithm)

export default angular.module('experiment.route', [])
	.config(['$stateRegistryProvider', function ($stateRegistry) {
		states.forEach(state => $stateRegistry.register(state));
	}])