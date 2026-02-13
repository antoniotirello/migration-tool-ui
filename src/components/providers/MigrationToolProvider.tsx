import { useMachine } from "@xstate/react";
import { MigrationToolWizardMachine } from "../../machines/MigrationToolWizardMachine.ts";
import { ReactNode, createContext, useContext } from "react";
import type { SnapshotFrom } from "xstate";
import type { MigrationToolEvent } from "../../machines/MigrationToolEvents.ts";

// tipiamo state come snapshot della macchina
// send prende già il tipo corretto degli eventi della macchina
type MigrationToolContextType = {
    state: SnapshotFrom<typeof MigrationToolWizardMachine>;
    send: (event: MigrationToolEvent) => void;
} | null;

const MigrationToolContext = createContext<MigrationToolContextType>(null);

type MigrationToolProviderProps = {
    children: ReactNode;
};

export function MigrationToolProvider({ children }: MigrationToolProviderProps) {
    const [state, send] = useMachine(MigrationToolWizardMachine);

    return (
        <MigrationToolContext.Provider value={{ state, send }}>
            {children}
        </MigrationToolContext.Provider>
    );
}

export function useMigrationToolProvider() {
    const context = useContext(MigrationToolContext);
    if (!context) throw new Error("useWizard must be used inside a MigrationToolProvider");
    return context;
}
