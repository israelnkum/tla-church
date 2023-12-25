import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Checkbox, Col, DatePicker, Form, Input, Row, Select} from 'antd'
import {connect} from 'react-redux'
import {useLocation} from "react-router-dom";
import {handleAddNewMembers, handleUpdateMembers} from "../../actions/member/MemberAction";
import moment from "moment/moment";
import TlaFormWrapper from "../../commons/form/tla-form-wrapper";
import ChangePicture from "../commons/change-picture";
function MemberForm (props) {
    const { memberClasses, addMembers, updateMembers } = props
    const [selectedFile, setSelectedFile] = useState(null)

    const { state } = useLocation()

    const formValues = {
        id: 0,
        ...{...state.data, dob: state?.data ? moment(state?.data.dob) : ''}
    }

    return (
        <TlaFormWrapper width={600}
            file={selectedFile}
            initialValues={formValues}
            onSubmit={formValues.id === 0 ? addMembers : updateMembers}
            formTitle={`${(formValues.id === 0 ? "New" : "Edit")} Member Info`}>
            <Row gutter={10}>
                <Col span={24}>
                    <div align={'center'}>
                        <ChangePicture
                            hasFile={selectedFile !== null}
                            setFile={setSelectedFile}/>
                    </div>
                </Col>
                {
                    formValues.id === 0 &&
                    <Col span={24}>
                        <Form.Item name="create_account" valuePropName="checked">
                            <Checkbox>Create user account</Checkbox>
                        </Form.Item>
                    </Col>
                }
                <Col span={8}>
                    <Form.Item name="first_name" label="First Name"
                               rules={[
                                   {
                                       required: true,
                                       message: 'First Name is Required'
                                   }
                               ]}>
                        <Input size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="other_names" label="Middle Names">
                        <Input size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="last_name" label="Last Name"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Last name is Required'
                                   }
                               ]}>
                        <Input size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="gender" label="Gender"  rules={[
                        {
                            required: true,
                            message: 'Gender is Required'
                        }
                    ]}>
                        <Select size={'large'}>
                            <Select.Option value={'Male'}>Male</Select.Option>
                            <Select.Option value={'Female'}>Female</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="dob" label="Date of Birth"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Date of Birth is Required'
                                   }
                               ]}>
                        <DatePicker size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="member_class_id" label="Class">
                        <Select size={'large'}>
                            {
                                memberClasses.map(({ id, name }) => (
                                    <Select.Option key={id} value={id}>{name}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="class_leader" label="Class Leader">
                        <Select size={'large'}>
                            <Select.Option value={'Asst.'}>Asst.</Select.Option>
                            <Select.Option value={'Main'}>Main</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="phone_number" label="Mobile No.">
                        <Input size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="alt_phone_number" label="Alt. Mobile No.">
                        <Input size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="ghana_card_number" label="Ghana Card Number">
                        <Input size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="home_town" label="Home Town">
                        <Input size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="email" label="Email">
                        <Input size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="address" label="Address">
                        <Input.TextArea size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item hidden name="id" label="ID"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Required'
                                   }
                               ]}>
                        <Input size={'large'}/>
                    </Form.Item>
                </Col>
            </Row>
        </TlaFormWrapper>
    )
}
MemberForm.propTypes = {
    addMembers: PropTypes.func.isRequired,
    updateMembers: PropTypes.func.isRequired,
    memberClasses: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    memberClasses: state.commonReducer.memberClasses
})

const mapDispatchToProps = (dispatch) => ({
    addMembers: (payload) => dispatch(handleAddNewMembers(payload)),
    updateMembers: (payload) => dispatch(handleUpdateMembers(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(MemberForm)
