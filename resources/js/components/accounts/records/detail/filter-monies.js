import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import FilterWrapper from "../../../../commons/filter/filter-wrapper";
import TlaSelect from "../../../../commons/form/tla-select";
import {moneyTypes} from "../../../../utils";
import {handleExportMoneys, handleGetAllMoneys} from "../../../../actions/money/Actions";
import {useParams} from "react-router-dom";

function FilterMonies(props) {
    const { id } = useParams()
    const {submitFilter, filter, exportFilter} = props

    return (
        <FilterWrapper id={id} initialValue={filter} submitFilter={submitFilter} exportFilter={exportFilter}>
            <div className={'flex flex-wrap gap-3'} style={{gap: 10}}>
                <div style={{width: 200}}>
                    <TlaSelect hasAll name={'type'} optionKey={'self'} options={moneyTypes} label={'Type'}/>
                </div>
            </div>
        </FilterWrapper>
    )
}

FilterMonies.propTypes = {
    submitFilter: PropTypes.func,
    exportFilter: PropTypes.func,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    filter: state.moneyReducer.filter
})

const mapDispatchToProps = (dispatch) => ({
    submitFilter: (id, params) => dispatch(handleGetAllMoneys(id, params)),
    exportFilter: (id, params) => dispatch(handleExportMoneys(id, params))
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterMonies)
