//  MigrationToolEvents

export enum MigrationToolEventType {
    CREATE = "CREATE",
    CREATE_IT = "CREATE_IT",
    MIGRATE = "MIGRATE",
    CANCEL = "CANCEL",
    ROLLBACK = "ROLLBACK",
    HISTORY = "HISTORY",
    DONE = "DONE",
    RUN_ALL = "RUN_ALL",
}

// events.ts
export type MigrationToolEvent =
    | { type: MigrationToolEventType.CREATE }
    | { type: MigrationToolEventType.CREATE_IT }
    | { type: MigrationToolEventType.MIGRATE }
    | { type: MigrationToolEventType.CANCEL }
    | { type: MigrationToolEventType.ROLLBACK }
    | { type: MigrationToolEventType.HISTORY }
    | { type: MigrationToolEventType.RUN_ALL }
    | { type: MigrationToolEventType.DONE }
