import { Types } from '../actions/member/Types'
const initialState = {
    members: {
        data: [],
        meta: {}
    },
    filter: {
        truck_code: ''
    },
    chart: {
        labels: [],
        series: [],
    }
}

export default function memberReducer (state = initialState, action) {
    switch (action.type) {
        case Types.ALL_MEMBERS:
            return { ...state, members: action.payload }

        case Types.GET_CHART_DATA:
            return { ...state, chart: action.payload }

        case Types.ADD_MEMBER_FILTER:
            return { ...state, filter: action.payload}

        case Types.ADD_MEMBERS:
            return {
                ...state,
                members: { ...state.members, data: state.members.data.concat(action.payload) }
            }

        case Types.UPDATE_MEMBERS:
            return {
                ...state,
                members: {
                    ...state.members,
                    data: state.members.data.map((member) => {
                        return member.id === action.payload.id ? action.payload : member
                    })
                }
            }

        case Types.DELETE_MEMBERS:
            return {
                ...state,
                members: { ...state.members, data: state.members.data.filter((member) => member.id !== action.id) }
            }

        default:
            return state
    }
}
