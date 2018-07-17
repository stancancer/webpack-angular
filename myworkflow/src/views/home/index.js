import angular from 'angular'
import {homeCtrl} from './home.controller'

export default angular.module('home.view', [])
	.controller(homeCtrl.name, homeCtrl)