homeCtrl.$inject = ['$scope', '$q'];
function homeCtrl($scope, $q){
	this.aa = '123'
	console.log(this)
	function foo(x, y){
		console.log(x, y)
	}
	foo.apply(null)
	Function.apply.bind(foo)(null, [10, 20])
	Function.apply.bind(foo, null)([100, 200])
	console.log($q.defer().promise.wrap)
}
export {homeCtrl}