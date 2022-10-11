import React, {useState} from 'react'
import {connect} from "react-redux";
import Chart from 'react-apexcharts'
import ViewAllWrapper from "../../../../commons/view-all-wrapper";
import {Card} from "antd";
import Filter from "../filter";
import PropTypes from "prop-types";
import {handleGetChartData} from "../../../../actions/expenses/ExpensesAction";

function ExpensesChart ({ getChartData, data }) {
    const [loading, setLoading] = useState(false)
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
            labels: data.labels
        }, series: data.series
    }

    return (
        <ViewAllWrapper loading={false} noData={false}>
            <Card size={'small'}
                  loading={loading}
                  title={'EXPENSES'}
                  actions={[
                      <Filter key={'Filter'} callback={getChartData} setLoading={setLoading}/>
                  ]}>
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

ExpensesChart.propTypes = {
    getChartData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        data: state.expensesReducer.chart
    }
}

const mapDispatchDispatchToProps = (dispatch) => ({
    getChartData:(data) => dispatch(handleGetChartData(data))
})

export default connect(mapStateToProps, mapDispatchDispatchToProps)(ExpensesChart)
