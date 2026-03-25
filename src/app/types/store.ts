export interface BackendConfigState {
    baseUrl: string | null
}

export interface RootState {
    backendConfig: BackendConfigState
}