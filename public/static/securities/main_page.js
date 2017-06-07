$(function() {
    $('div select').searchableSelect();
}); //draw stockList


function splitData(rawData) {
    var categoryData = [];
    var values = [];
    var volumns = [];
    //console.log(rawData[1]);
    //console.log(999999);
    for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i]);
        volumns.push(rawData[i][4]);
    }
    return {
        categoryData: categoryData,
        values: values,
        volumns: volumns
    };
}

/*           0     1      2     3       4
dataCell=[[open close lowest highest volume]...]
*/
indicatorTicks = { //descript the data used in a dataCell
    'OBV': [1, 4],
    'MACD': [1],
    'KDJ': [3, 2, 1],
    'BOLL': [1],
    'RSI': [1]
}

function indicator1(ticks, opt, indicator) {
    var data = [];
    var tem = [];
    var cell = indicatorTicks[indicator];
    var len = cell.length;
    for (var i = 0; i < ticks.length; i++) {
        if (len > 1) {
            tem = []
            for (var j = 0; j < len; j++) {
                tem.push(ticks[i][indicatorTicks[indicator][j]]);
            }
            data.push(tem);
        } else {
            data.push(ticks[i][indicatorTicks[indicator][0]]);
        }
    }
    //console.log(data);
    result = outF[indicator](data);
    indic2 = [];
    optLen = opt.series.length;
    for (var i = 5; i < optLen; i++) {
        if (opt.series[i]['xAxisIndex'] == 3) {
            indic2.push(opt.series[i]);
        }
    }

    for (var i = 0; i < optLen - 6; i++) {
        opt.series.pop();
    }
    if (!result.length) {
        for (var key in result) {
            opt.series.push({
                name: indicator + '.' + key,
                type: 'line',
                xAxisIndex: 2,
                yAxisIndex: 2,
                data: result[key]
            });
        }
    } else {
        opt.series.push({
            name: indicator + '.' + key,
            type: 'line',
            xAxisIndex: 2,
            yAxisIndex: 2,
            data: result
        });
    }
    for (var i in indic2) {
        opt.series.push(indic2[i]);
    }
    //console.log(opt.series);  
}

function indicator2(ticks, opt, indicator) {
    var data = [];
    var tem = [];
    var cell = indicatorTicks[indicator];
    var len = cell.length;
    for (var i = 0; i < ticks.length; i++) {
        if (len > 1) {
            tem = []
            for (var j = 0; j < len; j++) {
                tem.push(ticks[i][indicatorTicks[indicator][j]]);
            }
            data.push(tem);
        } else {
            data.push(ticks[i][indicatorTicks[indicator][0]]);
        }
    }
    result = outF[indicator](data);
    indic1 = [];
    optLen = opt.series.length;
    for (var i = 5; i < optLen; i++) {
        if (opt.series[i]['xAxisIndex'] == 2) {
            indic1.push(opt.series[i]);
        }
    }

    for (var i = 0; i < optLen - 6; i++) {
        opt.series.pop();
    }
    for (var i in indic1) {
        opt.series.push(indic1[i]);
    }
    if (!result.length) {
        for (var key in result) {
            opt.series.push({
                name: indicator + '.' + key,
                type: 'line',
                xAxisIndex: 3,
                yAxisIndex: 3,
                data: result[key]
            });
        }
    } else {
        opt.series.push({
            name: indicator + '.' + key,
            type: 'line',
            xAxisIndex: 3,
            yAxisIndex: 3,
            data: result
        });
    }
}

function calculateMA(dayCount, data) {
    var result = [];
    for (var i = 0, len = data.values.length; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
            sum += data.values[i - j][1];
        }
        result.push(sum / dayCount);
    }
    return result;
}

var myChart = echarts.init(document.getElementById('mainplot'));

function refreshKLine(security, period) {
    period = period||'day';  
    var requestUrl='/postdata/?code=' + security.slice(0,6) + '&period='+period; 
    $.get(requestUrl, function(rawData) {
        var data = splitData(rawData);

        option = {
            title: {
                text: security.slice(6),
                left: 0
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                }
            },
            legend: {
                data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
            },
            grid: [{
                left: '10%',
                right: '8%',
                top: '5%',
                height: '50%'
            }, {
                left: '10%',
                right: '8%',
                top: '55%',
                height: '10%'
            }, {
                left: '10%',
                right: '8%',
                top: '63%',
                height: '12%'
            }, {
                left: '10%',
                right: '8%',
                top: '75%',
                height: '12%'
            }],
            xAxis: [{
                type: 'category',
                data: data.categoryData,
                scale: true,
                boundaryGap: false,
                axisLine: {
                    onZero: false
                },
                splitLine: {
                    show: false
                },
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax'
            }, {
                type: 'category',
                gridIndex: 1,
                data: data.categoryData,
                scale: true,
                boundaryGap: false,
                axisLine: {
                    onZero: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax'
            }, {
                type: 'category',
                gridIndex: 2,
                data: data.categoryData,
                scale: true,
                boundaryGap: false,
                axisLine: {
                    onZero: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax'
            }, {
                type: 'category',
                gridIndex: 3,
                data: data.categoryData,
                scale: true,
                boundaryGap: false,
                axisLine: {
                    onZero: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax'
            }],
            yAxis: [{
                scale: true,
                splitArea: {
                    show: true
                }
            }, {
                scale: true,
                gridIndex: 1,
                splitNumber: 2,
                axisLabel: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }, {
                scale: true,
                gridIndex: 2,
                splitNumber: 2,
                axisLabel: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }, {
                scale: true,
                gridIndex: 3,
                splitNumber: 2,
                axisLabel: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }],
            dataZoom: [{
                type: 'inside',
                xAxisIndex: [0, 1, 2, 3],
                start: 96,
                end: 100
            }, {
                show: true,
                xAxisIndex: [0, 1, 2, 3],
                type: 'slider',
                y: '90%',
                start: 96,
                end: 100
            }],
            series: [{
                name: '日K',
                type: 'candlestick',
                data: data.values,
                markPoint: {
                    label: {
                        normal: {
                            formatter: function(param) {
                                return param != null ? Math.round(param.value) : '';
                            }
                        }
                    },
                    data: [{
                        name: 'XX标点',
                        coord: ['2013/5/31', 2300],
                        value: 2300,
                        itemStyle: {
                            normal: {
                                color: 'rgb(41,60,85)'
                            }
                        }
                    }, {
                        name: 'highest value',
                        type: 'max',
                        valueDim: 'highest'
                    }, {
                        name: 'lowest value',
                        type: 'min',
                        valueDim: 'lowest'
                    }, {
                        name: 'average value on close',
                        type: 'average',
                        valueDim: 'close'
                    }],
                    tooltip: {
                        formatter: function(param) {
                            return param.name + '<br>' + (param.data.coord || '');
                        }
                    }
                },
                markLine: {
                    symbol: ['none', 'none'],
                    data: [
                        [{
                            name: 'from lowest to highest',
                            type: 'min',
                            valueDim: 'lowest',
                            symbol: 'circle',
                            symbolSize: 10,
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            }
                        }, {
                            type: 'max',
                            valueDim: 'highest',
                            symbol: 'circle',
                            symbolSize: 10,
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            }
                        }], {
                            name: 'min line on close',
                            type: 'min',
                            valueDim: 'close'
                        }, {
                            name: 'max line on close',
                            type: 'max',
                            valueDim: 'close'
                        }
                    ]
                }
            }, {
                name: 'MA5',
                type: 'line',
                data: calculateMA(5, data),
                smooth: true,
                lineStyle: {
                    normal: {
                        opacity: 0.5
                    }
                }
            }, {
                name: 'MA10',
                type: 'line',
                data: calculateMA(10, data),
                smooth: true,
                lineStyle: {
                    normal: {
                        opacity: 0.5
                    }
                }
            }, {
                name: 'MA20',
                type: 'line',
                data: calculateMA(20, data),
                smooth: true,
                lineStyle: {
                    normal: {
                        opacity: 0.5
                    }
                }
            }, {
                name: 'MA30',
                type: 'line',
                data: calculateMA(30, data),
                smooth: true,
                lineStyle: {
                    normal: {
                        opacity: 0.5
                    }
                }
            }, {
                name: 'Volumn',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: data.volumns
            }, {
                name: 'umn',
                type: 'bar',
                xAxisIndex: 3,
                yAxisIndex: 3,
                data: data.volumns
            }]
        };
        indicator1(data.values, option, 'RSI');
        indicator2(data.values, option, 'MACD');
        //console.log(option);    
        myChart.setOption(option);
    });
}