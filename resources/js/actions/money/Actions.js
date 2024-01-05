import api from '../../utils/api'
import {addMoney, addFilter, allMoneys, deleteMoney, getChartData, updateMoney} from "./ActionCreators";
import {completeExport} from "../../utils";

export const handleGetAllMoneys = (id, params) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/accounts/${id}?${params}`).then((res) => {
            dispatch(allMoneys(res.data))
            params?.delete('page')
            params && dispatch(addFilter(Object.fromEntries(params)))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handlePrintMoney = (id) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/account-records/print/${id}`, { responseType: 'blob' }).then((res) => {
            completeExport(res.data, 'Money')
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleExportMoneys = (id, params) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/accounts/${id}?${params}`, { responseType: 'blob' })
            .then((res) => {
                completeExport(res.data, 'Moneys')
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetChartData = (data) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/account-records/chart', data)
            .then((res) => {
                dispatch(getChartData(res.data))
                resolve(res)
            }).catch((err) => {
            reject(err)
        })
    })
}

export const handleAddNewMoneys = (values) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/account-records', values).then((res) => {
            dispatch(addMoney(res.data))
            resolve()
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleUpdateMoneys = (values) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/account-records/${values.get('id')}`, values)
            .then((res) => {
                dispatch(updateMoney(res.data))
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}

export const handleDeleteMoneys = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/account-records/${id}`).then((res) => {
            dispatch(deleteMoney(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
