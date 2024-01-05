import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'
import employeeReducer from './employee-reducer'
import userReducer from './UserReducer'
import memberReducer from "./member-reducer";
import commonReducer from "./common-reducer";
import dashboardReducer from "./dashboard-reducer";
import recordReducer from "./account-reducer";
import moneyReducer from "./money-reducer";

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: [
        'employeeReducer',
        'userReducer',
        'memberReducer',
        'commonReducer',
        'dashboardReducer',
        'recordReducer',
        'moneyReducer',
    ]
}

const rootReducer = combineReducers({
    employeeReducer,
    userReducer,
    memberReducer,
    commonReducer,
    dashboardReducer,
    recordReducer,
    moneyReducer,
})

export default persistReducer(persistConfig, rootReducer)
