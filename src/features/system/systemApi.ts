import {baseApi} from "../../services/baseApi.ts";

export interface systemInfo {
    version: string
    runId: number
}

export const systemApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSystemInfo: builder.query<systemInfo, void>({
            query: () => '/system',
            providesTags: ['Logs'],
        }),
    }),
})

export const { useGetSystemInfoQuery } = systemApi
