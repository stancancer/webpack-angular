import angular from 'angular'
import uiRouter from '@uirouter/angularjs'
import ocLazyLoad from 'ocLazyLoad'

import jqurey from './lib/jquery-1.11.1.min.js';

import './css/bootstrap.css'
import './css/base.css'
import './css/extral.css'
// import { states } from './modules/common.module'
import homeRoute from './views/home/home.route';
import experimentRoute from './views/experiment/experiment.route';
import vueStudyRoute from './views/vuestudy/vuestudy.route';
import canvasRoute from './views/canvas/canvas.route';
window.jQuery = jqurey;
window.$ = jqurey;
export const selfapp = angular.module('userapp', [
	ocLazyLoad,
	uiRouter,
	homeRoute.name,
	experimentRoute.name,
	vueStudyRoute.name,
	canvasRoute.name
])
	.config(['$stateRegistryProvider', '$urlRouterProvider', '$controllerProvider',
		function ($stateProvider, $urlRouterProvider, $controllerProvider) {
		// $controllerProvider.allowGlobals();
		$urlRouterProvider.otherwise('/home')
		// states.forEach(state => $stateProvider.register(state));
	}])