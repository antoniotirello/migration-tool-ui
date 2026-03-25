// src/services/baseApi.ts
import { createApi, fetchBaseQuery, type FetchArgs, type FetchBaseQueryError, type BaseQueryFn } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../app/types/store'

// 1️⃣ Funzione fetchBaseQuery “pura”, senza URL fisso
const baseQueryWithBackend: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = fetchBaseQuery({ baseUrl: '' })

// 2️⃣ Wrapper per leggere dinamicamente il baseUrl dal slice
export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: async (args, api, extraOptions) => {
        const state = api.getState() as RootState
        const backendUrl = state.backendConfig.baseUrl

        if (!backendUrl) {
            throw new Error('Backend non inizializzato!') // oppure ritornare { error: { status: 'CUSTOM', data: 'No backend' } }
        }

        // Se args è una stringa, è la path → prepend baseUrl
        const url = typeof args === 'string'
            ? backendUrl + args
            : { ...args, url: backendUrl + args.url }

        return baseQueryWithBackend(url, api, extraOptions)
    },
    tagTypes: ['Logs'], // aggiungi altri tag se vuoi
    endpoints: () => ({}), // endpoints saranno injectEndpoints nei features
})