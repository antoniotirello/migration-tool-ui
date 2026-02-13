import { MigrationToolWizardMachine } from "./MigrationToolWizardMachine.ts";
import { createActor } from "xstate";
import { MigrationToolEventType } from "./MigrationToolEvents.ts";
import {MigrationToolStates} from "./MigrationToolStates.ts";

test("Create migration", () => {
    const actor = createActor(MigrationToolWizardMachine);
    actor.start();

    expect(actor.getSnapshot().value).toBe(MigrationToolStates.Idle);
    expect(actor.getSnapshot().status).not.toBe('done')

    actor.send({ type: MigrationToolEventType.CREATE });
    expect(actor.getSnapshot().value).toBe(MigrationToolStates.MigrationName);

    expect(actor.getSnapshot().status).not.toBe('done')

    actor.send({ type: MigrationToolEventType.CANCEL });
    expect(actor.getSnapshot().value).toBe(MigrationToolStates.Idle);

    actor.send({ type: MigrationToolEventType.CREATE });
    expect(actor.getSnapshot().value).toBe(MigrationToolStates.MigrationName);

    actor.send({ type: MigrationToolEventType.CREATE_IT });
    expect(actor.getSnapshot().value).toBe(MigrationToolStates.Output);

    actor.send({ type: MigrationToolEventType.DONE });
    expect(actor.getSnapshot().value).toBe(MigrationToolStates.Done);

    expect(actor.getSnapshot().status).toBe('done')
});

test("Create migration", () => {
    const actor = createActor(MigrationToolWizardMachine);
    actor.start();

    expect(actor.getSnapshot().value).toBe(MigrationToolStates.Idle);
    expect(actor.getSnapshot().status).not.toBe('done')

    actor.send({ type: MigrationToolEventType.MIGRATE });
    expect(actor.getSnapshot().value).toBe(MigrationToolStates.DisplayToDoMigrations);

    actor.send({ type: MigrationToolEventType.CANCEL });
    expect(actor.getSnapshot().value).toBe(MigrationToolStates.Idle);

    actor.send({ type: MigrationToolEventType.MIGRATE });
    expect(actor.getSnapshot().value).toBe(MigrationToolStates.DisplayToDoMigrations);
    expect(actor.getSnapshot().status).not.toBe('done')

    actor.send({ type: MigrationToolEventType.RUN_ALL });
    expect(actor.getSnapshot().value).toBe(MigrationToolStates.Output);
    expect(actor.getSnapshot().status).not.toBe('done')

    actor.send({ type: MigrationToolEventType.DONE });
    expect(actor.getSnapshot().value).toBe(MigrationToolStates.Done);

    expect(actor.getSnapshot().status).toBe('done')
})