import {Button, Flex} from "antd";
import {useMigrationToolProvider} from "./providers/MigrationToolProvider.tsx";

export default function MigrationToolFooter() {

    const { state } = useMigrationToolProvider();
    return (
        <Flex justify="end" gap="middle" style={{ width: '100%' }}>
            <div>Current step: {typeof state.value === "string" ? state.value : JSON.stringify(state.value)}</div>
            <Button>Back</Button>
            <Button>Cancel</Button>
            <Button type="primary">Next</Button>
        </Flex>
    )
}