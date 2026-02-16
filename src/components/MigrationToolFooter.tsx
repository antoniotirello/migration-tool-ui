import {Button, Col, Row, Space} from "antd";
import {useMigrationToolProvider} from "./providers/MigrationToolProvider.tsx";
import {CaretRightOutlined, CloseOutlined, LeftOutlined} from "@ant-design/icons";
import {MigrationToolStates} from "../machines/MigrationToolStates.ts";
import {MigrationToolEventType} from "../machines/MigrationToolEvents.ts";

export default function MigrationToolFooter() {

    const { state, send } = useMigrationToolProvider();

    return(
        <Row justify="space-between" align="middle">
            <Col>
                <Space>
                    <Button danger  icon={<CloseOutlined />}>
                        Exit
                    </Button>
                    <div>Current step: {typeof state.value === "string" ? state.value : JSON.stringify(state.value)}</div>
                </Space>
            </Col>
            <Col>
                <Space>
                    <Button icon={<LeftOutlined />} disabled={
                        state.matches(MigrationToolStates.Idle)
                    } onClick={() => send({ type: MigrationToolEventType.CANCEL })}>
                        Back
                    </Button>
                    <Button type="primary" icon={<CaretRightOutlined />}>
                        Next
                    </Button>
                </Space>
            </Col>
        </Row>

    )
}