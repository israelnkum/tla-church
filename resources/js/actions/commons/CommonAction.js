import api from '../../utils/api'
import {commonClasses, commonMembers} from "./ActionCreators";

export const handleGetCommonClasses = () => async (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/member-classes`).then((res) => {
            dispatch(commonClasses(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetCommonMembers = (query) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/members/search/${query}`).then((res) => {
            dispatch(commonMembers(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
