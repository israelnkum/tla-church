import {Types} from '../actions/commons/Types'

const initialState = {
    employees: [],
    members: [],
    memberClasses: [],
    currentApp: 'members'
}

export default function commonReducer(state = initialState, action) {
    switch (action.type) {
        case Types.SET_CURRENT_APP:
            return {
                ...state,
                currentApp: action.payload
            }

        case Types.COMMON_MEMBERS:
            return { ...state, members: action.payload }

        case Types.MEMBER_CLASSES:
            return {...state, memberClasses: action.payload}

        default:
            return state
    }
}
