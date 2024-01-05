import React from 'react'
import {Affix, Layout} from 'antd'
import MenuHelper from "../menu-helper";
import {SidebarMenus} from "../../utils";
import {FiHome, FiSettings, FiUser} from "react-icons/fi";
import {BsTruck} from "react-icons/bs";
import {connect, useSelector} from "react-redux";
import PropTypes from "prop-types";
import SideProfile from "./side-profile";
import {IoBusinessOutline} from "react-icons/io5";
import {RiProductHuntLine} from "react-icons/ri";
import {GoListUnordered} from "react-icons/go";
import {TbCash} from "react-icons/tb";
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
                    trucks: <BsTruck/>,
                    businesses: <IoBusinessOutline/>,
                    product: <RiProductHuntLine/>,
                    'dispatch-order': <GoListUnordered/>,
                    'cash-up': <TbCash/>,
                    'expenses': <SiExpensify/>,
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
