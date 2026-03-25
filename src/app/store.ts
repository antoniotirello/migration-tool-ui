import {configureStore} from '@reduxjs/toolkit'
import backendConfigSlice from '../features/backend/backendSlice'
import {baseApi} from "../services/baseApi";

export const store = configureStore({
    reducer: {
        backendConfig: backendConfigSlice,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch