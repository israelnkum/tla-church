import React from 'react'
import {Route, Routes} from 'react-router-dom'
import {Outlet, useLocation} from 'react-router'
import {ModalRoutes} from "./ModalRoutes";
import Dashboard from "../../components/dashboard";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import PageWrapper from "../../components/admin/page-wrapper";
import AllMembers from "../../components/members/all-members";

const ProtectedRoutes = () => {
    const location = useLocation()
    const background = location.state && location.state.background

    return (
        <>
            <Routes location={background || location}>
                <Route exact element={<Dashboard/>} path='/'>
                    <Route exact path='js/*'  element={<Dashboard/>}/>
                    <Route exact path='home'  element={<Dashboard/>}/>
                </Route>

                <Route path='*' element={<PageWrapper/>}>
                    <Route path='members' element={<AllMembers/>}/>
                </Route>
                <Route exact>
                    <>not found</>
                </Route>
            </Routes>
            {background && (<><ModalRoutes/> <Outlet /></>)}
        </>
    )
}

ProtectedRoutes.propTypes = {
    activeRoles: PropTypes.array.isRequired
}
const mapStateToProps = (state) => ({
    activeRoles: state.userReducer.activeRoles
})
export default connect(mapStateToProps)(ProtectedRoutes)
