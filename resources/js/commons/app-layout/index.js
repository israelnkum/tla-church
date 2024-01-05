import React, {useEffect, useState} from 'react'
import {Layout, Spin} from 'antd'
import {isMobile} from 'react-device-detect'
import PropTypes from 'prop-types'
import AppHeader from "./app-header";
import AppSidebar from "./app-sidebar";
import {connect} from "react-redux";
import {getActiveRoles} from "../../actions/users/UserAction";
import ChangePassword from "../change-password";

const AppLayout = (props) => {
    const [loading, setLoading] = useState(true)
    const { children, getRoles, authUser } = props
    useEffect(() => {
        setLoading(true)
        getRoles().then(() => {
            setLoading(false)
        })
    }, [])
    return (
        <Spin spinning={loading}>
            {
                (!loading && authUser.default_password !== null) ?
                    <ChangePassword/> :
                    <Layout className={'max-w-screen-2xl mx-auto'}>
                        <AppSidebar/>
                        <Layout>
                            <Layout.Content style={{ margin: '0 15px 50px' }}>
                                <AppHeader/>
                                <div style={{ minHeight: '100vh', marginTop: 10 }}>
                                    {children}
                                </div>
                            </Layout.Content>
                        </Layout>
                    </Layout>
            }
        </Spin>
    )
}
AppLayout.propTypes = {
    children: PropTypes.any,
    authUser: PropTypes.object.isRequired,
    getRoles: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    authUser: state.userReducer.loggedInUser
})


const mapDispatchToProps = (dispatch) => ({
    getRoles: () => dispatch(getActiveRoles('21993de6-123a-54c68c0'))
})

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout)
