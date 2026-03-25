import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface BackendConfigState {
    baseUrl: string | null
}

const initialState: BackendConfigState = {
    baseUrl: null,
}

const backendConfigSlice = createSlice({
    name: 'backendConfig',
    initialState,
    reducers: {
        setBaseUrl(state, action: PayloadAction<string>) {
            state.baseUrl = action.payload
        },
    },
})

export const { setBaseUrl } = backendConfigSlice.actions
export default backendConfigSlice.reducer