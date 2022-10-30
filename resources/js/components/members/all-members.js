import React, {useEffect, useState} from 'react'
import {Space, Table, Tag, Typography} from 'antd'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import {useOutletContext} from 'react-router'
import ViewAllWrapper from "../../commons/view-all-wrapper";
import {handleGetAllMembers} from "../../actions/member/MemberAction";
import TlaEdit from "../../commons/tla-edit";
import FilterCashUp from "./filter-members";
import TlaImage from "../../commons/tla-image";

const { Column } = Table
function AllMembers (props) {
    const { getMembers, members, filter } = props
    const { data, meta }= members
    const [loading, setLoading] = useState(true)
    const { setPageInfo } = useOutletContext();
    useEffect(() => {
        setPageInfo({ title: 'Members', addLink: 'members/form', buttonText: 'Member' })
        getMembers(new URLSearchParams(filter)).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <>
            <FilterCashUp/>
            <ViewAllWrapper loading={loading} noData={data.length === 0}>
                <TlaTableWrapper filterObj={filter} callbackFunction={getMembers} data={data} meta={meta}>
                    <Column title="photo" render={({name}) => (
                        <TlaImage name={name} src={null} size={40}/>
                    )}/> <Column title="phone number" render={({name, status}) => (
                        <Space direction={'vertical'}>
                            <Typography.Text>{name}</Typography.Text>
                            <Tag>{status}</Tag>
                        </Space>
                    )}/>
                    <Column title="class" dataIndex={['member_class','name']}/>
                    <Column title="phone number" render={({phone_number, alt_phone_number}) => (
                        <Space direction={'vertical'}>
                            <Typography.Text>{phone_number}</Typography.Text>
                            <Typography.Text>{alt_phone_number}</Typography.Text>
                        </Space>
                    )}/>
                    <Column title="home town" dataIndex={'home_town'}/>
                    <Column title="Actions" render={(record) => (
                        <TlaEdit data={record} icon link={'form'}/>
                    )}/>
                </TlaTableWrapper>
            </ViewAllWrapper>
        </>
    )
}

AllMembers.propTypes = {
    pageInfo: PropTypes.object,
    getMembers: PropTypes.func,
    members: PropTypes.object,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    members: state.memberReducer.members,
    filter: state.memberReducer.filter,
})

const mapDispatchToProps = (dispatch) => ({
    getMembers: (payload) => dispatch(handleGetAllMembers(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllMembers)
