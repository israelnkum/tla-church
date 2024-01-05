import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Popconfirm, Spin} from 'antd'
import {connect} from "react-redux";
import {FiTrash2} from "react-icons/fi";
import {TlaError, TlaSuccess} from "../utils/messages";
import {LoadingOutlined} from "@ant-design/icons";

function TlaDelete(props) {
    const {deleteAction, activeRoles, context, id} = props
    const [deleting, setDeleting] = useState(false)

    const handleDelete = () => {
        setDeleting(true)
        deleteAction(id).then(() => {
            TlaSuccess(`${context} Deleted`)
            setDeleting(false)
        }).catch((error) => {
            TlaError(error.response.data.message)
            setDeleting(false)
        })
    }

    return (
        // activeRoles.includes('Admin') &&
        <Popconfirm title="Sure to delete?" onConfirm={handleDelete} cancelText={'No'} okText={'Yes'}>
            <Spin spinning={deleting} indicator={<LoadingOutlined/>}>
                <FiTrash2 className={'cursor-pointer'} title={'Delete'}/>
            </Spin>

            {/*<Button loading={deleting} danger>
                Delete
            </Button>*/}
        </Popconfirm>
    )
}

TlaDelete.defaultProps = {
    context: ''
}

TlaDelete.propTypes = {
    deleteAction: PropTypes.func,
    id: PropTypes.any,
    activeRoles: PropTypes.array.isRequired,
    context: PropTypes.string
}
const mapStateToProps = (state) => ({
    activeRoles: state.userReducer.activeRoles
})

export default connect(mapStateToProps)(TlaDelete)
