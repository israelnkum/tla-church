import React, {useState} from 'react'
import {connect, useSelector} from "react-redux";
import Chart from 'react-apexcharts'

import ViewAllWrapper from "../../../../commons/view-all-wrapper";
import {Card} from "antd";
import PropTypes from "prop-types";

function CashUp () {
    const data = useSelector(state => state.dashboardReducer?.statistics)
    const chartData = {
        options: {
            dataLabels: {enabled: false},
            plotOptions: {
                pie: {
                    donut: {
                        size: '60%'
                    }
                }
            },
            legend: {
                show: true,
                position: 'bottom',
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
            labels: data?.status ? Object.keys(data?.status) : []
        }, series: data?.status ? Object.values(data?.status) : []
    }

    return (
        <ViewAllWrapper loading={false} noData={false}>
            <Card size={'small'}
                  loading={false}
                  title={'Member Status'}>
                <div align={'center'}>
                    <Chart
                        options={chartData.options}
                        series={chartData.series}
                        type="donut" width="380" />
                </div>
            </Card>
        </ViewAllWrapper>
    )
}



export default connect(null, null)(CashUp)
