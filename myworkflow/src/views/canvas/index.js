import angular from 'angular'
import { canvasCtrl } from './canvas.controller'

export default angular.module('canvas.view', [])
	.controller(canvasCtrl.name, canvasCtrl)