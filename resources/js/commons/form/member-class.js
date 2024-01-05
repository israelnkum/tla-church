import React from 'react'
import {Form, Select} from 'antd'
import {useSelector} from 'react-redux'

function MemberClass () {
    const memberClasses = useSelector(state => state.commonReducer.memberClasses)

    return (
        <Form.Item name="member_class_id" label="Class">
            <Select size={'large'} showSearch>
                {
                    memberClasses.map(({id, name}) => (
                        <Select.Option key={id} value={id}>{name}</Select.Option>
                    ))
                }
            </Select>
        </Form.Item>
    )
}

export default MemberClass
