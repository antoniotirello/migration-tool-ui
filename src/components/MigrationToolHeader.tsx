import {useEffect, useState} from "react";
import {getBackendPort} from "../api/tauri/backend.ts";
import {Badge, Button, Flex, Modal} from "antd";
import Title from "antd/es/typography/Title";
import {InfoCircleOutlined, UnorderedListOutlined} from "@ant-design/icons";

export default function MigrationToolHeader () {
    const [serverUrl, setServerUrl] = useState('')
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getBackendPort().then(setServerUrl)
    }, [])

    function openInfoBox() {
        setLoading(true)
        setOpen(true)
        getBackendPort().then(() => {
            setLoading(false)
        })
    }

    return (
        <>
            <Flex justify="space-between" align="center" style={{height:'100%', marginTop:'5px'}}>
                <Title level={4} style={{ margin: 0 }}>
                    Migration Dashboard ({serverUrl})
                </Title>

                <Flex gap="small">
                    <Badge count={0} size="small">
                        <Button variant={"filled"}  color="primary" icon={<UnorderedListOutlined />}>
                            Logs
                        </Button>
                    </Badge>

                    <Button variant={"filled"}  color="primary" icon={<InfoCircleOutlined />} onClick={openInfoBox}>
                        Info
                    </Button>
                </Flex>
            </Flex>

            <Modal
                title={<p>Loading Modal</p>}
                footer={
                    <Button type="primary" onClick={() => setOpen(false)}>
                        Reload
                    </Button>
                }
                loading={loading}
                open={open}
                onCancel={() => setOpen(false)}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    )
}