import angular from 'angular'

let canvasView = require('./canvas.view.html')

const states = [];
const canvasrouter = {
	name: 'canvas',
	url: '/canvas',
	template: canvasView,
	controller: 'canvasCtrl as vm',
	lazyLoad: ($transition$) => {
		const $ocLazyLoad = $transition$.injector().get("$ocLazyLoad");
		return import(
			/* webpackChunkName: "canvas.module" */
			'./index'
		)
			.then(mod => $ocLazyLoad.load(mod.default))
	}
}
states.push(canvasrouter)

export default angular.module('canvas.route', [])
	.config(['$stateRegistryProvider', function ($stateRegistry) {
		states.forEach(state => {
			$stateRegistry.register(state)
		})
	}])
