import { Types } from './Types'


export const allMembers = (payload) => {
  return {
    type: Types.ALL_MEMBERS,
      payload: payload
  }
}


export const addMember = (payload) => {
    return {
        type: Types.ADD_MEMBERS,
        payload: payload
    }
}

export const deleteMember = (id) => {
  return {
    type: Types.DELETE_MEMBERS,
      id: id
  }
}

export const updateMember = (payload) => {
  return {
    type: Types.UPDATE_MEMBERS,
      payload: payload
  }
}

export const addFilter = (payload) => {
    return {
        type: Types.ADD_MEMBER_FILTER,
        payload: payload
    }
}

export const getChartData = (payload) => {
    return {
        type: Types.GET_CHART_DATA,
        payload: payload
    }
}
