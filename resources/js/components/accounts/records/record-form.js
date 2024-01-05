import React from 'react'
import PropTypes from 'prop-types'
import {DatePicker, Form, Input} from 'antd'
import {connect} from 'react-redux'
import {useLocation} from "react-router-dom";
import {handleAddNewRecords, handleUpdateRecords} from "../../../actions/records/Actions";
import dayjs from "dayjs";
import TlaModalFormWrapper from "../../../commons/form/tla-modal-form-wrapper";

function RecordForm(props) {
    const {addRecords, updateRecords} = props

    const {state} = useLocation()

    const formValues = {
        id: 0,
        ...{...state.data, date: state?.data ? dayjs(state?.data.date) : ''}
    }

    return (
        <TlaModalFormWrapper
            width={450}
            initialValues={formValues}
            onSubmit={formValues.id === 0 ? addRecords : updateRecords}
            formTitle={`${(formValues.id === 0 ? "New" : "Edit")} Account Record`}>
            <div>
                <div>
                    <Form.Item name="date" label="Date"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Date is Required'
                                   }
                               ]}>
                        <DatePicker format={'YYYY-MM-DD'} className={'w-full'} size={'large'}/>
                    </Form.Item>
                    <Form.Item name="id" label="ID"
                               hidden
                               rules={[
                                   {
                                       required: true,
                                       message: 'ID is Required'
                                   }
                               ]}>
                        <Input className={'w-full'} size={'large'}/>
                    </Form.Item>
                </div>
                <div>
                    <Form.Item name="comments" label="Comments">
                        <Input.TextArea rows={5} size={'large'}/>
                    </Form.Item>
                </div>
            </div>
        </TlaModalFormWrapper>
    )
}

RecordForm.propTypes = {
    addRecords: PropTypes.func.isRequired,
    updateRecords: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    recordClasses: state.commonReducer.recordClasses
})

const mapDispatchToProps = (dispatch) => ({
    addRecords: (payload) => dispatch(handleAddNewRecords(payload)),
    updateRecords: (payload) => dispatch(handleUpdateRecords(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecordForm)
