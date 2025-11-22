export interface Idevices {
    namespaced: boolean,
    state: () => { type: string },
    getters: {
        getDeviceType: (state: { type: string }) => string;
    }
    mutations: {},
    actions: {}
}