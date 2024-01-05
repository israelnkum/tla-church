import api from '../../utils/api'
import {addRecord, addFilter, allRecords, deleteRecord, getChartData, updateRecord} from "./ActionCreators";
import {completeExport} from "../../utils";

export const handleGetAllRecords = (params) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/accounts?${params}`).then((res) => {
            dispatch(allRecords(res.data))
            params?.delete('page')
            params && dispatch(addFilter(Object.fromEntries(params)))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handlePrintRecord = (id) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/accounts/print/${id}`, { responseType: 'blob' }).then((res) => {
            completeExport(res.data, 'Record')
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleExportRecords = (params) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/accounts?${params}`, { responseType: 'blob' })
            .then((res) => {
                completeExport(res.data, 'Records')
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetChartData = (data) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/accounts/chart', data)
            .then((res) => {
                dispatch(getChartData(res.data))
                resolve(res)
            }).catch((err) => {
            reject(err)
        })
    })
}

export const handleAddNewRecords = (values) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/accounts', values).then((res) => {
            dispatch(addRecord(res.data))
            resolve()
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleUpdateRecords = (values) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/accounts/${values.get('id')}`, values)
            .then((res) => {
                dispatch(updateRecord(res.data))
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}

export const handleDeleteRecords = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/accounts/${id}`).then((res) => {
            dispatch(deleteRecord(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
