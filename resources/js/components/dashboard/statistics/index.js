import React, {useEffect, useState} from 'react'
import {Col, Row} from 'antd'
import {connect} from 'react-redux'
import WidgetItem from '../../../commons/widget/widget-item'
import {handleGetDashboardData} from "../../../actions/dashboard/DashboardAction";
import PropTypes from "prop-types";

function Statistics({ statistics, handleGetDashboardData }) {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        handleGetDashboardData().then(() => setLoading(false))
    }, [])
    return (
        <Row gutter={[20, 20]} style={{ marginBottom: 15}}>
            <Col span={8} xs={24} sm={8} md={8} lg={8}>
                <WidgetItem title={'Total Classes'} value={statistics?.classes}/>
            </Col>
            <Col span={8} xs={24} sm={8} md={8} lg={8}>
                <WidgetItem title={'Total Members'} value={statistics?.members}/>
            </Col>
            <Col span={8} xs={24} sm={8} md={8} lg={8}>
                <WidgetItem title={'Active Members'} value={statistics?.status?.active}/>
            </Col>
            <Col span={8} xs={24} sm={8} md={8} lg={8}>
                <WidgetItem title={'Invalid Members'} value={statistics?.status?.invalid}/>
            </Col>
            <Col span={8} xs={24} sm={8} md={8} lg={8}>
                <WidgetItem title={'Deceased Members'} value={statistics?.status?.deceased}/>
            </Col>
        </Row>
    )
}

Statistics.propTypes = {
    statistics: PropTypes.object.isRequired,
    handleGetDashboardData: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    statistics: state.dashboardReducer.statistics
})

const mapDispatchToProps = (dispatch) => ({
    handleGetDashboardData: () => dispatch(handleGetDashboardData())
})

export default connect(mapStateToProps, mapDispatchToProps)(Statistics)
