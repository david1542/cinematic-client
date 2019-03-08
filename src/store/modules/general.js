// import i18n from '@/i18n'
import { CHANGE_LANGUAGE } from '@/actions'

const actions = {
  [CHANGE_LANGUAGE] (context, { payload }) {
    return new Promise((resolve) => {
      localStorage.setItem('language', payload)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  actions
}
