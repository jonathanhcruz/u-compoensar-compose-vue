import { getDeviceType, type DeviceType } from '../../../helpers'
import type { Idevices } from './types/idevices.ts'

export interface DeviceState {
  type: DeviceType
}

export const device: Idevices = {
  namespaced: true,
  state: () => ({
    type: getDeviceType(),
  }),
  getters: {
    getDeviceType: state => state.type
  },
  mutations: {
    setType(state: DeviceState, payload: DeviceType) {
      state.type = payload
    },
  },
  actions: {
    updateType({ commit }: { commit: (m: string, p: DeviceType) => void }) {
      const t = getDeviceType()
      commit('setType', t)
    },
  },
}
