import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import ViewAllWrapper from "../../commons/view-all-wrapper";
import Statistics from "./statistics";
import {Col, Row} from "antd";
import {handleGetCommonClasses} from "../../actions/commons/CommonAction";
import CashUp from "./graphs/cash-up";
import ExpensesChart from "./graphs/expenses-chart";

function Dashboard(props) {
    const {getMemberClasses} = props
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getMemberClasses().then(() => setLoading(false))
    }, []);

    return (
        <ViewAllWrapper loading={loading} noData={false}>
            <div style={{padding: 10}}>
                <Statistics/>
            </div>
            <Row gutter={[10, 10]}>
                <Col span={12} xs={24} sm={24} md={12} lg={12}>
                    <CashUp/>
                </Col>
                <Col span={12} xs={24} sm={24} md={12} lg={12}>
                    <ExpensesChart/>
                </Col>
            </Row>
        </ViewAllWrapper>
    )
}

Dashboard.propTypes = {
    activeRoles: PropTypes.array.isRequired,
    getMemberClasses: PropTypes.func.isRequired,
    authUser: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        activeRoles: state.userReducer.activeRoles,
        authUser: state.userReducer.loggedInUser
    }
}

const mapDispatchDispatchToProps = (dispatch) => ({
    getMemberClasses: () => dispatch(handleGetCommonClasses()),
})

export default connect(mapStateToProps, mapDispatchDispatchToProps)(Dashboard)
