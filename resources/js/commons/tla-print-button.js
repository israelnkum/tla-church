import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {FiPrinter} from "react-icons/fi";
import {Spin} from "antd";

function TlaPrintButton({text, icon, callback, data}) {
    const [loading, setLoading] = useState(false)
    return (
        <Spin spinning={loading} tip={'Please wait'}>
            {icon && <FiPrinter
                style={{cursor: 'pointer'}}
                onClick={() => {
                    setLoading(true)
                    callback(data).then(() => setLoading(false))
                }}/>} {text}
        </Spin>
    )
}

TlaPrintButton.defaultProps = {
    text: '',
    icon: true
}
TlaPrintButton.propTypes = {
    text: PropTypes.string,
    icon: PropTypes.bool,
    data: PropTypes.any,
    callback: PropTypes.func,
}


export default TlaPrintButton
