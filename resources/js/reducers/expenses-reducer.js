import {Types} from '../actions/expenses/Types'

const initialState = {
    expenses: {
        data: [],
        meta: {}
    },
    filter: {
        date: '',
        category: 'all'
    },
    chart: {
        labels: [],
        series: [],
    }
}

export default function expensesReducer (state = initialState, action) {
    switch (action.type) {
        case Types.ALL_EXPENSES:
            return { ...state, expenses: action.payload }

        case Types.ADD_EXPENSES_FILTER:
            return { ...state, filter: action.payload}

        case Types.GET_EXPENSES_CHART:
            return { ...state, chart: action.payload}

        case Types.ADD_EXPENSES:
            return {
                ...state,
                expenses: { ...state.expenses, data: state.expenses.data.concat(action.payload) }
            }

        case Types.UPDATE_EXPENSES:
            return {
                ...state,
                expenses: {
                    ...state.expenses,
                    data: state.expenses.data.map((expenses) => {
                        return expenses.id === action.payload.id ? action.payload : expenses
                    })
                }
            }

        case Types.DELETE_EXPENSES:
            return {
                ...state,
                expenses: { ...state.expenses, data: state.expenses.data.filter((expenses) => expenses.id !== action.id) }
            }

        default:
            return state
    }
}
