import {Button, Col, Row, Space} from "antd";
import {CaretRightOutlined, CloseOutlined, LeftOutlined} from "@ant-design/icons";
import {MigrationToolStates} from "../machines/MigrationToolStates.ts";
import {MigrationToolEvent, MigrationToolEventType} from "../machines/MigrationToolEvents.ts";

type MigrationToolFooterProps = {
    state: MigrationToolStates
    send: (event: MigrationToolEvent) => void
}

export default function MigrationToolFooter({ state, send }: MigrationToolFooterProps) {
    return(
        <Row justify="space-between" align="middle">
            <Col>
                <Space>
                    <Button danger  icon={<CloseOutlined />}>
                        Exit
                    </Button>
                    <div>Current step: {state}</div>
                </Space>
            </Col>
            <Col>
                <Space>
                    <Button icon={<LeftOutlined />} disabled={
                        state === MigrationToolStates.Idle
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