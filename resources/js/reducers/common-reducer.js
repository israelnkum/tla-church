import { Types } from '../actions/commons/Types'
const initialState = {
    suppliers: [],
    products: [],
    trucks: [],
    employees: [],
    memberClasses: [],
}

export default function commonReducer (state = initialState, action) {
    switch (action.type) {
        case Types.COMMON_SUPPLIERS:
            return { ...state, suppliers: action.payload }

        case Types.MEMBER_CLASSES:
            return { ...state, memberClasses: action.payload }

        default:
            return state
    }
}
