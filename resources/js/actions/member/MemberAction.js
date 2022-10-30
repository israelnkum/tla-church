import api from '../../utils/api'
import {addMember, addFilter, allMembers, deleteMember, getChartData, updateMember} from "./ActionCreators";
import {completeExport} from "../../utils";

export const handleGetAllMembers = (params) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/members?${params}`).then((res) => {
            dispatch(allMembers(res.data))
            params?.delete('page')
            params && dispatch(addFilter(Object.fromEntries(params)))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleExportMembers = (params) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/members?${params}`, { responseType: 'blob' })
            .then((res) => {
                completeExport(res.data, 'Members')
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetChartData = (data) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/members/chart', data)
            .then((res) => {
                dispatch(getChartData(res.data))
                resolve(res)
            }).catch((err) => {
            reject(err)
        })
    })
}

export const handleAddNewMembers = (values) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/members', values).then((res) => {
            dispatch(addMember(res.data))
            resolve()
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleUpdateMembers = (values) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/members/${values.get('id')}`, values)
            .then((res) => {
                dispatch(updateMember(res.data))
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}

export const handleDeleteMembers = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/members/${id}`).then((res) => {
            dispatch(deleteMember(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
