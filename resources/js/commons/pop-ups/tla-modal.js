import React from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import PopUps from './index'
import { Spin } from 'antd'

export const TlaModal = ({ title, children, width, loading, allowClose }) => {
    const navigate = useNavigate()

    return (
        <PopUps>
            <div className="ant-modal-root tla-modal">
                <div className="ant-modal-mask"></div>
                <div tabIndex="-1" className="ant-modal-wrap flex items-center justify-center"
                     aria-labelledby="rc_unique_0">
                    <div role="dialog" aria-modal="true" className="ant-modal tla-modal"
                         style={{ width, transformOrigin: '-208px 142px', maxHeight: '100vh', borderRadius: 'px' }}>
                        <div className="ant-modal-content tla-modal-content">

                            <>
                                {
                                    allowClose &&
                                    <button type="button" onClick={() => {
                                        navigate(-1)
                                    }} aria-label="Close" className="ant-modal-close">
                                      <span className="ant-modal-close-x">
                                      <span role="img" aria-label="close"
                                            className="anticon anticon-close ant-modal-close-icon">
                                          <svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em"
                                               height="1em"
                                               fill="currentColor" aria-hidden="true">
                                              <path
                                                  d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                                          </svg>
                                      </span>
                                      </span>
                                    </button>
                                }
                                <div className="ant-modal-header tla-modal-header">
                                    <div className="ant-modal-title" id="rc_unique_0">{title}</div>
                                </div>
                            </>

                            <div className="ant-modal-body">
                                <Spin spinning={loading} tip={'Please Wait...'}>
                                    {children}
                                </Spin>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PopUps>
    )
}

TlaModal.defaultProps = {
    title: <>&nbsp;</>,
    type: 'text',
    width: 520,
    icon: true,
    loading: false,
    allowClose: true
}

TlaModal.propTypes = {
    width: PropTypes.any,
    type: PropTypes.string,
    children: PropTypes.any,
    title: PropTypes.any,
    loading: PropTypes.bool,
    allowClose: PropTypes.bool,
    modalAction: PropTypes.any
}
