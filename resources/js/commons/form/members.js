import React from 'react'
import {connect} from 'react-redux'
import {Form} from 'antd'
import PropTypes from 'prop-types'
import {handleGetCommonMembers} from "../../actions/commons/CommonAction";
import SearchItems from "./search";

function Members(props) {
    const { getMembers, form, required } = props
    return (
        <Form.Item
            name="member_id"
            label="Members"
            rules={[
                {
                    required,
                    message: "Member is Required",
                },
            ]}>
            <SearchItems search={getMembers} displayField={'name'}
                         text={'Search by surname'}
                         onChangeCallback={({ id }) => {
                             getMembers()
                             form.setFieldsValue({
                                 member_id: id
                             })
                         }}/>
        </Form.Item>
    )
}

Members.defaultProps = {
    required: false
}

Members.propTypes = {
    getMembers: PropTypes.func.isRequired,
    form: PropTypes.any.isRequired,
    required: PropTypes.bool,
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMembers: (query) => dispatch(handleGetCommonMembers(query))
    }
}

export default connect(null, mapDispatchToProps)(Members)
