import React from "react";
import {Button, Form} from "antd";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import {TlaError, TlaSuccess} from "../../utils/messages";
import CloseModal from "../close-modal";
import {TlaModal} from "../pop-ups/tla-modal";

function TlaModalFormWrapper(props) {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { onSubmit, initialValues, formTitle, children, file, width, customForm } = props;
    const submit = (values) => {
        const formData = new FormData();
        values.id !== 0 && formData.append("_method", "PUT");
        file !== null ? formData.append('file', file): ''

        for (const key in values) {
            if (Object.prototype.hasOwnProperty.call(values, key)) {
                const formattedValue = (values[key] === null || values[key] === undefined) ? '' : values[key]
                formData.append(key, formattedValue)
            }
        }
        onSubmit(formData).then(() => {
            TlaSuccess();
            customForm ? customForm.resetFields() : form.resetFields();
            navigate(-1);
        }).catch((error) => {
            TlaError(error.response.data.message)
        });
    };
    return (
        <TlaModal title={formTitle} width={width}>
            <Form
                form={customForm ?? form}
                onFinish={(values) => {submit(values)}}
                layout="vertical"
                name="createQualificationForm"
                initialValues={initialValues}>
                {children}
                <Form.Item>
                    <div align={"right"}>
                        <CloseModal />
                        &nbsp;
                        <Button size={"large"} type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </TlaModal>
    );
}

TlaModalFormWrapper.defaultProps = {
    file: null,
    customForm: null,
    width: 520
}

TlaModalFormWrapper.propTypes = {
    initialValues: PropTypes.object,
    submitValues: PropTypes.object,
    formTitle: PropTypes.string,
    onSubmit: PropTypes.func,
    file: PropTypes.any,
    width: PropTypes.any,
    customForm: PropTypes.any,
    children: PropTypes.any
};

export default TlaModalFormWrapper
