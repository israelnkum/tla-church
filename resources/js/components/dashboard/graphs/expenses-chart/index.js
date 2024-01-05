import React from 'react'
import {connect, useSelector} from "react-redux";
import Chart from 'react-apexcharts'
import ViewAllWrapper from "../../../../commons/view-all-wrapper";
import {Card} from "antd";

function ExpensesChart () {
    const data = useSelector(state => state.dashboardReducer?.statistics)
    const chartData = {
        series: [{
            name: 'Total',
            data: data?.classGroups ? Object.values(data?.classGroups) : []
        }],
        options: {
            chart: {
                height: 350,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    borderRadius: 10,
                    dataLabels: {
                        position: 'top', // top, center, bottom
                    },
                }
            },
            dataLabels: {
                enabled: false,
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ["#304758"]
                }
            },

            xaxis: {
                categories: data?.classGroups ? Object.keys(data?.classGroups) : [],
                crosshairs: {
                    fill: {
                        type: 'gradient',
                        gradient: {
                            colorFrom: '#D8E3F0',
                            colorTo: '#BED1E6',
                            stops: [0, 100],
                            opacityFrom: 0.4,
                            opacityTo: 0.5,
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                }
            },
            yaxis: {
                labels: {
                    show: true
                }
            }
        },
    }

    return (
        <ViewAllWrapper loading={false} noData={false}>
            <Card size={'small'}
                  loading={false}
                  title={'Class Distribution'}>
                <div align={'center'}>
                    <Chart options={chartData.options} series={chartData.series} type="bar" width="430" />
                </div>
            </Card>
        </ViewAllWrapper>
    )
}

export default connect(null, null)(ExpensesChart)
