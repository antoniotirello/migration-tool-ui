import { createMachine } from "xstate";
import { MigrationToolStates } from "./MigrationToolStates.ts";
import {MigrationToolEvent, MigrationToolEventType} from "./MigrationToolEvents.ts";

export const MigrationToolWizardMachine = createMachine({
    id: "app",
    types: {} as {
        context: {
            error?: string
        }
        events: MigrationToolEvent
    },
    initial: MigrationToolStates.Idle,
    context: {
        error: undefined,
    },
    states: {
        [MigrationToolStates.Idle]: {
            on: {
                [MigrationToolEventType.CREATE]: {
                    target: MigrationToolStates.MigrationName,
                },
                [MigrationToolEventType.MIGRATE]: {
                    target: MigrationToolStates.DisplayToDoMigrations,
                },
            },
        },
        [MigrationToolStates.DisplayToDoMigrations]: {
            on: {
                [MigrationToolEventType.CANCEL]: {
                    target: MigrationToolStates.Idle
                },
                [MigrationToolEventType.RUN_ALL]: {
                    target: MigrationToolStates.Output
                }
            }
        },
        [MigrationToolStates.MigrationName]: {
            on: {
                [MigrationToolEventType.CREATE_IT]: {
                    target: MigrationToolStates.Output
                },
                [MigrationToolEventType.CANCEL]: {
                    target: MigrationToolStates.Idle
                },
            }
        },
        [MigrationToolStates.Output]: {
            on: {
                [MigrationToolEventType.DONE]: {
                    target: MigrationToolStates.Done
                },
            }
        },
        [MigrationToolStates.Done]: {
            type: 'final',
        },
    },
})