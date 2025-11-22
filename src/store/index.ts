import * as Vuex from 'vuex'
import { device, type DeviceState } from './modules/device/device.ts'
import { dataPage, type DataPageState } from './modules/data-page/data-page.ts'

export interface RootState {
  device: DeviceState,
  dataPage: DataPageState
}

const createStoreFn = (Vuex as any).createStore || (Vuex as any).default?.createStore || ((opts: any) => (Vuex as any).Store ? new (Vuex as any).Store(opts) : null)

const store = createStoreFn({
  modules: {
    device,
    dataPage,
  },
})

export default store
