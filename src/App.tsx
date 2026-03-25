import MigrationToolApp from "./components/MigrationToolApp";
import {useMachine} from "@xstate/react";
import {MigrationToolWizardMachine} from "./machines/MigrationToolWizardMachine";
import {mapMachineStateToView} from "./machines/application/mapMachineStateToView";
import {useAppDispatch, useAppSelector} from "./app/hooks.ts";
import {useEffect} from "react";
import {getBackendPort} from "./api/tauri/backend.ts";
import {setBaseUrl} from "./features/backend/backendSlice.ts";

function App() {
    const [state, send] = useMachine(MigrationToolWizardMachine);
    const dispatch = useAppDispatch()

    const baseUrl = useAppSelector(state => state.backendConfig.baseUrl)

    useEffect(() => {
        getBackendPort().then(baseUrl => {
            dispatch(setBaseUrl(baseUrl))
        })

    }, [])

    if (!baseUrl) {
        return <p>Initializing backend...</p>
    }

    return (
        <MigrationToolApp state={mapMachineStateToView(state)} send={send} />
    )
}

export default App
