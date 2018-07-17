vueStudyCtrl.$inject = [];
function vueStudyCtrl(){
	console.log('vuestudy')

	/** vue 响应式系统原理 */

	// 订阅者 Dep
	class Dep {
		constructor() {
			this.subs = [];
		}

		addSub(sub) {
			this.subs.push(sub)
		}

		notify() {
			this.subs.forEach((sub) => {
				sub.update()
			})
		}
	}

	// 观察者
	class Watcher {
		constructor() {
			Dep.target = this;
		}

		update() {
			console.log('视图更新了~')
		}
	}
	Dep.target = null;

	//依赖收集
	function defineReactive(obj, key, val) {
		const dep = new Dep();

		Object.defineProperty(obj, key, {
			enumerable: true,
			configurable: true,
			get: function reactiveGetter() {
				dep.addSub(Dep.target)
				return val
			},
			set: function reactiveSetter(newVal) {
				if (newVal === val) return;
				dep.notify();
			}
		})
	}
	// 观察者
	function observe(value) {
		if (!value || typeof value !== 'object') return;
		Object.keys(value).forEach((key) => {
			defineReactive(value, key, value[key])
		})
	}

	class Vue{
		constructor(options){
			this._data = options.data;
			observe(this._data);
			new Watcher()
			console.log('render~', this._data.test)
		}
	}

	this.data = {
		test: 1
	}

	let instance = new Vue({
		data: {
			test: 1
		}
	})

	this.mockRender = () => {
		instance._data.test++
	}



	/** 编译template模板 */

	const ncname = '[a-zA-Z_][\\w\\-\\.]*';
	const singleAttrIdentifier = /([^\s"'<>/=]+)/
	const singleAttrAssign = /(?:=)/
	const singleAttrValues = [
		/"([^"]*)"+/.source,
		/'([^']*)'+/.source,
		/([^\s"'=<>`]+)/.source
	]
	const attribute = new RegExp(
		'^\\s*' + singleAttrIdentifier.source +
		'(?:\\s*(' + singleAttrAssign.source + ')' +
		'\\s*(?:' + singleAttrValues.join('|') + '))?'
	)

	const qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')'
	const startTagOpen = new RegExp('^<' + qnameCapture)
	const startTagClose = /^\s*(\/?)>/

	const endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>')

	const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g

	const forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/

	let html = '<div :class="c" class="demo" v-if="isShow"><span v-for="item in sz">{{item}}</span></div>';

	let index = 0;
	function advance(n){
		index += n;
		html = html.substring(n)
	}

	// parseStartTag
	function parseStartTag() {
		const start = html.match(startTagOpen);
		if (start) {
			const match = {
				tagName: start[1],
				attrs: [],
				start: index
			}
			advance(start[0].length);

			let end, attr
			while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
				advance(attr[0].length)
				match.attrs.push({
					name: attr[1],
					value: attr[3]
				});
			}
			if (end) {
				match.unarySlash = end[1];
				advance(end[0].length);
				match.end = index;
				return match
			}
		}
	}

	// parseTxt
	function parseText(text) {
		if (!defaultTagRE.test(text)) return;

		const tokens = [];
		let lastIndex = defaultTagRE.lastIndex = 0
		let match, index
		while ((match = defaultTagRE.exec(text))) {
			index = match.index

			if (index > lastIndex) {
				tokens.push(JSON.stringify(text.slice(lastIndex, index)))
			}

			const exp = match[1].trim()
			tokens.push(`_s(${exp})`)
			lastIndex = index + match[0].length
		}

		if (lastIndex < text.length) {
			tokens.push(JSON.stringify(text.slice(lastIndex)))
		}
		return tokens.join('+');
	}

	// makeAttrMap
	function makeAttrsMap(attrs) {
		let map = {}
		for (let i = 0, l = attrs.length; i < l; i++) {
			map[attrs[i].name] = attrs[i].value;
		}
		return map
	}

	// parseHtml
	const stack = [];
	let currentParent, root;
	function parseHtml(){
		while (html) {
			let textEnd = html.indexOf('<');
			if(textEnd === 0){
				const endTagMatch = html.match(endTag)
				if (endTagMatch){
					advance(endTagMatch[0].length);
					parseEndTag(endTagMatch[1]);
					continue
				}
				if(html.match(startTagOpen)){
					const startTagMatch = parseStartTag();
					const element = {
						type: 1,
						tag: startTagMatch.tagName,
						lowerCasedTag: startTagMatch.tagName.toLowerCase(),
						attrsList: startTagMatch.attrs,
						attrsMap: makeAttrsMap(startTagMatch.attrs),
						parent: currentParent,
						children: []
					}

					if (!root) {
						root = element
					}

					if (currentParent) {
						currentParent.children.push(element);
					}

					stack.push(element);
					currentParent = element;
					continue
				}
			}else{
				continue
			}
		}
	}

	// parseHtml()
	console.log(stack)

}

export { vueStudyCtrl }