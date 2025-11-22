import type { DataPageStore } from './Idata-page-state'

export interface IdataPage {
    namespaced: boolean,
    state: () => DataPageStore,
    getters: {
        getPage: (state: DataPageStore) => any | null;
        getComponents: (state: DataPageStore) => any[];
    }
    mutations: {
        setPage: (state: DataPageStore, payload: any) => void;
    },
    actions: {
        fetchHomePage: ({ commit }: { commit: (m: string, p?: any) => void }) => Promise<void>;
    }
}