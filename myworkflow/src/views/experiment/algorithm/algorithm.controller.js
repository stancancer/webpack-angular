import { runInContext } from "vm";

/**
 * algorithm
 */
algorithmCtrl.$inject = ['$scope'];
function algorithmCtrl($scope){
	$scope.$parent.testTitle = 'algorithm'

	/**
	 * 汉诺塔问题
	 */

	this.hanoi = (n, a, b, c) => {
		if (n === 1) {
			console.log(`${a} ---> ${c}`);
		}else{
			this.hanoi(n-1, a, c, b);
			console.log(`${a} ---> ${c}`)
			this.hanoi(n-1, b, a, c);
		}
	}

	this.hanoi(3, "A", "B", "C")

	/**
	 * setTimeout / setInterval
	 */
	let start = Date.now();
	// foo1();
	// foo2();
	function actions(fn){
		console.log(fn, Date.now() - start);
	}
	function foo1(){
		let foo3 = () => actions('foo3');
		setTimeout(foo3, 0);
		actions('foo1')
	}
	function foo2(){
		actions('foo2 - 1');
		let foo4 = () => actions('foo4');
		let Interval = setInterval(foo4, 0);
		setTimeout(() => clearInterval(Interval), 1000)
		for (let i = 0; i < 1000; i++) {
			console.log(`block this fn ${Date.now() - start}`)
		}
		actions('foo2 - 2')
	}

	/**
	 * 回调验证
	 */
	function asyncify(fn){
		var orig_fn = fn;
		var intv = setTimeout(() => {
			intv = null;
			if(fn) fn();
		}, 0);
		fn = null;
		return function (){
			if (intv) {
				fn = orig_fn.bind.apply(orig_fn, [this].concat([].slice.call(arguments)))
			}else{
				orig_fn.apply(this, arguments)
			}
		}
	}

	function res(){
		console.log(a)
	}
	var a = 0;
	setTimeout(() => {
		asyncify(res)()
	}, 100);

	a++

	/**
	 * Promise 的 Generator Runner
	 */
	function Run(gen){
		var args = [].slice.call(arguments, 1);
		var it = gen.apply(this, args);

		// 返回一个promise用于生成器完成
		return Promise.resolve().then(function handleNext(value){
			var next = it.next(value);
			return (function handleResult(next){
				if(next.done){
					return next.value;
				}else{
					return Promise.resolve(next.value).then(handleNext, function handleError(err){
						return Promise.resolve(it.throw(err)).then(handleResult)
					})
				}
			})(next)
		})
	}
	function *foo(val){
		if (val > 1) {
			val = yield *foo(val - 1)
		}
		return yield new Promise(function (resolve, reject){
			setTimeout(()=>{
				resolve(val)
			})
		})
	}
	function *bar(){
		var r1 = yield *foo(3)
		console.log(r1)
	}
	Run(bar)


	/**
	 * 截留函数
	 */
	function throttle(fn, wait, options) {
		var context, args, result;
		var timeout = null;
		var previous = 0;
		var options = Object.assign({ leading: true, trailing: true }, options);
		var later = function () {
			previous = options.leading === false ? 0 : Date.now();
			timeout = null;
			result = fn.apply(context, args);
			if (!timeout) context = args = null;
		};
		return function () {
			var now = Date.now();
			if (!previous && options.leading === false) previous = now;
			var remaining = wait - (now - previous);
			context = this;
			args = arguments;
			if (remaining <= 0 || remaining > wait) {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
				previous = now;
				result = fn.apply(context, args);
				if (!timeout) context = args = null;
			} else if (!timeout && options.trailing !== false) {
				timeout = setTimeout(later, remaining);
			}
			return result;
		}
	}

	function moveFn(e) {
		console.log(e.pageX)
	}
	var handleMoveFn = throttle(moveFn, 500,{trailing: false});
	var dEle = document.getElementsByTagName('h4');
	window.addEventListener('mousemove', handleMoveFn)
}

export { algorithmCtrl }