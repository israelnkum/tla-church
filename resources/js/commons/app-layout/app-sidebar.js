import React from 'react'
import {Affix, Layout} from 'antd'
import MenuHelper from "../menu-helper";
import {SidebarMenus} from "../../utils";
import {FiFilePlus, FiFileText, FiHome, FiSettings, FiUser, FiPlus} from "react-icons/fi";
import {connect, useSelector} from "react-redux";
import PropTypes from "prop-types";
import SideProfile from "./side-profile";
import {SiExpensify} from "react-icons/si";


function AppSidebar(props) {
    const {authUser} = props
    const currentApp = useSelector(state => state.commonReducer.currentApp)
    return (
        <Affix top={0}>
            <Layout.Sider theme={'light'} className={'h-[700px]'}>
                <div align={'center'}>
                    <SideProfile name={authUser.name}/>
                </div>
                <MenuHelper disabled={authUser.default_password !== null} icons={{
                    home: <FiHome/>,
                    pim: <FiUser/>,
                    config: <FiSettings/>,
                    records: <FiFileText/>,
                    'add-record': <FiFilePlus/>,
                    'expenses': <SiExpensify/>,
                    'add': <FiPlus/>
                }} menus={SidebarMenus[currentApp] ?? []} direction={'inline'}/>
            </Layout.Sider>
        </Affix>
    )
}

AppSidebar.propTypes = {
    authUser: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    authUser: state.userReducer.loggedInUser,
})

export default connect(mapStateToProps)(AppSidebar)
