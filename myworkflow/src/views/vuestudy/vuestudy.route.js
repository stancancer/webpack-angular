import angular from 'angular'

let vueStudyView = require('./vuestudy.html')

const states = [];
const vuestudyrouter = {
	name: 'vuestudy',
	url: '/vuestudy',
	template: vueStudyView,
	controller: 'vueStudyCtrl as vm',
	lazyLoad: ($transition$) => {
		const $ocLazyLoad = $transition$.injector().get("$ocLazyLoad");
		return import(
			/* webpackChunkName: "vuestudy.module" */
			'./index'
		)
			.then(mod => $ocLazyLoad.load(mod.default))
	}
}
states.push(vuestudyrouter)

export default angular.module('vuestudy.route', [])
	.config(['$stateRegistryProvider', function ($stateRegistry) {
		states.forEach(state => {
			$stateRegistry.register(state)
		})
	}])
