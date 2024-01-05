import { Types } from '../actions/money/Types'
const initialState = {
    moneys: {
        data: [],
        meta: {}
    },
    filter: {
        type: 'all'
    },
    chart: {
        labels: [],
        series: [],
    }
}

export default function moneyReducer (state = initialState, action) {
    switch (action.type) {
        case Types.ALL_MONEYS:
            return { ...state, moneys: action.payload }

        case Types.GET_CHART_DATA:
            return { ...state, chart: action.payload }

        case Types.ADD_MONEY_FILTER:
            return { ...state, filter: action.payload}

        case Types.ADD_MONEYS:
            return {
                ...state,
                moneys: { ...state.moneys, data: state.moneys.data.concat(action.payload) }
            }

        case Types.UPDATE_MONEYS:
            return {
                ...state,
                moneys: {
                    ...state.moneys,
                    data: state.moneys.data.map((money) => {
                        return money.id === action.payload.id ? action.payload : money
                    })
                }
            }

        case Types.DELETE_MONEYS:
            return {
                ...state,
                moneys: { ...state.moneys, data: state.moneys.data.filter((money) => money.id !== action.id) }
            }

        default:
            return state
    }
}
