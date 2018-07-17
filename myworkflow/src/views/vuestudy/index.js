import angular from 'angular'
import { vueStudyCtrl } from './vuestudy.controller'

export default angular.module('vuestudy.view', [])
	.controller(vueStudyCtrl.name, vueStudyCtrl)