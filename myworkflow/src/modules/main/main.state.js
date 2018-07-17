import angular from 'angular'
// import ocLazyLoad from 'oclazyload'

const states = [];
const mainrouter = {
	name: 'main',
	url: '/main',
	templateUrl: './assets/views/main.view.html',
	controller: 'mainCtrl as vm',
	resolve: {
		loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
			return $ocLazyLoad.load("./assets/views/main.controller.js");
		}]
	}
}
states.push(mainrouter)

const MAIN_MODULE = angular.module('main', [])
	.config(['$stateRegistryProvider', function ($stateRegistry) {
		states.forEach(state => $stateRegistry.register(state));
	}])

// export { states };
export { MAIN_MODULE }