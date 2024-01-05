import React, {useEffect, useState} from 'react'
import {Table} from 'antd'
import PropTypes from 'prop-types'
import {connect, useDispatch} from "react-redux";
import TlaTableWrapper from "../../../commons/table/tla-table-wrapper";
import {useOutletContext} from 'react-router'
import {useNavigate} from "react-router-dom";

import ViewAllWrapper from "../../../commons/view-all-wrapper";
import {handleGetAllRecords, handlePrintRecord} from "../../../actions/records/Actions";
import TlaEdit from "../../../commons/tla-edit";
import FilterRecords from "./filter-records";
import TlaImage from "../../../commons/tla-image";
import TlaPrintButton from "../../../commons/tla-print-button";

const {Column} = Table

function AllRecords(props) {
    const {getRecords, printRecord, records, filter} = props
    const {data, meta} = records
    const [loading, setLoading] = useState(true)
    const {setPageInfo} = useOutletContext();
    useEffect(() => {
        setPageInfo({title: 'Records', addLink: 'records/form', buttonText: 'Record'})
        getRecords(new URLSearchParams(filter)).then(() => {
            setLoading(false)
        })
    }, [])

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const goToDetail = (record) => {
        return {
            onClick: () => {
                dispatch({
                    type: 'SINGLE_RECORD',
                    payload: record
                })
                navigate(`/accounts/records/${record.id}/details`)
            },
        };
    }
    return (
        <>
            <FilterRecords/>
            <ViewAllWrapper loading={loading} noData={data.length === 0}>
                <TlaTableWrapper filterObj={filter} callbackFunction={getRecords} data={data} meta={meta}>
                    <Column className={'cursor-pointer'} onCell={goToDetail} title="date" dataIndex={'date'}/>
                    <Column className={'cursor-pointer'} onCell={goToDetail} title="comments" dataIndex={'comments'}/>
                    <Column className={'cursor-pointer'} onCell={goToDetail} title="total amount"
                            dataIndex={'total_amount'}/>
                    <Column className={'cursor-pointer'} onCell={goToDetail} title="added by"
                            render={({staff, photo}) => (
                                <div className={'flex items-center gap-x-2'}>
                                    <TlaImage preview name={staff} src={photo} size={30}/>
                                    <h3>{staff}</h3>
                                </div>
                            )}/>
                    <Column title="Actions" render={(record) => (
                        <div className={'flex items-center gap-x-2'}>
                            <TlaEdit data={record} icon link={'form'}/>
                            <TlaPrintButton callback={printRecord} data={record.id}/>
                        </div>

                    )}/>
                </TlaTableWrapper>
            </ViewAllWrapper>
        </>
    )
}

AllRecords.propTypes = {
    pageInfo: PropTypes.object,
    getRecords: PropTypes.func,
    printRecord: PropTypes.func,
    records: PropTypes.object,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    records: state.recordReducer.records,
    filter: state.recordReducer.filter,
})

const mapDispatchToProps = (dispatch) => ({
    getRecords: (payload) => dispatch(handleGetAllRecords(payload)),
    printRecord: (id) => dispatch(handlePrintRecord(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllRecords)
