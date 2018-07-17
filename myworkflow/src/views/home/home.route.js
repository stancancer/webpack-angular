import angular from 'angular'

let homeView = require('./home.view.html')

const states = [];
const homerouter = {
	name: 'home',
	url: '/home',
	template: homeView,
	controller: 'homeCtrl as vm',
	lazyLoad: ($transition$) => {
		const $ocLazyLoad = $transition$.injector().get("$ocLazyLoad");
		return import(
			/* webpackChunkName: "home.module" */
			'./index'
		)
			.then(mod => $ocLazyLoad.load(mod.default))
	}
}
states.push(homerouter)

export default angular.module('home.route', [])
	.config(['$stateRegistryProvider', function ($stateRegistry) {
		states.forEach(state => {
			$stateRegistry.register(state)
		})
	}])
