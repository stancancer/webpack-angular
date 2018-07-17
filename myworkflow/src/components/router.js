
class routeHelper1{
	constructor($stateRegistryProvider){
		this.$stateRegistryProvider = $stateRegistryProvider;
	}

	loadCtrl(state, url = './index.js') {
		state.lazyLoad = $transition$ => {
			const $ocLazyLoad = $transition$.injector().get("$ocLazyLoad");
			// const url = state.controllerUrl || './index.js';
			return import(
				/* webpackChunkName: "home.module" */
				url
			)
				.then(mod => $ocLazyLoad.load(mod.default))
				.catch(err => {
					throw new Error(`Load controller failed --, ${err}`);
				});
		}
	}

	register(states) {
		states.forEach(state => {
			this.$stateRegistryProvider.register(state)
		});
	}
}

function loadCtrl(url = './index') {
	return function ($transition$){
		const $ocLazyLoad = $transition$.injector().get("$ocLazyLoad");
		return import(
			/* webpackChunkName: "home.module" */
			url
		)
			.then(mod => $ocLazyLoad.load(mod.default))
			.catch(err => {
				throw new Error(`Load controller failed --, ${err}`);
			});
	}
}

function routerProvider($stateRegistryProvider) {
	const obj = new routeHelper1($stateRegistryProvider)
	this.$stateRegistryProvider = obj.$stateRegistryProvider
	this.loadCtrl = obj.loadCtrl;
	this.register = obj.register;

}
routerProvider.$inject = ['$stateRegistryProvider']


export { loadCtrl} 