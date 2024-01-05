import React from 'react'
import PropTypes from 'prop-types'
import {Form, Input, InputNumber, Select} from 'antd'
import {connect} from 'react-redux'
import {useLocation, useParams} from "react-router-dom";
import {handleAddNewMoneys, handleUpdateMoneys} from "../../../../actions/money/Actions";
import TlaModalFormWrapper from "../../../../commons/form/tla-modal-form-wrapper";
import Members from "../../../../commons/form/members";

function MoneyForm(props) {
    const {addMoneys, updateMoneys} = props
    const { id } = useParams()
    const {state} = useLocation()

    const formValues = {
        id: 0,
        account_id: id,
        update: false,
        ...state.data
    }
    const [form] = Form.useForm();

    return (
        <TlaModalFormWrapper
            customForm={form}
            width={450}
            initialValues={formValues}
            onSubmit={formValues.id === 0 ? addMoneys : updateMoneys}
            formTitle={`${(formValues.id === 0 ? "New" : "Edit")} Money`}>
            <div>
                <div className={'grid grid-cols-2 justify-between gap-3'}>
                    <Form.Item name="type" label="Type"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Type is Required'
                                   }
                               ]}>
                        <Select showSearch size={'large'}>
                            <Select.Option value={'tithe'}>Tithe</Select.Option>
                            <Select.Option value={'1st offertory'}>1st offertory</Select.Option>
                            <Select.Option value={'2nd offertory'}>2nd offertory</Select.Option>
                            <Select.Option value={'donation'}>Donation</Select.Option>
                            <Select.Option value={'children service'}>Children Service</Select.Option>
                            <Select.Option value={'thanksgiving'}>Thanksgiving</Select.Option>
                            <Select.Option value={'appeal'}>Appeal</Select.Option>
                            <Select.Option value={'pledge'}>Pledge</Select.Option>
                            <Select.Option value={'seed'}>Seed</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="amount" label="Amount" rules={[
                        {
                            required: true,
                            message: 'Amount is Required'
                        }
                    ]}>
                        <InputNumber className={'w-full'} min={1} step={'0.001'} size={'large'}/>
                    </Form.Item>
                </div>

                <Form.Item hidden name="id" label="ID"
                           rules={[
                               {
                                   required: true,
                                   message: 'ID is Required'
                               }
                           ]}>
                    <Input className={'w-full'} size={'large'}/>
                </Form.Item>

                <Form.Item hidden name="account_id" label="account_id"
                           rules={[
                               {
                                   required: true,
                                   message: 'ID is Required'
                               }
                           ]}>
                    <Input className={'w-full'} size={'large'}/>
                </Form.Item>

                <div>
                    <Form.Item name="comments" label="Comments">
                        <Input.TextArea size={'large'}/>
                    </Form.Item>
                </div>
                {
                    state?.data?.member &&
                    <div className={'rounded-lg border p-2'}>
                        <p>Member: {state?.data?.member?.name}</p>
                    </div>
                }

                <Members form={form}/>
            </div>
        </TlaModalFormWrapper>
    )
}

MoneyForm.propTypes = {
    addMoneys: PropTypes.func.isRequired,
    updateMoneys: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    moneyClasses: state.commonReducer.moneyClasses
})

const mapDispatchToProps = (dispatch) => ({
    addMoneys: (payload) => dispatch(handleAddNewMoneys(payload)),
    updateMoneys: (payload) => dispatch(handleUpdateMoneys(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(MoneyForm)
