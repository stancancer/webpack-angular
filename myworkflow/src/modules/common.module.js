/**
 * common.module
 */

const states = [];
const main = {
	name: "main.**",
	url: "/main",
	lazyLoad: ($transition$) => {
		const $ocLazyLoad = $transition$.injector().get("$ocLazyLoad");

		return import(
			/* webpackChunkName: "maim.module" */
			'./main/main.state.js'
		)
		.then(mod => $ocLazyLoad.load(mod.MAIN_MODULE))
		.catch(err => {
			throw new Error("Ooops, something went wrong, " + err);
		});
	}
};
states.push(main)

const testRouter = {
	name: "test.**",
	url: "/test",
	lazyLoad: ($transition$) => {
		const $ocLazyLoad = $transition$.injector().get("$ocLazyLoad");

		return import(
			/* webpackChunkName: "test.module" */
			'./test/test.state.js'
		)
			.then(mod => $ocLazyLoad.load(mod.TEST_MODULE))
			.catch(err => {
				throw new Error("Ooops, something went wrong, " + err);
			});
	}
};
states.push(testRouter)

export { states }