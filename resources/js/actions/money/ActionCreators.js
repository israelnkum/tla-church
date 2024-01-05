import { Types } from './Types'


export const allMoneys = (payload) => {
  return {
    type: Types.ALL_MONEYS,
      payload: payload
  }
}


export const addMoney = (payload) => {
    return {
        type: Types.ADD_MONEYS,
        payload: payload
    }
}

export const deleteMoney = (id) => {
  return {
    type: Types.DELETE_MONEYS,
      id: id
  }
}

export const updateMoney = (payload) => {
  return {
    type: Types.UPDATE_MONEYS,
      payload: payload
  }
}

export const addFilter = (payload) => {
    return {
        type: Types.ADD_MONEY_FILTER,
        payload: payload
    }
}

export const getChartData = (payload) => {
    return {
        type: Types.GET_CHART_DATA,
        payload: payload
    }
}
