import '../../../lib/bootstrap';
import '../../../lib/cropper';
import '../../../css/cropper.css';

cropperCtrl.$inject = ['$scope'];
function cropperCtrl($scope){

	$scope.$parent.testTitle = 'Cropper'

	// 初始化cropper
	this.initCropper = ($el) => {
		if (this.$cropper) {
			this.$cropper.replace(this.imgUrl);
			return
		}
		$el.cropper({
			crop: (e) => {
				this.detail = e.detail;
				if (!$scope.$$phase) {
					$scope.$apply()
				}
			}
		});
		this.$cropper = $el.data('cropper');
	}
	// 上传图片
	this.uploadImg = (el) => {
		let $el = $(el.target).next();
		let $img = $('.crop-img');
		$el.on('change', () => {
			let file = $el[0].files[0];
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (e) => {
				this.imgUrl = e.target.result;
				$scope.$apply();
				$el.val('').off('change');
				this.initCropper($img)
			}
		})
	}
	// this.handle = (fnType, ...rest) => this.$cropper[fnType].apply(this.$cropper, rest)
	// 获取裁剪后的图片
	this.getCroppedCanvas = (img, options) => {
		// create canvas 并把其设置为图片大小
		let cvs = document.createElement('canvas');
		let width = img.naturalWidth;
		let height = img.naturalHeight;
		cvs.width = width;
		cvs.height = height;
		
		// 把图片画到canvas上
		let ctx = cvs.getContext('2d');
		let destX = 0;
		let destY = 0;

		if(options.scaleX === -1 || options.scaleY === -1){
			destX = options.scaleX === -1 ? width * -1 : 0;
			destY = options.scaleY === -1 ? height * -1 : 0;
			ctx.scale(options.scaleX, options.scaleY)
		}
		
		ctx.drawImage(img, destX, destY);

		function updateCanvas(cvs, ctx){
			// 从 canvas 上截取裁剪之后的图片
			let imgData = ctx.getImageData(options.x, options.y, options.width, options.height);

			// 把 canvas 设为截取区域的大小，并把裁剪之后的图片放到 canvas 上
			cvs.width = options.width;
			cvs.height = options.height;

			ctx.putImageData(imgData, 0, 0);
		}
		
		if(options.rotate !== 0){
			let newCvs = document.createElement('canvas');
			let deg = options.rotate / 180 * Math.PI;
			// 重新计算宽高，以放下旋转之后的图片
			newCvs.width = Math.abs(width * Math.cos(deg)) + Math.abs(height * Math.sin(deg));
			newCvs.height = Math.abs(width * Math.sin(deg)) + Math.abs(height * Math.cos(deg));

			let newCtx = newCvs.getContext('2d');
			newCtx.save();
			newCtx.translate(newCvs.width / 2, newCvs.height / 2);
			newCtx.rotate(deg);
			destX = -width / 2;
			destY = -height / 2;

			newCtx.drawImage(cvs, destX, destY)
			newCtx.restore()

			updateCanvas(newCvs, newCtx)
			return newCvs.toDataURL()
		}
		
		updateCanvas(cvs, ctx)
		return cvs.toDataURL()
	}

	// 压缩并输出图片
	this.compressImg = (img) => {
		let cvs = document.createElement('canvas');
		let maxWidth = 800;
		
		let width = img.width;
		let height = img.height;
		let ratio = width / height;

		if(width > maxWidth){
			width = maxWidth;
			height = width / ratio;
		}

		cvs.width = width;
		cvs.height = height;
		let ctx = cvs.getContext('2d');
		ctx.drawImage(img, 0, 0, width, height);

		// let quality = width >= 800 ? 0.5 : width > 600 ? 0.6 : 1;
		// 导出base64
		return cvs.toDataURL()
	}

	this.getCroppedImg = (options) => {
		let img = $('.crop-img')[0];
		let newImg = new Image();
		newImg.src = this.getCroppedCanvas(img, options);
		newImg.onload = () => {
			this.croppedImg = this.compressImg(newImg)
			$scope.$apply()
			$('.crop-modal').modal({
				backdrop: true
			})
		}
	}

	// 下载图片
	this.downloadImg = (e, src) => {
		let $el = $(e.target);
		$el.attr('href', src).attr('download', 'avatar.png')
	}

	// 数组去重
	function removeDuplicates(array){
		let seen = {};
		let result = [];
		for (let i = 0; i < array.length; i++) {
			const element = array[i];
			if (!seen.hasOwnProperty(element)) {
				seen[element] = true;
				result.push(element)
			}
		}
		return result
	}

	console.log(removeDuplicates([1, 2, 2, 3,4, 3, 5, 7,8,8 ,3423,4,9,2]))


}

export { cropperCtrl }