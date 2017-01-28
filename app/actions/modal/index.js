import * as types from '../../constants/ActionTypes.js'

export function showModal(modalType) {
  return {
    type: types.SHOW_MODAL,
    modalType,
  }
}

export function hideModal() {
  return {
    type: types.HIDE_MODAL,
  }
}
