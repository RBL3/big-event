$(function () {
    //  #83a2ed #6ac6e2 #5fd9de #58d88e
    let color = ["#83a2ed", "#6ac6e2", "#5fd9de", "#58d88e"]
    console.log($(".status"));
    [...$(".status")].map((el, index) => el.style.color = color[index])

    void function () {
        var myChart = echarts.init(document.getElementById('chart1'));
        var warningData = [
            {
                name: '第1周'
                , value: 20
            },
            {
                name: '第2周'
                , value: 25
            },
            {
                name: '第3周'
                , value: 40
            },
            {
                name: '第4周'
                , value: 42
            },
            {
                name: '第5周'
                , value: 55
            },
            {
                name: '第6周'
                , value: 68
            },
            {
                name: '第7周'
                , value: 76
            },
            {
                name: '第8周'
                , value: 88
            }
        ];

        var dateName = [];// 名称
        var dataValue = []; //数值

        //for循环chartsJSON
        for (var i = 0; i < warningData.length; i++) {
            dateName.push(warningData[i].name);
            dataValue.push(warningData[i].value);
        };

        option = {
            title: {
                text: "月新增文章"
            },
            grid: {
                left: "2%",
                right: "2%",
                bottom: "5%",
                top: "25%",
                containLabel: true,
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
                type: 'category',
                data: dateName,

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
                splitLine: {
                    show: false,
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
            series: [{
                name: '销量预警',
                type: 'line',
                smooth: true,

                symbol: 'circle',
                symbolSize: 10,
                data: dataValue,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(205,52,42, 0.5)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(235,235,21, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    },
                },
                itemStyle: {
                    normal: {
                        color: '#f7b851'
                    }
                },

            }]
        };

        myChart.setOption(option);
    }()




















































})