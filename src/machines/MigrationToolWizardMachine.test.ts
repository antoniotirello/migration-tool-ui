import { MigrationToolWizardMachine } from "./MigrationToolWizardMachine.ts";
import { createActor } from "xstate";
import { MigrationToolEventType } from "./MigrationToolEvents.ts";
import {MigrationToolStates} from "./MigrationToolStates.ts";
import {mapMachineStateToView} from "./application/mapMachineStateToView.ts";

test("Create migration", () => {
    const actor = createActor(MigrationToolWizardMachine);
    actor.start();

    expect(actor.getSnapshot().value).toBe(MigrationToolStates.Idle);
    expect(actor.getSnapshot().status).not.toBe('done')
    expect(mapMachineStateToView(actor.getSnapshot())).toBe(MigrationToolStates.Idle)

    actor.send({ type: MigrationToolEventType.CREATE });
    expect(actor.getSnapshot().value).toBe(MigrationToolStates.MigrationName);
    expect(actor.getSnapshot().status).not.toBe('done')
    expect(mapMachineStateToView(actor.getSnapshot())).toBe(MigrationToolStates.MigrationName)

    actor.send({ type: MigrationToolEventType.CANCEL });
    expect(actor.getSnapshot().value).toBe(MigrationToolStates.Idle);
    expect(mapMachineStateToView(actor.getSnapshot())).toBe(MigrationToolStates.Idle)

    actor.send({ type: MigrationToolEventType.CREATE });
    expect(actor.getSnapshot().value).toBe(MigrationToolStates.MigrationName);
    expect(mapMachineStateToView(actor.getSnapshot())).toBe(MigrationToolStates.MigrationName)

    actor.send({ type: MigrationToolEventType.CREATE_IT });
    expect(actor.getSnapshot().value).toBe(MigrationToolStates.Output);
    expect(mapMachineStateToView(actor.getSnapshot())).toBe(MigrationToolStates.Output)

    actor.send({ type: MigrationToolEventType.DONE });
    expect(actor.getSnapshot().value).toBe(MigrationToolStates.Done);
    expect(mapMachineStateToView(actor.getSnapshot())).toBe(MigrationToolStates.Done)

    expect(actor.getSnapshot().status).toBe('done')
});

test("Display ToDo migrations", () => {
    const actor = createActor(MigrationToolWizardMachine);
    actor.start();

    expect(mapMachineStateToView(actor.getSnapshot())).toBe(MigrationToolStates.Idle)

    actor.send({ type: MigrationToolEventType.MIGRATE });
    expect(mapMachineStateToView(actor.getSnapshot())).toBe(MigrationToolStates.DisplayToDoMigrations)

    actor.send({ type: MigrationToolEventType.CANCEL });
    expect(mapMachineStateToView(actor.getSnapshot())).toBe(MigrationToolStates.Idle)

    actor.send({ type: MigrationToolEventType.MIGRATE });
    expect(mapMachineStateToView(actor.getSnapshot())).toBe(MigrationToolStates.DisplayToDoMigrations)

    actor.send({ type: MigrationToolEventType.RUN_ALL });
    expect(mapMachineStateToView(actor.getSnapshot())).toBe(MigrationToolStates.Output)

    actor.send({ type: MigrationToolEventType.DONE });
    expect(mapMachineStateToView(actor.getSnapshot())).toBe(MigrationToolStates.Done)
})