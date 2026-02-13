import { invoke } from "@tauri-apps/api/core"

export async function getBackendPort(): Promise<string> {
    const port = await invoke<string | null>("get_backend_port")
    if (!port) throw new Error("Backend non disponibile")
    return `http://localhost:${port}`;
}