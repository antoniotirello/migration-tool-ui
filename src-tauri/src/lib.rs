//use tauri::{AppHandle};


// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    dotenvy::dotenv().ok();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            get_backend_port
        ])
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn get_backend_port() -> Option<String> {
    let prefix = "--backend-port=";

    for arg in std::env::args() {
        if arg.starts_with(prefix) {
            return Some(arg[prefix.len()..].to_string());
        }
    }

    return std::env::var("BACKEND_PORT").ok()
}