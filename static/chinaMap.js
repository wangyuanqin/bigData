var myChart = echarts.init(document.getElementById('china-map'));
//var oBack = document.getElementById("back");

var provinces = ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen'];

var provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门'];
var geoCoordMap = {
	"四川": [97.21, 108.12],
	"海门": [121.15, 31.89],
	"鄂尔多斯": [109.781327, 39.608266],
	"招远": [120.38, 37.35],
	"舟山": [122.207216, 29.985295],
	"齐齐哈尔": [123.97, 47.33],
	"盐城": [120.13, 33.38],
	"赤峰": [118.87, 42.28],
	"乳山": [121.52, 36.89],
	"金昌": [102.188043, 38.520089],
	"泉州": [118.58, 24.93],
	"莱西": [120.53, 36.86],
	"日照": [119.46, 35.42],
	"胶南": [119.97, 35.88],
	"南通": [121.05, 32.08],
	"拉萨": [91.11, 29.97],
	"云浮": [112.02, 22.93],
	"梅州": [116.1, 24.55],
	"文登": [122.05, 37.2],
	"上海": [121.48, 31.22],
	"攀枝花": [101.718637, 26.582347],
	"威海": [122.1, 37.5],
	"承德": [117.93, 40.97],
	"厦门": [118.1, 24.46],
	"汕尾": [115.375279, 22.786211],
	"潮州": [116.63, 23.68],
	"丹东": [124.37, 40.13],
	"太仓": [121.1, 31.45],
	"曲靖": [103.79, 25.51],
	"烟台": [121.39, 37.52],
	"福州": [119.3, 26.08],
	"瓦房店": [121.979603, 39.627114],
	"即墨": [120.45, 36.38],
	"抚顺": [123.97, 41.97],
	"玉溪": [102.52, 24.35],
	"张家口": [114.87, 40.82],
	"阳泉": [113.57, 37.85],
	"莱州": [119.942327, 37.177017],
	"湖州": [120.1, 30.86],
	"汕头": [116.69, 23.39],
	"昆山": [120.95, 31.39],
	"宁波": [121.56, 29.86],
	"湛江": [110.359377, 21.270708],
	"揭阳": [116.35, 23.55],
	"荣成": [122.41, 37.16],
	"连云港": [119.16, 34.59],
	"葫芦岛": [120.836932, 40.711052],
	"常熟": [120.74, 31.64],
	"东莞": [113.75, 23.04],
	"河源": [114.68, 23.73],
	"淮安": [119.15, 33.5],
	"泰州": [119.9, 32.49],
	"南宁": [108.33, 22.84],
	"营口": [122.18, 40.65],
	"惠州": [114.4, 23.09],
	"江阴": [120.26, 31.91],
	"蓬莱": [120.75, 37.8],
	"韶关": [113.62, 24.84],
	"嘉峪关": [98.289152, 39.77313],
	"广州": [113.23, 23.16],
	"延安": [109.47, 36.6],
	"太原": [112.53, 37.87],
	"清远": [113.01, 23.7],
	"中山": [113.38, 22.52],
	"昆明": [102.73, 25.04],
	"寿光": [118.73, 36.86],
	"盘锦": [122.070714, 41.119997],
	"长治": [113.08, 36.18],
	"深圳": [114.07, 22.62],
	"珠海": [113.52, 22.3],
	"宿迁": [118.3, 33.96],
	"咸阳": [108.72, 34.36],
	"铜川": [109.11, 35.09],
	"平度": [119.97, 36.77],
	"佛山": [113.11, 23.05],
	"海口": [110.35, 20.02],
	"江门": [113.06, 22.61],
	"章丘": [117.53, 36.72],
	"肇庆": [112.44, 23.05],
	"大连": [121.62, 38.92],
	"临汾": [111.5, 36.08],
	"吴江": [120.63, 31.16],
	"石嘴山": [106.39, 39.04],
	"沈阳": [123.38, 41.8],
	"苏州": [120.62, 31.32],
	"茂名": [110.88, 21.68],
	"嘉兴": [120.76, 30.77],
	"长春": [125.35, 43.88],
	"胶州": [120.03336, 36.264622],
	"银川": [106.27, 38.47],
	"张家港": [120.555821, 31.875428],
	"三门峡": [111.19, 34.76],
	"锦州": [121.15, 41.13],
	"南昌": [115.89, 28.68],
	"柳州": [109.4, 24.33],
	"三亚": [109.511909, 18.252847],
	"自贡": [104.778442, 29.33903],
	"吉林": [126.57, 43.87],
	"阳江": [111.95, 21.85],
	"泸州": [105.39, 28.91],
	"西宁": [101.74, 36.56],
	"宜宾": [104.56, 29.77],
	"呼和浩特": [111.65, 40.82],
	"成都": [104.06, 30.67],
	"大同": [113.3, 40.12],
	"镇江": [119.44, 32.2],
	"桂林": [110.28, 25.29],
	"张家界": [110.479191, 29.117096],
	"宜兴": [119.82, 31.36],
	"北海": [109.12, 21.49],
	"西安": [108.95, 34.27],
	"金坛": [119.56, 31.74],
	"东营": [118.49, 37.46],
	"牡丹江": [129.58, 44.6],
	"遵义": [106.9, 27.7],
	"绍兴": [120.58, 30.01],
	"扬州": [119.42, 32.39],
	"常州": [119.95, 31.79],
	"潍坊": [119.1, 36.62],
	"重庆": [108.04, 30.30],
	"涪陵区": [107.39, 29.707],
	"沙坪坝区": [106.46, 29.54],
	"忠县": [108.04, 30.30],
	"云阳县": [108.70, 30.93],
	"青岛": [120.33, 36.07],
	"台州": [121.420757, 28.656386],
	"南京": [118.78, 32.04],
	"滨州": [118.03, 37.36],
	"贵阳": [106.71, 26.57],
	"无锡": [120.29, 31.59],
	"本溪": [123.73, 41.3],
	"克拉玛依": [84.77, 45.59],
	"渭南": [109.5, 34.52],
	"马鞍山": [118.48, 31.56],
	"宝鸡": [107.15, 34.38],
	"焦作": [113.21, 35.24],
	"句容": [119.16, 31.95],
	"北京": [116.46, 39.92],
	"徐州": [117.2, 34.26],
	"衡水": [115.72, 37.72],
	"包头": [110, 40.58],
	"绵阳": [104.73, 31.48],
	"乌鲁木齐": [87.68, 43.77],
	"枣庄": [117.57, 34.86],
	"杭州": [120.19, 30.26],
	"淄博": [118.05, 36.78],
	"鞍山": [122.85, 41.12],
	"溧阳": [119.48, 31.43],
	"库尔勒": [86.06, 41.68],
	"安阳": [114.35, 36.1],
	"开封": [114.35, 34.79],
	"济南": [117, 36.65],
	"德阳": [104.37, 31.13],
	"温州": [120.65, 28.01],
	"九江": [115.97, 29.71],
	"邯郸": [114.47, 36.6],
	"临安": [119.72, 30.23],
	"兰州": [103.73, 36.03],
	"沧州": [116.83, 38.33],
	"临沂": [118.35, 35.05],
	"南充": [106.110698, 30.837793],
	"天津": [117.2, 39.13],
	"富阳": [119.95, 30.07],
	"泰安": [117.13, 36.18],
	"诸暨": [120.23, 29.71],
	"郑州": [113.65, 34.76],
	"哈尔滨": [126.63, 45.75],
	"聊城": [115.97, 36.45],
	"芜湖": [118.38, 31.33],
	"唐山": [118.02, 39.63],
	"平顶山": [113.29, 33.75],
	"邢台": [114.48, 37.05],
	"德州": [116.29, 37.45],
	"济宁": [116.59, 35.38],
	"荆州": [112.239741, 30.335165],
	"宜昌": [111.3, 30.7],
	"义乌": [120.06, 29.32],
	"丽水": [119.92, 28.45],
	"洛阳": [112.44, 34.7],
	"秦皇岛": [119.57, 39.95],
	"株洲": [113.16, 27.83],
	"石家庄": [114.48, 38.03],
	"莱芜": [117.67, 36.19],
	"常德": [111.69, 29.05],
	"保定": [115.48, 38.85],
	"湘潭": [112.91, 27.87],
	"金华": [119.64, 29.12],
	"岳阳": [113.09, 29.37],
	"长沙": [113, 28.21],
	"衢州": [118.88, 28.97],
	"廊坊": [116.7, 39.53],
	"菏泽": [115.480656, 35.23375],
	"合肥": [117.27, 31.86],
	"武汉": [114.31, 30.52],
	"大庆": [125.03, 46.58],
	"甘肃": [103.82, 36.06],
	"青海": [98.78, 36.62],
};
var convertData = function(data) {
	var res = [];
	if(data) {
		for(var i = 0; i < data.length; i++) {
			var geoCoord = geoCoordMap[data[i].name];
			if(geoCoord) {
				res.push({
					name: data[i].name,
					value: geoCoord.concat(data[i].userNum, data[i].company),
					userNum: data[i].userNum,
					smallNum: data[i].smallNum,
					shinei: data[i].shinei,
					shiwai: data[i].shiwai,
					selected: data[i].selected,
					company: data[i].company,
				});
			}
		}
	}
	return res;
};
var seriesData = [{
		name: '北京',
		selected: false,
		value: 1,
		userNum: 110,
		smallNum: 20,
		shinei: 12,
		shiwai: 70,
		company:'北京公司'
	},
	{
		name: '天津',
		selected: false,
		value: 2,
		userNum: 110,
		smallNum: 20,
		shinei: 20,
		shiwai: 90
	},
	{
		name: '上海',
		selected: false,
		value: 3,
		userNum: 110,
		smallNum: 20,
		shinei: 58,
		shiwai: 70
	},
	{
		name: '重庆',
		selected: false,
		value: 4,
		userNum: 110,
		smallNum: 12,
		shinei: 20,
		shiwai: 12,
		company: '总部',
		area: [{
				name: '忠县',
				selected: false,
				userNum: 110,
				smallNum: 12,
				shinei: 20,
				shiwai: 12,
				company: '总部'

			},
			{
				name: '涪陵区',
				selected: false,
				userNum: 110,
				smallNum: 99,
				shinei: 44,
				shiwai: 70,
				company: '涪陵公司'
			}, {
				name: '云阳县',
				selected: false,
				userNum: 110,
				smallNum: 99,
				shinei: 44,
				shiwai: 70,
				company: '云阳公司'
			}, {
				name: '沙坪坝区',
				selected: false,
				userNum: 110,
				smallNum: 99,
				shinei: 44,
				shiwai: 70,
				company: '沙坪坝公司'
			}
		]

	}, {
		name: '河北',
		selected: false,
		value: 5,
		userNum: 110,
		smallNum: 99,
		shinei: 44,
		shiwai: 70
	},
	{
		name: '河南',
		selected: false,
		value: 6,
		userNum: 110,
		smallNum: 1000,
		shinei: 20,
		shiwai: 42
	},
	{
		name: '云南',
		selected: false,
		value: 7,
		userNum: 110,
		smallNum: 21,
		shinei: 12,
		shiwai: 99
	},
	{
		name: '辽宁',
		selected: false,
		value: 8,
		userNum: 110,
		smallNum: 20,
		shinei: 20,
		shiwai: 70
	},
	{
		name: '黑龙江',
		selected: false,
		value: 9,
		userNum: 110,
		smallNum: 12,
		shinei: 20,
		shiwai: 99
	},
	{
		name: '湖南',
		selected: false,
		value: 10,
		userNum: 110,
		smallNum: 20,
		shinei: 20,
		shiwai: 70
	},
	{
		name: '安徽',
		selected: false,
		value: 11,
		userNum: 110,
		smallNum: 20,
		shinei: 20,
		shiwai: 70
	},
	{
		name: '山东',
		selected: false,
		value: 12,
		userNum: 110,
		smallNum: 20,
		shinei: 20,
		shiwai: 70
	},
	{
		name: '新疆',
		selected: false,
		value: 13
	},
	{
		name: '江苏',
		selected: false,
		value: 14
	},
	{
		name: '浙江',
		selected: false,
		value: 15
	},
	{
		name: '江西',
		selected: false,
		value: 16
	},
	{
		name: '湖北',
		selected: false,
		value: 17
	},
	{
		name: '广西',
		selected: false,
		value: 18
	},
	{
		name: '甘肃',
		selected: false,
		value: 19
	},
	{
		name: '山西',
		selected: false,
		value: 20
	},
	{
		name: '内蒙古',
		selected: false,
		value: 21,
		userNum: 110,
		smallNum: 20,
		shinei: 20,
		shiwai: 70
	},
	{
		name: '陕西',
		selected: false,
		value: 22
	},
	{
		name: '吉林',
		selected: false,
		value: 23,
		userNum: 110,
		smallNum: 20,
		shinei: 20,
		shiwai: 70,
		company: '吉林公司',

	},
	{
		name: '福建',
		selected: false,
		value: 24
	},
	{
		name: '贵州',
		selected: false,
		value: 25
	},
	{
		name: '广东',
		selected: false,
		value: 26
	},
	{
		name: '青海',
		selected: false,
		value: 27,
		userNum: 110,
		smallNum: 20,
		shinei: 20,
		shiwai: 70,
		company: '青海公司',

	},
	{
		name: '西藏',
		selected: false,
		value: 28
	},
	{
		name: '四川',
		selected: false,
		value: 29,
		userNum: 110,
		smallNum: 20,
		shinei: 20,
		shiwai: 70
	},
	{
		name: '宁夏',
		selected: false,
		value: 30
	},
	{
		name: '海南',
		selected: false,
		value: 31
	},
	{
		name: '台湾',
		selected: false,
		value: 32
	},
	{
		name: '香港',
		selected: false,
		value: 33
	},
	{
		name: '澳门',
		selected: false,
		value: 34
	}
];

//oBack.onclick = function() {
//	initEcharts("china", "中国");
//};

initEcharts("china", "中国");

// 初始化echarts
function initEcharts(pName, Chinese_) {
	var tmpSeriesData = pName === "china" ? seriesData : [];
	var cityData;
	var borderColor = '#d6d7d8';
	if(pName === "china") {
		borderColor = '#d6d7d8';
		cityData = convertData(seriesData); //中国地图
	} else {
		borderColor = '#346095';
		for(var i = 0; i < seriesData.length; i++) {
			if(seriesData[i].name == pName && seriesData[i].area) {
				cityData = convertData(seriesData[i].area); //有子公司
			} else  if(seriesData[i].name == pName) {
				var aa=[];
				aa.push(seriesData[i]);
				cityData = convertData(aa); //无子公司
			}
		}

	}
	console.log(cityData)
	var cityOther = []; //除了总部以外的其他城市
	var cityTotal = []; //总部
	//总部
	if(cityData) {
		for(var i = 0; i < cityData.length; i++) {
			if(cityData[i].company == '总部') {
				cityTotal.push(cityData[i]); //总部
			} else {
				cityOther.push(cityData[i]); //除了总部以外的其他城市
			}
		}
	}
	var option = {
		title: {
			text: Chinese_ || pName,
			subtext: 'CHINA',
			left: '50',
			textStyle: {
				color: '#7b84a5',
				fontSize: 35,
			},
			subtextStyle: {
				color: '#7b84a5',
				fontSize: 35,
			}
		},
		lenged: {
			show: true
		},
		tooltip: {
			trigger: 'item',
			backgroundColor: 'rgba(0,0,0,0.3)',
			padding: 10,
			textStyle: {
				fontSize: 10,
			},
			//			formatter: '{b}<br/>{c} (p / km2)'
			formatter: function(params) {
				console.log(params);
				var aa = '<div class="image-border image-border1"></div><div class="image-border image-border4"></div>';
				var showParams = params.data;
				if(showParams) {
					if(showParams.name)
						aa += showParams.name + '<br>'
					if(showParams.userNum)
						aa += '客户数量：' + showParams.userNum + '<br>'
					if(showParams.smallNum)
						aa += '小设备数量：' + showParams.smallNum + '<br>'
					if(showParams.shinei) {
						var shineicolor = '';
						if(showParams.shinei < 20) {
							shineicolor = "#5dbc50";
						} else if(showParams.shinei < 80) {
							shineicolor = "#98b54d";
						} else {
							shineicolor = "#91080a";
						}
						var shineiwidth = (showParams.shinei / 100) * 30;
						aa += 'PM 2.5：' + '<span class="jindu" style="width:' + shineiwidth + 'px;background:' + shineicolor + ';"></span>' + showParams.shinei + ' 室内<br/>'
					}
					if(showParams.shiwai) {
						var shiwaicolor = '';
						if(showParams.shiwai < 20) {
							shiwaicolor = "#5dbc50";
							$(".sanjiao_down").css("border-top-color", "#68d32a");
						} else if(showParams.shiwai < 80) {
							shiwaicolor = "#98b54d";
							$(".sanjiao_down").css("border-top-color", "#dd7920 ");
						} else {
							shiwaicolor = "#91080a";
							$(".sanjiao_down").css("border-top-color", "#7f0505 ");
						}
						var shiwaiwidth = (showParams.shiwai / 100) * 30;
						aa += '<span class="jindu" style="margin-left:52px; width:' + shiwaiwidth + 'px;background:' + shiwaicolor + ';"></span>' + showParams.shiwai + ' 室外<br/>'
					}
					console.log(showParams.shiwai)
					$(".sanjiao").css("margin-left", "calc(" + showParams.shiwai + "% - 25px)"); //设置p元素的样式颜色为红色
					return aa;
				}
			}
		},
		geo: {
			map: pName,
			label: {
				normal: {
					show: false, //显示省份标签
				},
				emphasis: { //对应的鼠标悬浮效果
					show: true,
					textStyle: {
						color: "#fff"
					}
				}
			},
			itemStyle: {
				normal: {
					borderColor: borderColor,
					borderWidth: 1,
					areaColor: '#346095',
					//					shadowBlur: shadowBlur,
					shadowColor: '#d8e0fe',

				},
				emphasis: { //对应的鼠标悬浮效果
					show: true,
					//					areaColor: 'red',
					//					color: "#FFFFFF",
					borderColor: '#d6d7d8',
					areaColor: "#5dbb50",

				},
			},

			regions: areaColor,

		},
		series: [{
				//非总公司的symbol

				//			type: 'effectScatter',
				type: 'scatter',
				coordinateSystem: 'geo',
				showAllSymbol: true,
				symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhBQkE0MDcyQTUzMDExRTlBMDczODcwRDVEREYxNEEzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhBQkE0MDczQTUzMDExRTlBMDczODcwRDVEREYxNEEzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEFCQTQwNzBBNTMwMTFFOUEwNzM4NzBENURERjE0QTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEFCQTQwNzFBNTMwMTFFOUEwNzM4NzBENURERjE0QTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5jJcA5AAACQ0lEQVR42qyUz2sTQRTH3262m0bYqjVibRXqQUWLYO7FokQQ60FPgkfv/gle9CwI/g8FbxWsCAqiF08SQVJRwRZSQ6JpGxMwbn40fr/Ld8MaYj3owCeTnTfvO29m3htnrbJlI5oPJsFekAYe6IIQfAd0ag87eUPfLpgGWVADZdCSEOdmtMBpsAm+gJ3Y2UlExsnHwU+wcauwr2N/aA9y9TF0R8A4+KTFBmIOOAkaECnHC4FFkAcHwTfwHKyAvkS5iwnwgWOx2FFGBqE1CZ0FS+DUiMDegxvgrQSPKbKSp8M+AIoJoVcgSDlWCcbsacazcqtr082OXer1owVoPyfBDTAHqoyMoaYQVUlbe0cjBF5cnXVuT6ajM4zaVmjjy+v9uxA+r8XPcHuIjjvr8fYCXbfpjOYQUXVYiI3fHIf9q6K5IhP9J1zlUUuDF/kT+LYSC+WyNn9hxu7NBtG5RoKwP9b8vHr6p91EQpryyzIpq8TR7E/bNd+1hcN7bD4eS9iz6qM89BIJ2VGiWqtnU7Hj54bdh9Cb4rY9iscS9loiR7uuSiSjQeaRNdu2yMPm//WmlV5XbanRth/xJdCenC//kGJNlQgbz2IV138It3ZnO4zOc9D4zXHaOU/zTf4NpoavWiuqhHLg5SDPfHvCM+LWENFlCE0pgAVQUGnxZlc9Vf+mao0VUFBCPoTjiXpoN+u/V8BHcD2uAPnRv71bbbrKo7wqhA7PVJs7u9Xmf301ku/ZjCKpKbNHvWfZv71n//zS/hJgAHJ37pNnMf6nAAAAAElFTkSuQmCC',
				symbolSize: [20, 20],
				data: cityOther,

			},
			{
				//省级显示字段公司名称
				type: 'scatter',
				coordinateSystem: 'geo',
				showAllSymbol: true,
				symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhBQkE0MDcyQTUzMDExRTlBMDczODcwRDVEREYxNEEzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhBQkE0MDczQTUzMDExRTlBMDczODcwRDVEREYxNEEzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEFCQTQwNzBBNTMwMTFFOUEwNzM4NzBENURERjE0QTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEFCQTQwNzFBNTMwMTFFOUEwNzM4NzBENURERjE0QTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5jJcA5AAACQ0lEQVR42qyUz2sTQRTH3262m0bYqjVibRXqQUWLYO7FokQQ60FPgkfv/gle9CwI/g8FbxWsCAqiF08SQVJRwRZSQ6JpGxMwbn40fr/Ld8MaYj3owCeTnTfvO29m3htnrbJlI5oPJsFekAYe6IIQfAd0ag87eUPfLpgGWVADZdCSEOdmtMBpsAm+gJ3Y2UlExsnHwU+wcauwr2N/aA9y9TF0R8A4+KTFBmIOOAkaECnHC4FFkAcHwTfwHKyAvkS5iwnwgWOx2FFGBqE1CZ0FS+DUiMDegxvgrQSPKbKSp8M+AIoJoVcgSDlWCcbsacazcqtr082OXer1owVoPyfBDTAHqoyMoaYQVUlbe0cjBF5cnXVuT6ajM4zaVmjjy+v9uxA+r8XPcHuIjjvr8fYCXbfpjOYQUXVYiI3fHIf9q6K5IhP9J1zlUUuDF/kT+LYSC+WyNn9hxu7NBtG5RoKwP9b8vHr6p91EQpryyzIpq8TR7E/bNd+1hcN7bD4eS9iz6qM89BIJ2VGiWqtnU7Hj54bdh9Cb4rY9iscS9loiR7uuSiSjQeaRNdu2yMPm//WmlV5XbanRth/xJdCenC//kGJNlQgbz2IV138It3ZnO4zOc9D4zXHaOU/zTf4NpoavWiuqhHLg5SDPfHvCM+LWENFlCE0pgAVQUGnxZlc9Vf+mao0VUFBCPoTjiXpoN+u/V8BHcD2uAPnRv71bbbrKo7wqhA7PVJs7u9Xmf301ku/ZjCKpKbNHvWfZv71n//zS/hJgAHJ37pNnMf6nAAAAAElFTkSuQmCC',
				symbolSize: [20, 20],
				data: pName != 'china' ? cityData : '',
				itemStyle: {
					normal: {
						label: {
							show: true,
							fontSize: 11,
							offset: [0, 18],
							formatter: '{@[3]}', //显示第三个字段公司名称
							color: '#fff'
						},
					},
				}
			},
			{
				//中国地图总公司的symbol（不要蓝色圈圈）
				type: 'scatter',
				coordinateSystem: 'geo',
				showAllSymbol: true,
				symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhBQkE0MDcyQTUzMDExRTlBMDczODcwRDVEREYxNEEzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhBQkE0MDczQTUzMDExRTlBMDczODcwRDVEREYxNEEzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEFCQTQwNzBBNTMwMTFFOUEwNzM4NzBENURERjE0QTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEFCQTQwNzFBNTMwMTFFOUEwNzM4NzBENURERjE0QTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5jJcA5AAACQ0lEQVR42qyUz2sTQRTH3262m0bYqjVibRXqQUWLYO7FokQQ60FPgkfv/gle9CwI/g8FbxWsCAqiF08SQVJRwRZSQ6JpGxMwbn40fr/Ld8MaYj3owCeTnTfvO29m3htnrbJlI5oPJsFekAYe6IIQfAd0ag87eUPfLpgGWVADZdCSEOdmtMBpsAm+gJ3Y2UlExsnHwU+wcauwr2N/aA9y9TF0R8A4+KTFBmIOOAkaECnHC4FFkAcHwTfwHKyAvkS5iwnwgWOx2FFGBqE1CZ0FS+DUiMDegxvgrQSPKbKSp8M+AIoJoVcgSDlWCcbsacazcqtr082OXer1owVoPyfBDTAHqoyMoaYQVUlbe0cjBF5cnXVuT6ajM4zaVmjjy+v9uxA+r8XPcHuIjjvr8fYCXbfpjOYQUXVYiI3fHIf9q6K5IhP9J1zlUUuDF/kT+LYSC+WyNn9hxu7NBtG5RoKwP9b8vHr6p91EQpryyzIpq8TR7E/bNd+1hcN7bD4eS9iz6qM89BIJ2VGiWqtnU7Hj54bdh9Cb4rY9iscS9loiR7uuSiSjQeaRNdu2yMPm//WmlV5XbanRth/xJdCenC//kGJNlQgbz2IV138It3ZnO4zOc9D4zXHaOU/zTf4NpoavWiuqhHLg5SDPfHvCM+LWENFlCE0pgAVQUGnxZlc9Vf+mao0VUFBCPoTjiXpoN+u/V8BHcD2uAPnRv71bbbrKo7wqhA7PVJs7u9Xmf301ku/ZjCKpKbNHvWfZv71n//zS/hJgAHJ37pNnMf6nAAAAAElFTkSuQmCC',
				symbolSize: [20, 20],
				data: pName != 'china' ? cityTotal : '', //全国的时候总部不要蓝色圈圈

			},
			{

				//总公司的圈圈上的文字
				type: 'scatter',
				coordinateSystem: 'geo',
				showAllSymbol: true,
				symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3Mzk2MjhFQTU0RDExRTlCQzYyRDFEQTVFRjNBMzUxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk3Mzk2MjhGQTU0RDExRTlCQzYyRDFEQTVFRjNBMzUxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTczOTYyOENBNTREMTFFOUJDNjJEMURBNUVGM0EzNTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTczOTYyOERBNTREMTFFOUJDNjJEMURBNUVGM0EzNTEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4g0Fi+AAAB+UlEQVR42qyVSyhEURjHv3sbJbKZQmHBZIPsbewsJJLtbKywILGwIe8ohazskA3lkbBAFLLBRnksFAsLMuOdkMfM8f/mnsmd686dO9P91687c849v853zpwzSuVakEySDipBOSgEGUCAV3AENsECeFotVyIGKgahCmpBGygg65yBETANaVAvCCcVjINJGzJOkXx3vGpdpBiF/BwFDRR/eMwYpEl6YR2op8RTJwmtYQ6eByAr3Fudi/pdCs1ciIjvKS6ilStB/g8ib/5fv8wNKOUZevWy0GK6IncuPVkbPHspqCxbiTZLdtSwsELfWpJJlJemwZ857z/a8+07ZukVKII8+hZPmkIDR1opXNa+T4RKLXYzCp08Ciuhh2fo1rfs+8W/z1xqKvaQxSePWt/WtanYzZsi7G4lS2OUHeAZ3tkV2lhDHwtvybncq/KgO5UdFs6BLwdkAbDEwkMw74BwEeyp8p7rl0cn0VyDLlxjgfDlcA6aEiz9EzRCdm68D5dARwLCdsiWzS5YzjDojUPWDdmo8co3pgcM2ZANgj5joxrlZS592kI2BTrNOlSL31QL2DXp2watIBiPkPMMmsGD/mjJtpdog9QY63Qs/7z0m3ZqNUC1sfgTwC8vkclYL7tsCH1gWa7ZnRNCzoY8ouSU8Mlp4YXdo/MrwADdFotitDteIgAAAABJRU5ErkJggg==',
				symbolSize: [20, 30],
				symbolOffset: [0, -15],
				data: cityTotal,
				itemStyle: {
					normal: {
						label: {
							show: true,
							fontSize: 6,
							color: '#fff',
							borderColor: 'transparent'
						},
					},
				}
			}
		],

		visualMap: {
			x: '-1000 px', //图例横轴位置
			y: '-1000 px', //图例纵轴位置
			min: 0,
			max: 200,
			calculable: true,
			inRange: {
				color: ['#3784c4', '#3784c4', '#d94e5d']
			},
			textStyle: {
				color: '#fff'
			}
		},

	};

	myChart.setOption(option);

	myChart.off("click");

	if(pName === "china") { // 全国时，添加click 进入省级
		myChart.on('click', function(param) {
			console.log(param.name);
			// 遍历取到provincesText 中的下标  去拿到对应的省js
			for(var i = 0; i < provincesText.length; i++) {
				if(param.name === provincesText[i]) {
					//显示对应省份的方法
					showProvince(provinces[i], provincesText[i]);
					break;
				}
			}
			if(param.componentType === 'series') {
				var provinceName = param.name;
				$('#box').css('display', 'block');
				$("#box-title").html(provinceName);

			}
		});
	} else { // 省份，添加双击 回退到全国
		myChart.on("dblclick", function() {
			initEcharts("china", "中国");
		});
	}
}

// 展示对应的省
function showProvince(pName, Chinese_) {
	//这写省份的js都是通过在线构建工具生成的，保存在本地，需要时加载使用即可，最好不要一开始全部直接引入。
	loadBdScript('$' + pName + 'JS', './js/map/province/' + pName + '.js', function() {
		initEcharts(Chinese_);
	});
}

// 加载对应的JS
function loadBdScript(scriptId, url, callback) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	if(script.readyState) { //IE
		script.onreadystatechange = function() {
			if(script.readyState === "loaded" || script.readyState === "complete") {
				script.onreadystatechange = null;
				callback();
			}
		};
	} else { // Others
		script.onload = function() {
			callback();
		};
	}
	script.src = url;
	script.id = scriptId;
	document.getElementsByTagName("head")[0].appendChild(script);
};