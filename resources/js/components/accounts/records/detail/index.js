import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {useOutletContext} from 'react-router'
import AccountRecords from "./account-records";
import AccountDetail from "./account-detail";
import {useParams} from "react-router-dom";
import {Affix} from "antd";

function Detail() {
    const { id } = useParams()
    const {setPageInfo} = useOutletContext();
    useEffect(() => {
        setPageInfo({title: 'Money', addLink: `/accounts/records/${id}/details/form`, buttonText: 'Money'})
    }, [])

    return (
        <Affix offsetTop={100}>
            <div className={'flex gap-x-3 mt-2'}>
                <div className={'w-4/5'}>
                    <AccountRecords/>
                </div>
                <div className={'grow'}>
                    <AccountDetail/>
                </div>
            </div>
        </Affix>
    )
}

Detail.propTypes = {
    pageInfo: PropTypes.object,
}

export default Detail
