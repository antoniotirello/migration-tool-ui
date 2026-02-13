import {useEffect, useState} from "react"
import {Card, Col, Layout, Row} from 'antd'
import {Content, Header, Footer} from "antd/es/layout/layout"
import {getBackendPort} from "./api/tauri/backend.ts"
import MigrationToolFooter from "./components/MigrationToolFooter.tsx";
import {useMigrationToolProvider} from "./components/providers/MigrationToolProvider.tsx";
import {MigrationToolEventType} from "./machines/MigrationToolEvents.ts";
import {MigrationToolStates} from "./machines/MigrationToolStates.ts";
import MigrationToolWizardCard from "./components/MigrationToolWizardCard.tsx";
import {DatabaseOutlined} from "@ant-design/icons";


function App() {
    const [serverUrl, setServerUrl] = useState('')
    const { state, send } = useMigrationToolProvider();

    useEffect(() => { 
        getBackendPort().then(setServerUrl) 
    }, [])

    return (
        <Layout className="Container">
            <Header className="Header">
                Migration Dashboard ({serverUrl})
            </Header>
            <Content className="Content">
                {state.matches(MigrationToolStates.Idle) && (
                    <Row gutter={[24, 24]}>
                        <Col xs={24} md={12}>
                            <MigrationToolWizardCard
                                cardTitle="New Migration"
                                description="Create a new migration process"
                                icon={DatabaseOutlined}
                                onClick={() => send({ type: MigrationToolEventType.CREATE })}
                            />
                        </Col>

                        <Col xs={24} md={12}>
                            <MigrationToolWizardCard
                                cardTitle="Display ToDo Migrations"
                                description="Show which migration should be executed"
                                icon={DatabaseOutlined}
                                onClick={() => send({ type: MigrationToolEventType.RUN_ALL })}
                            />
                        </Col>

                        <Col xs={24} md={12}>
                            <MigrationToolWizardCard
                                cardTitle="Display Executed Migrations"
                                description="Show which migration are already applied"
                                icon={DatabaseOutlined}
                                onClick={() => send({ type: MigrationToolEventType.RUN_ALL })}
                            />
                        </Col>

                        <Col xs={24} md={12}>

                            <MigrationToolWizardCard
                                cardTitle="Display Full History of Migrations"
                                description="Show full history"
                                icon={DatabaseOutlined}
                                onClick={() => send({ type: MigrationToolEventType.RUN_ALL })}
                            />
                        </Col>

                        <Col span={24}>
                            <Card
                                title="Migration Run Logs"
                                style={{ marginTop: 16 }}
                            >
                                {/* Qui metterai la Table */}
                                Logs table goes here
                            </Card>
                        </Col>
                    </Row>


                )}
            </Content>
            <Footer className="Footer">
                <MigrationToolFooter />
            </Footer>
        </Layout>
  )
}

export default App
