import {Card, Col, Layout, Row} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import MigrationToolHeader from "./MigrationToolHeader.tsx";
import MigrationToolWizardCard from "./MigrationToolWizardCard.tsx";
import {CheckSquareTwoTone, DatabaseTwoTone, EditTwoTone, PlayCircleTwoTone} from "@ant-design/icons";
import {MigrationToolEvent, MigrationToolEventType} from "../machines/MigrationToolEvents.ts";
import MigrationToolFooter from "./MigrationToolFooter.tsx";
import {MigrationToolStates} from "../machines/MigrationToolStates.ts";

type AppViewProps = {
    state: MigrationToolStates
    send: (event: MigrationToolEvent) => void
}

export default function MigrationToolApp({ state, send }: AppViewProps) {
    return (
        <Layout className="Container">
            <Header className="Header">
                <MigrationToolHeader />
            </Header>
            <Content className="Content">
                {state === MigrationToolStates.Idle && (
                    <Row gutter={[24, 24]}>
                        <Col xs={24} md={12}>
                            <MigrationToolWizardCard
                                cardTitle="New Migration"
                                description="Create a new migration process"
                                icon={EditTwoTone}
                                onClick={() => send({ type: MigrationToolEventType.CREATE })}
                            />
                        </Col>

                        <Col xs={24} md={12}>
                            <MigrationToolWizardCard
                                cardTitle="Display ToDo Migrations"
                                description="Show which migration should be executed"
                                icon={PlayCircleTwoTone}
                                onClick={() => send({ type: MigrationToolEventType.MIGRATE })}
                            />
                        </Col>

                        <Col xs={24} md={12}>
                            <MigrationToolWizardCard
                                cardTitle="Display Executed Migrations"
                                description="Show which migration are already applied"
                                icon={CheckSquareTwoTone}
                                onClick={() => send({ type: MigrationToolEventType.RUN_ALL })}
                            />
                        </Col>

                        <Col xs={24} md={12}>
                            <MigrationToolWizardCard
                                cardTitle="Display Full History of Migrations"
                                description="Show full history"
                                icon={DatabaseTwoTone}
                                onClick={() => send({ type: MigrationToolEventType.RUN_ALL })}
                            />
                        </Col>

                        <Col span={24}>
                            <Card>
                                status
                            </Card>
                        </Col>
                    </Row>


                )}
            </Content>
            <Footer className="Footer">
                <MigrationToolFooter state={state} send={send} />
            </Footer>
        </Layout>
    )
}