$scope.cityList = [{
	"name": "★热门城市",
	"cities": [{
		"name": "北京市",
		"tags": "BEIJING,北京市",
		"cityid": 1
	},
	{
		"name": "上海市",
		"tags": "SHANGHAI,上海市",
		"cityid": 2
	}
	]
},
{
	"name": "A",
	"cities": [{
		"name": "鞍山市",
		"tags": "ANSHAN,鞍山市",
		"cityid": 3
	},
	{
		"name": "安庆市",
		"tags": "ANQING,安庆市",
		"cityid": 4
	}
	]
},
{
	"name": "B",
	"cities": [{
		"name": "北京市",
		"tags": "BEIJING,北京市",
		"cityid": 1
	},
	{
		"name": "巴音郭楞州",
		"tags": "BAYINGUOLENGZHOU,巴音郭楞州",
		"cityid": 5
	},
	{
		"name": "博尔塔拉州",
		"tags": "BOERTALAZHOU,博尔塔拉州",
		"cityid": 6
	}
	]
},
{
	"name": "C",
	"cities": [{
		"name": "成都市",
		"tags": "CHENGDU,成都市",
		"cityid": 7
	}]
},
{
	"name": "E",
	"cities": [{
		"name": "鄂尔多斯市",
		"tags": "EERDUOSI,鄂尔多斯市",
		"cityid": 8
	},
	{
		"name": "鄂州市",
		"tags": "EZHOU,鄂州市",
		"cityid": 9
	},
	{
		"name": "恩施州",
		"tags": "ENSHIZHOU,恩施州",
		"cityid": 10
	}
	]
},
{
	"name": "F",
	"cities": [{
		"name": "福州市",
		"tags": "FUZHOU,福州市",
		"cityid": 11
	},
	{
		"name": "佛山市",
		"tags": "FOSHAN,佛山市",
		"cityid": 12
	},
	{
		"name": "防城港市",
		"tags": "FANGCHENGGANG,防城港市",
		"cityid": 13
	}
	]
},
{
	"name": "G",
	"cities": [{
		"name": "广州市",
		"tags": "GUANGZHOU,广州市",
		"cityid": 14
	},
	{
		"name": "贵阳市",
		"tags": "GUIYANG,贵阳市",
		"cityid": 15
	}
	]
},
{
	"name": "H",
	"cities": [{
		"name": "杭州市",
		"tags": "HANGZHOU,杭州市",
		"cityid": 16
	},
	{
		"name": "和田地区",
		"tags": "HETIANDIQU,和田地区",
		"cityid": 17
	}
	]
},
{
	"name": "Z",
	"cities": [{
		"name": "郑州市",
		"tags": "ZHENGZHOU,郑州市",
		"cityid": 18
	},
	{
		"name": "张家口市",
		"tags": "ZHANGJIAKOU,张家口市",
		"cityid": 19
	},
	{
		"name": "张家界市",
		"tags": "ZHANGJIAJIE,张家界市",
		"cityid": 20
	},
	{
		"name": "珠海市",
		"tags": "ZHUHAI,珠海市",
		"cityid": 21
	},
	{
		"name": "中山市",
		"tags": "ZHONGSHAN,中山市",
		"cityid": 22
	},
	{
		"name": "自贡市",
		"tags": "ZIGONG,自贡市",
		"cityid": 23
	},
	{
		"name": "资阳市",
		"tags": "ZIYANG,资阳市",
		"cityid": 24
	},
	{
		"name": "枣庄市",
		"tags": "ZHAOZHUANG,枣庄市",
		"cityid": 25
	},
	{
		"name": "舟山",
		"tags": "ZHOUSHAN,舟山",
		"cityid": 26
	},
	{
		"name": "遵义市",
		"tags": "ZUNYI,遵义市",
		"cityid": 27
	},
	{
		"name": "淄博市",
		"tags": "ZIBO,淄博市",
		"cityid": 28
	},
	{
		"name": "株洲市",
		"tags": "ZHUZHOU,株洲市",
		"cityid": 29
	},
	{
		"name": "中卫市",
		"tags": "ZHONGWEI,中卫市",
		"cityid": 30
	}
	]
}
]
$scope.shortcutList = vx.copy($scope.cityList).filter(function (value) {
	if (value.name == '★热门城市') {
		value.name = '★';
	}
	return value;
})



/*城市test*/
$scope.TITLE_HEIGHT = 60
$scope.SUBTITLE_HEIGHT = 40
$scope.touch = {}
$scope.BSInit = function () {
	var cliH = document.documentElement.clientHeight;
	$('#scroll-wrap').css('height', (cliH - 45 - 60) / 20 + 'rem');
}
$scope.loadBScroll = function () {
	$scope._calculateHeight();
	$scope.scroll = new IScroll('#scroll-wrap', {
		probeType: 3,
		scrollY: true
	})
	$scope.onShortcutTouch();
	$scope.scroll.on('scroll', function () {
		$scope.scrollY = this.y;
		$scope.$apply();
	});
}
$scope.$watch('scrollY', function (newY) {
	const listHeight = $scope.listHeight
	if (!listHeight) {
		return
	}
	// 当滚动到顶部，newY>0
	if (newY >= 0) {
		$scope.currentIndex = 0
		return
	}
	// 在中间部分滚动
	for (var i = 0; i < listHeight.length - 1; i++) {
		var height1 = listHeight[i]
		var height2 = listHeight[i + 1]
		if (-newY >= height1 && -newY < height2) {
			$scope.currentIndex = i
			$scope.diff = height2 + newY
			return
		}
	}
	// 当滚动到底部，且-this.y大于最后一个元素的上限
	$scope.currentIndex = listHeight.length - 2
})
$scope.$watch('diff', function (newDiff) {
	var fixedTop = (newDiff > 0 && newDiff < $scope.SUBTITLE_HEIGHT) ? newDiff - $scope.SUBTITLE_HEIGHT : 0
	if ($scope.fixedTop === fixedTop) {
		return
	}
	$scope.fixedTop = fixedTop
	$('.index-list-fixed').css('transform', 'translate3d(0,' + fixedTop + 'px,0)')
})
$scope._calculateHeight = function () {
	var list = $('.listGroup');
	if (!list) {
		return
	}
	$scope.listHeight = []
	var height = 0;
	$scope.listHeight.push(height)
	for (var i = 0; i < list.length; i++) {
		var item = list[i]
		height += item.clientHeight
		$scope.listHeight.push(height)
	}
}
// fixedTitle
$scope.fixedTitle = function () {
	if ($scope.scrollY > 0) {
		return ''
	}
	return $scope.cityList[$scope.currentIndex] ? $scope.cityList[$scope.currentIndex].name : ''
}
$scope.onShortcutTouch = function () {
	const ANCHOR_HEIGHT = window.innerHeight <= 480 ? 17 : 18
	var cityNav = $('.city-nav')[0];
	cityNav.addEventListener('touchstart', function (e) {
		var anchorIndex = getData(e.target, 'index')
		var firstTouch = e.touches[0]
		$scope.touch.y1 = firstTouch.pageY
		$scope.touch.anchorIndex = anchorIndex
		$scope._scrollTo(anchorIndex)
	})
	cityNav.addEventListener('touchmove', function (e) {
		var firstTouch = e.touches[0]
		$scope.touch.y2 = firstTouch.pageY
		var delta = ($scope.touch.y2 - $scope.touch.y1) / ANCHOR_HEIGHT | 0
		var anchorIndex = parseInt($scope.touch.anchorIndex) + delta
		$scope._scrollTo(anchorIndex)
	})
}

$scope._scrollTo = function (index) {
	if (!index && index !== 0) {
		return
	}
	if (index < 0) {
		index = 0
	} else if (index > $scope.listHeight.length - 2) {
		index = $scope.listHeight.length - 2
	}
	$scope.scroll.scrollToElement($('.listGroup')[index], 0)
	$scope.currentIndex = Number(index);
	$scope.$apply();
}

function getData(el, name, val) {
	var prefix = 'data-'
	if (val) {
		return el.setAttribute(prefix + name, val)
	}
	return el.getAttribute(prefix + name)
}

