import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Form, Input} from "antd";
import FilterWrapper from "../../commons/filter/filter-wrapper";
import {handleExportMembers, handleGetAllMembers} from "../../actions/member/MemberAction";

function FilterMembers (props) {
    const { submitFilter, filter, exportFilter } = props

    return (
       <FilterWrapper initialValue={filter} submitFilter={submitFilter} exportFilter={exportFilter}>
           <div>
               <Form.Item name="truck_code" label="Truck Code">
                  <Input />
               </Form.Item>
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
    submitFilter: (search, pageNumber) => dispatch(handleGetAllMembers(search,pageNumber)),
    exportFilter: (search, pageNumber) => dispatch(handleExportMembers(search,pageNumber)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterMembers)
