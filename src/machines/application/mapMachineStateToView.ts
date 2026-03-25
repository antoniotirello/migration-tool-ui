import {SnapshotFrom} from "xstate";
import {MigrationToolWizardMachine} from "../MigrationToolWizardMachine.ts";
import {MigrationToolStates} from "../MigrationToolStates.ts";

export function mapMachineStateToView(snapshot: SnapshotFrom<typeof MigrationToolWizardMachine>): MigrationToolStates {
    if (snapshot.matches(MigrationToolStates.Idle))
        return MigrationToolStates.Idle

    if (snapshot.matches(MigrationToolStates.DisplayToDoMigrations))
        return MigrationToolStates.DisplayToDoMigrations

    if (snapshot.matches(MigrationToolStates.DisplayExecutesMigrations))
        return MigrationToolStates.DisplayExecutesMigrations

    if (snapshot.matches(MigrationToolStates.MigrationName))
        return MigrationToolStates.MigrationName

    if (snapshot.matches(MigrationToolStates.DisplayFullHistory))
        return MigrationToolStates.DisplayFullHistory

    if (snapshot.matches(MigrationToolStates.Output))
        return MigrationToolStates.Output

    if (snapshot.matches(MigrationToolStates.Done))
        return MigrationToolStates.Done

    throw new Error("Unhandled state")
}