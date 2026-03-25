import {baseApi} from "../../services/baseApi.ts";

export interface Run {
    id: number
    startedAt: string
    endedAt: string
    environment: string
    lastRun: boolean
}

export interface PageResponse<T> {
    content: T[]
    page: number
    size: number
    totalElements: number
    totalPages: number
}

export const logsRunApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRunLogs: builder.query<PageResponse<Run>, number>({
            query: () => `/log`,
            // query: (limit) => `/systemLogs/last/${limit}`,
            providesTags: ['Logs'],
        }),
    }),
})

export const { useGetRunLogsQuery } = logsRunApi