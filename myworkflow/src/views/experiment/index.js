import angular from 'angular';
import {algorithmCtrl} from './algorithm/algorithm.controller';
import {cropperCtrl} from './cropper/cropper.controller';
import {layoutCtrl} from './layout/layout.controller';


export default angular.module('experiment.view', [])
	.controller(algorithmCtrl.name, algorithmCtrl)
	.controller(cropperCtrl.name, cropperCtrl)
	.controller(layoutCtrl.name, layoutCtrl)