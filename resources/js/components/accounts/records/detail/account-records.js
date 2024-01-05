import React, {useEffect, useState} from 'react'
import {Table} from 'antd'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {useParams} from 'react-router-dom'
import TlaTableWrapper from "../../../../commons/table/tla-table-wrapper";
import ViewAllWrapper from "../../../../commons/view-all-wrapper";
import {handleDeleteMoneys, handleGetAllMoneys} from "../../../../actions/money/Actions";
import TlaEdit from "../../../../commons/tla-edit";
import FilterMoneys from "./filter-monies";
import TlaImage from "../../../../commons/tla-image";
import TlaDelete from "../../../../commons/tla-delete";
import {capitalize} from "../../../../utils";

const {Column} = Table

function AccountRecords(props) {
    const { id } = useParams()
    const {getMoneys, deleteMoney, moneys, filter} = props
    const {data, meta} = moneys
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getMoneys(id, new URLSearchParams(filter)).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div>
            <FilterMoneys/>
            <ViewAllWrapper loading={loading} noData={data.length === 0}>
                <TlaTableWrapper
                    filterObj={filter}
                    callbackFunction={getMoneys} data={data} meta={meta}>
                    <Column title="type" render={({type, member}) => (
                        <div>
                            <p>{capitalize(type)}</p>
                            {
                                member &&
                                <div className={'flex items-center gap-x-2'}>
                                    <TlaImage preview name={member.name} src={member.photo} size={25}/>
                                    <h3>{member.name}</h3>
                                </div>
                            }
                        </div>
                    )}/>
                    <Column title="amount" dataIndex={'amount'}/>
                    <Column title="comments" dataIndex={'comments'}/>
                    <Column title="added by" render={({staff, photo}) => (
                        <div className={'flex items-center gap-x-2'}>
                            <TlaImage preview name={staff} src={photo} size={30}/>
                            <h3>{staff}</h3>
                        </div>
                    )}/>
                    <Column title="Actions" render={(money) => (
                        <div className={'flex items-center gap-x-2'}>
                            <TlaEdit data={money} icon link={'form'}/>
                            <TlaDelete deleteAction={deleteMoney} id={money.id}/>
                        </div>

                    )}/>
                </TlaTableWrapper>
            </ViewAllWrapper>
        </div>
    )
}

AccountRecords.propTypes = {
    getMoneys: PropTypes.func,
    deleteMoney: PropTypes.func,
    moneys: PropTypes.object,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    moneys: state.moneyReducer.moneys,
    filter: state.moneyReducer.filter,
})

const mapDispatchToProps = (dispatch) => ({
    getMoneys: (id, params) => dispatch(handleGetAllMoneys(id, params)),
    deleteMoney: (id) => dispatch(handleDeleteMoneys(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountRecords)
