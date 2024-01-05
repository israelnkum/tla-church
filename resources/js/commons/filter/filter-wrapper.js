import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Button, Collapse, Dropdown, Form, Input, Space} from "antd";
import {FaRegFileExcel} from "react-icons/fa";

function FilterWrapper(props) {
    const {submitFilter, exportFilter, children, initialValue, id} = props
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    const onFinish = (values) => {
        setLoading(true)
        values.export = false
        values.print = false;

        (id ? submitFilter(id, new URLSearchParams(values)) : submitFilter(new URLSearchParams(values)))
            .then(() => setLoading(false))
    }

    const completeExport = (values) => {
        setLoading(true);

        (id ? exportFilter(id, new URLSearchParams(values)) : exportFilter(new URLSearchParams(values)))
            .then(() => setLoading(false))
    }

    const items = [
        {
            key: '1',
            label: (
                <span onClick={() => {
                    form.setFieldsValue({export: true, print: false})
                    completeExport(form.getFieldsValue())
                }} className={'flex gap-1 items-center'}>
                    <FaRegFileExcel/> Export
                </span>
            ),
        }
        /* {
             key: '2',
             label: (
                <span  onClick={() => {
                    form.setFieldsValue({print: true, export: false})
                    completeExport(form.getFieldsValue())
                }}>
                   <FiPrinter/> Print
                </span>
             ),
         },*/
    ];

    const aItems = [
        {
            key: '1',
            label: 'Filter',
            children:
                <Form form={form} onFinish={onFinish} layout={'vertical'}
                      initialValues={{...initialValue, export: false}}>
                    <Form.Item hidden name="export" label="export">
                        <Input/>
                    </Form.Item>
                    <Form.Item hidden name="print" label="print">
                        <Input/>
                    </Form.Item>
                    {
                        children &&
                        <Space align={'center'} wrap>
                            {children}
                            <div>
                                <Button size={'large'} loading={loading} htmlType={'submit'}
                                        type={'primary'}>Filter</Button>
                            </div>
                        </Space>
                    }
                </Form>,
            extra:
                <Dropdown key={'action'} menu={{items}} placement="bottomLeft" arrow>
                    <Button>Report</Button>
                </Dropdown>,
            forceRender: true
        }
    ];
    return (
        <Collapse className={'bg-white'} collapsible={'header'} bordered={false} accordion items={aItems}/>
    )
}

FilterWrapper.defaultProps = {
    id: null
}

FilterWrapper.propTypes = {
    id: PropTypes.any,
    submitFilter: PropTypes.func,
    exportFilter: PropTypes.func,
    children: PropTypes.any,
    initialValue: PropTypes.object,
}


export default (FilterWrapper)
