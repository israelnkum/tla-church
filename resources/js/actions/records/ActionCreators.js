import { Types } from './Types'


export const allRecords = (payload) => {
  return {
    type: Types.ALL_RECORDS,
      payload: payload
  }
}


export const addRecord = (payload) => {
    return {
        type: Types.ADD_RECORDS,
        payload: payload
    }
}

export const deleteRecord = (id) => {
  return {
    type: Types.DELETE_RECORDS,
      id: id
  }
}

export const updateRecord = (payload) => {
  return {
    type: Types.UPDATE_RECORDS,
      payload: payload
  }
}

export const addFilter = (payload) => {
    return {
        type: Types.ADD_RECORD_FILTER,
        payload: payload
    }
}

export const getChartData = (payload) => {
    return {
        type: Types.GET_CHART_DATA,
        payload: payload
    }
}
