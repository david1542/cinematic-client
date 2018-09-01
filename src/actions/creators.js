import ACTIONS from './index'

// Action Creators
export const registerUser = userDetails => ({
  type: 'user/' + ACTIONS.REGISTER_REQUEST,
  payload: { userDetails }
})

export const loginUser = userDetails => ({
  type: 'user/' + ACTIONS.LOGIN_REQUEST,
  payload: { userDetails }
})
