import React from 'react'
import PropTypes from 'prop-types'
import {connect, useSelector} from "react-redux";
import {Form, Input} from "antd";
import FilterWrapper from "../../commons/filter/filter-wrapper";
import {handleExportMembers, handleGetAllMembers} from "../../actions/member/MemberAction";
import TlaSelect from "../../commons/form/tla-select";

function FilterMembers(props) {
    const memberClasses = useSelector(state => state.commonReducer.memberClasses)

    const {submitFilter, filter, exportFilter} = props

    return (
        <FilterWrapper initialValue={filter} submitFilter={submitFilter} exportFilter={exportFilter}>
            <div className={'flex flex-wrap gap-3'} style={{gap: 10}}>
                <Form.Item name="name" label="Name">
                    <Input size={'large'}/>
                </Form.Item>
                <div style={{width: 200}}>
                    <TlaSelect hasAll name={'class_id'} optionKey={'name'} options={memberClasses} label={'Class'}/>
                </div>
                <div style={{width: 200}}>
                    <TlaSelect hasAll name={'status'} optionKey={'self'} options={['active', 'invalid']} label={'Status'}/>
                </div>
            </div>
        </FilterWrapper>
    )
}

FilterMembers.propTypes = {
    submitFilter: PropTypes.func,
    exportFilter: PropTypes.func,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    filter: state.memberReducer.filter
})

const mapDispatchToProps = (dispatch) => ({
    submitFilter: (params) => dispatch(handleGetAllMembers(params)),
    exportFilter: (params) => dispatch(handleExportMembers(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterMembers)
