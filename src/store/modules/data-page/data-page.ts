import type { IdataPage } from './types/idata-page'
import { apiGet } from '../../../helpers/api'
import Router from "../../../router";

export interface DataPageState {
    page: any | null
}

export const dataPage: IdataPage = {
    namespaced: true,
    state: (): DataPageState => ({
        page: null,
    }),
    getters: {
        getPage: (state: DataPageState) => state.page,
        getComponents: (state: DataPageState) => {
            const page = state.page?.data ?? null
            return Array.isArray(page?.components) ? page.components : []
        },
    },
    mutations: {
        setPage(state: DataPageState, payload: any) {
            state.page = payload
        },
    },
    actions: {
        async fetchHomePage({ commit }: { commit: (m: string, p?: any) => void }) {
            const res = await apiGet('/api/home?populate=*')
            if (!res.ok) {
                console.error('Failed to fetch home page:', res.error)
                Router.push('/404');
                return
            }
            const payload = res.data ?? null
            commit('setPage', payload)
        },
    },
}
