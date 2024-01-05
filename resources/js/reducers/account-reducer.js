import { Types } from '../actions/records/Types'
import { Types as MoneyTypes } from '../actions/money/Types'
const initialState = {
    records: {
        data: [],
        meta: {}
    },
    record: {},
    filter: {
        class_id: 'all',
        status: 'all',
        name: ''
    },
    chart: {
        labels: [],
        series: [],
    }
}

export default function recordReducer (state = initialState, action) {
    switch (action.type) {
        case Types.ALL_RECORDS:
            return { ...state, records: action.payload }

        case Types.SINGLE_RECORD:
            return { ...state, record: action.payload }

        case Types.GET_CHART_DATA:
            return { ...state, chart: action.payload }

        case Types.ADD_RECORD_FILTER:
            return { ...state, filter: action.payload}

        case MoneyTypes.ADD_MONEYS:
            return {
                ...state,
                record: {
                    ...state.record,
                    total_amount: Number(state.record.total_amount) + Number(action.payload.amount)
                }
            }
        case Types.ADD_RECORDS:
            return {
                ...state,
                records: { ...state.records, data: state.records.data.concat(action.payload) }
            }

        case Types.UPDATE_RECORDS:
            return {
                ...state,
                records: {
                    ...state.records,
                    data: state.records.data.map((record) => {
                        return record.id === action.payload.id ? action.payload : record
                    })
                }
            }

        case Types.DELETE_RECORDS:
            return {
                ...state,
                records: { ...state.records, data: state.records.data.filter((record) => record.id !== action.id) }
            }

        default:
            return state
    }
}
