import { invoke } from "@tauri-apps/api/core"

export async function getBackendPort(): Promise<string> {
    const port = await invoke<string | null>("get_backend_port")

    console.log('[SERVER] getBackendPort', port)

    if (!port) throw new Error("Backend non disponibile")
    return `http://localhost:${port}/api/v1`;
}