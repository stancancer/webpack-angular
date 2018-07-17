function canvasCtrl(){
	let vm = this;

	function getPoint(ele, e){
		let touch = e;
		if (e.changedTouches){
			touch = e.changedTouches[0]
		}
		let x = (touch.pageX || touch.clientX + document.body.scrollLeft + document.documentElement.scrollLeft);
		x -= ele.offsetLeft;
		let y = (touch.pageY || touch.clientY + document.body.scrollTop + document.documentElement.scrollTop);
		y -= ele.offsetTop;
		return { x, y };
	}

	function getRandom(min, max){
		return Math.round(Math.random() * (min - max) + min)
	}

	this.tool = { getPoint, getRandom };



	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	var centerX = Math.floor(canvas.width / 2);  //取canvas的中心
	var centerY = Math.floor(canvas.height / 2); //取canvas的中心
	var rotation = 0;  //旋转角度
	var disks = [];  //存放页面上有多少个三角磁铁
	// 三角磁铁函数
	function Disk(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	};
	
	// 初始化有一个磁铁
	var d = new Disk(centerX, centerY, 100, 10);
	var point = {};
	disks.push(d);

	// 事件
	document.getElementById("addDisk").addEventListener('click', function (e) {
		console.log(e)
		var height = vm.tool.getRandom(5, 10);
		var width = vm.tool.getRandom(30, 70);
		var x = Math.floor(Math.random() * canvas.width);
		var y = Math.floor(Math.random() * canvas.height);
		disks.push(new Disk(x, y, width, height));
		drawDisk(point)
	});

	//绘制磁铁
	function drawDisk(point) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (var i = 0; i < disks.length; i++) {
			var d = disks[i];
			//计算旋转角度
			rotation = Math.atan2(point.y - d.y, point.x - d.x);
			// 绘制红色小圆点
			ctx.beginPath();
			ctx.fillStyle = 'red';
			ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI, true);
			ctx.fill();
			//绘制三角磁铁
			ctx.save();
			ctx.translate(d.x, d.y);
			ctx.rotate(rotation);
			ctx.beginPath();
			ctx.fillStyle = 'red';
			ctx.moveTo(d.width, 0);
			ctx.lineTo(0, -d.height);
			ctx.lineTo(0, d.height);
			ctx.closePath();
			ctx.fill();
			ctx.beginPath();
			ctx.fillStyle = 'blue';
			ctx.moveTo(-d.width, 0);
			ctx.lineTo(0, -d.height);
			ctx.lineTo(0, d.height);
			ctx.closePath();
			ctx.fill();
			ctx.restore();
		};
		// requestAnimationFrame(drawDisk); //循环调用本身
	};
	drawDisk(point);	

	canvas.addEventListener('mousemove', function (e) {
		let point = vm.tool.getPoint(this, e);
		drawDisk(point);
	}, false);

}
canvasCtrl.$inject = [];
export { canvasCtrl }