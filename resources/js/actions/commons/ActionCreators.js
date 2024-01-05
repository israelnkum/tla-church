import { Types } from './Types'

export const commonClasses = (payload) => {
  return {
    type: Types.MEMBER_CLASSES,
      payload: payload
  }
}

export const commonMembers = (payload) => {
  return {
    type: Types.COMMON_MEMBERS,
      payload: payload
  }
}
