import { Types } from './Types'


export const allExpenses = (payload) => {
  return {
    type: Types.ALL_EXPENSES,
      payload: payload
  }
}


export const addExpenses = (payload) => {
    return {
        type: Types.ADD_EXPENSES,
        payload: payload
    }
}

export const deleteExpenses = (id) => {
  return {
    type: Types.DELETE_EXPENSES,
      id: id
  }
}

export const updateExpenses = (payload) => {
  return {
    type: Types.UPDATE_EXPENSES,
      payload: payload
  }
}

export const addFilter = (payload) => {
  return {
    type: Types.ADD_EXPENSES_FILTER,
      payload: payload
  }
}

export const getChartData = (payload) => {
  return {
    type: Types.GET_EXPENSES_CHART,
      payload: payload
  }
}
