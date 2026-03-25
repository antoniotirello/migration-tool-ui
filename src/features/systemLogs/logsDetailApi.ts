import {baseApi} from "../../services/baseApi.ts";
import {RootState} from "../../app/store.ts";

export interface LogEntryEvent {
    id: number
    message: string
    event: string
    payload: string
    timestamp: string
    level: number
}

export type GetRunLogsArgs = {
    runId?: number
    realtime?: boolean
}

export const logsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getRunDetailLogs: builder.query<LogEntryEvent[], GetRunLogsArgs>({

            // 1️⃣ Carica i log storici da /details
            queryFn: async ({ runId }, _queryApi, _extraOptions, baseQuery) => {
                if (!runId) {
                    console.log("WARNING: runId undefined")
                    return { data: [] } // 🔥 evita fetch inutile
                }

                console.log(`Fetch history of ${runId}`)

                const url = `/log/details?runId=${runId}`;
                const result = await baseQuery(url);

                if (result.error) return { error: result.error };
                return { data: result.data as LogEntryEvent[] };
            },

            // 2️⃣ Apre la connessione SSE e appende i nuovi eventi alla cache
            async onCacheEntryAdded(
                { realtime },
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }
            ) {
                // Aspetta che queryFn abbia finito prima di aprire lo stream
                await cacheDataLoaded;


                console.log("Check if last run")

                // Apri SSE solo se è la run corrente

                if (!realtime) return; // ← esce subito, nessun SSE

                console.log("Is last RUN!")

                const state = getState() as RootState
                const backendUrl = state.backendConfig.baseUrl;

                const eventSource = new EventSource(`${backendUrl}/log/events`);

                eventSource.onmessage = (event) => {
                    try {
                        const newEntry: LogEntryEvent = JSON.parse(event.data);
                        updateCachedData((draft) => {
                            draft.push(newEntry); // Immer gestisce l'immutabilità
                        });
                    } catch (e) {
                        console.error("Errore parsing SSE event", e);
                    }
                };

                eventSource.onerror = (err) => {
                    console.error("SSE error", err);
                    eventSource.close();
                };

                // 3️⃣ Cleanup automatico quando il componente si smonta
                await cacheEntryRemoved;
                eventSource.close();
            },
        }),

    }),
});

export const { useGetRunDetailLogsQuery } = logsApi;