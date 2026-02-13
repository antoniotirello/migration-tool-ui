# MigrationTool UI

## Intro

This UI is **optional** and will help you to handle all your
migrations needs.

## States

```mermaid
flowchart LR
    Idle([Idle])--CREATE-->MigrationName[Migration name]
    Idle([Idle])--MIGRATE-->ListToDo[Display ToDo Migrations]
    Idle([Idle])--ROLLBACK-->ListMig[Display Executed Migrations]
    Idle([Idle])--HISTORY-->List[Display Full History of Migrations]

    MigrationName--CANCEL-->Idle
    ListToDo--CANCEL-->Idle
    ListMig--CANCEL-->Idle
    List--CANCEL-->Idle

    ListToDo--RUN_ALL-->Output
    ListMig--RUN_SELECTED-->Output
    MigrationName--CREATE_IT-->Output

    Output--DONE-->Done
    List--DONE-->Done
```

# Dev

To connect to the backend, you could use the `.env` with something like that: 
```dotenv
BACKEND_PORT=8888
```

# Prod

Add the following parameter:
```bash
<executable file> --backend-port=8888
```