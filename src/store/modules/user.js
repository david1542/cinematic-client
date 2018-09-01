import auth from '../../api/auth'
import { REGISTER_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST } from '../../actions'

const state = {
  user: null,
  registerError: false
}

const mutations = {
  [REGISTER_SUCCESS] (state, user) {
    state.user = user
  },
  [REGISTER_FAILURE] (state) {
    state.registerError = true
  }
}
const actions = {
  [REGISTER_REQUEST] ({ commit }, userDetails) {
    auth.register(
      userDetails,
      (user) => commit(REGISTER_SUCCESS, { user }),
      () => commit(REGISTER_FAILURE)
    )
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
