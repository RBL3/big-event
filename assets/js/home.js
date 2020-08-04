$(function () {
    //  #83a2ed #6ac6e2 #5fd9de #58d88e
    let color = ["#83a2ed", "#6ac6e2", "#5fd9de", "#58d88e"];
    [...$(".status")].map((el, index) => el.style.color = color[index])

    // 第一个折线图区域
    void function () {
        var myChart = echarts.init(document.getElementById('chart1'));
        var warningData = [
            { 'count': 36, 'date': '2019-04-13' },
            { 'count': 52, 'date': '2019-04-14' },
            { 'count': 78, 'date': '2019-04-15' },
            { 'count': 85, 'date': '2019-04-16' },
            { 'count': 65, 'date': '2019-04-17' },
            { 'count': 72, 'date': '2019-04-18' },
            { 'count': 88, 'date': '2019-04-19' },
            { 'count': 64, 'date': '2019-04-20' },
            { 'count': 72, 'date': '2019-04-21' },
            { 'count': 90, 'date': '2019-04-22' },
            { 'count': 96, 'date': '2019-04-23' },
            { 'count': 100, 'date': '2019-04-24' },
            { 'count': 102, 'date': '2019-04-25' },
            { 'count': 110, 'date': '2019-04-26' },
            { 'count': 123, 'date': '2019-04-27' },
            { 'count': 100, 'date': '2019-04-28' },
            { 'count': 132, 'date': '2019-04-29' },
            { 'count': 146, 'date': '2019-04-30' },
            { 'count': 200, 'date': '2019-05-01' },
            { 'count': 180, 'date': '2019-05-02' },
            { 'count': 163, 'date': '2019-05-03' },
            { 'count': 110, 'date': '2019-05-04' },
            { 'count': 80, 'date': '2019-05-05' },
            { 'count': 82, 'date': '2019-05-06' },
            { 'count': 70, 'date': '2019-05-07' },
            { 'count': 65, 'date': '2019-05-08' },
            { 'count': 54, 'date': '2019-05-09' },
            { 'count': 40, 'date': '2019-05-10' },
            { 'count': 45, 'date': '2019-05-11' },
            { 'count': 38, 'date': '2019-05-12' },
        ];

        var dateName = [];// 名称
        var dataValue = []; //数值

        //for循环chartsJSON
        for (var i = 0; i < warningData.length; i++) {
            dateName.push(warningData[i].date);
            dataValue.push(warningData[i].count);
        };

        var option = {
            title: {
                text: "月新增文章数",
                top: 15,
                left: "center",
            },
            grid: {
                show: true,
                left: "2%",
                right: "4%",
                bottom: "5%",
                top: "25%",
                containLabel: true,
            },
            legend: {
                top: 40,
                data: ["文章数量"]
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#ddd'
                    }
                },
                backgroundColor: 'rgba(255,255,255,1)',
                padding: [5, 10],
                textStyle: {
                    color: '#7588E4',
                },
                extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
            },

            xAxis: {
                name: "日",
                type: 'category',
                interval: 10,
                data: dateName,
                boundaryGap: false,
                splitLine: {
                    show: false
                },

                axisLine: {
                    lineStyle: {
                        color: '#333'
                    }
                },
            },

            yAxis: {
                name: "月新增文章数量",
                splitLine: {
                    color: "red",
                },
                axisLine: {
                    lineStyle: {
                        color: "#333",
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: 10,
                        color: "#333",
                    }
                }
            },

            toolbox: {
                feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: {
                        type: ['line', 'bar']
                    },
                    restore: { show: true },
                    saveAsImage: {
                        name: "月新增文章数量"
                    },

                },
            },

            series: [{
                name: '文章数量',
                type: 'line',
                smooth: true,
                symbolSize: 10,
                data: dataValue,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(255,136,0,0.39)'
                        }, {
                            offset: 0.34,
                            color: 'rgba(255,180,0,0.25)'
                        }, {
                            offset: 1,
                            color: 'rgba(255,222,0,0.00)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    },
                },
                itemStyle: {
                    normal: {
                        color: '#f80'
                    }
                },
            }]
        };

        myChart.setOption(option);
    }()

    // 饼状图区域
    void function () {
        var myChart = echarts.init(document.getElementById('chart2'));
        var option = {
            title: {
                text: "分类文章数量比",
                top: 15,
                left: "center"
            },
            color: ['#5885e8', '#13cfd5', '#00ce68', '#ff9565'],
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                top: 80,
                data: ["奇趣事", "会生活", "爱旅行", "趣美味"]
            },
            toolbox: {
                left: "center",
                top: 40,
                feature: {
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: {
                        name: "月新增文章数量"
                    },
                },
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['45%', '60%'],
                    center: ['50%', '65%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 300, name: '奇趣事' },
                        { value: 100, name: '会生活' },
                        { value: 260, name: '爱旅行' },
                        { value: 180, name: '趣美味' }
                    ]
                }
            ]
        };
        myChart.setOption(option);
    }()

    // 柱状图区域
    void function () {
        let myChart = echarts.init(document.getElementById('bar'));
        // console.log(myChart);
        var option = {
            title: {
                text: '文章访问量',
                left: 'center',
                top: '10'
            },
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                top: 40,
                data: ["奇趣事", "会生活", "爱旅行", "趣美味"]
            },
            grid: {
                show: true,
                top: "20%",
                left: '2%',
                right: '2%',
                bottom: '8%',
                containLabel: true,

            },
            toolbox: {
                feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: {
                        type: ['line', 'bar']
                    },
                    restore: { show: true },
                    saveAsImage: {
                        name: "文章访问量"
                    },

                },
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            dataZoom: [//给x轴设置滚动条
                {
                    start: 0,//默认为0
                    end: 100 - 1000 / 31,//默认为100
                    type: 'slider',
                    show: true,
                    xAxisIndex: [0],
                    handleSize: 0,//滑动条的 左右2个滑动条的大小
                    height: 8,//组件高度
                    left: 80, //左边的距离
                    right: 50,//右边的距离
                    bottom: 20,//右边的距离
                    handleColor: '#ddd',//h滑动图标的颜色
                }],
            series: [
                {
                    name: '奇趣事',
                    type: 'bar',
                    barWidth: 20,
                    itemStyle: {
                        normal: { areaStyle: { type: 'default' }, color: '#fd956a' }
                    },
                    data: [800, 708, 920, 1090, 1200]
                },
                {
                    name: '会生活',
                    type: 'bar',
                    barWidth: 20,
                    itemStyle: {
                        normal: { areaStyle: { type: 'default' }, color: '#2bb6db' }
                    },
                    data: [400, 468, 520, 690, 800]
                },
                {
                    name: '爱旅行',
                    type: 'bar',
                    barWidth: 20,
                    itemStyle: {
                        normal: { areaStyle: { type: 'default' }, color: '#13cfd5' }
                    },
                    data: [500, 668, 520, 790, 900]
                },
                {
                    name: '趣美味',
                    type: 'bar',
                    barWidth: 20,
                    itemStyle: {
                        normal: { areaStyle: { type: 'default' }, color: '#00ce68' }
                    },
                    data: [600, 508, 720, 890, 1000]
                }
            ]
        };

        myChart.setOption(option);
    }()















































})