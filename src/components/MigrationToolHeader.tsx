import {useEffect, useState} from "react";
import {Badge, Button, Flex, Modal} from "antd";
import Title from "antd/es/typography/Title";
import {InfoCircleOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {useAppSelector} from "../app/hooks";
import {useGetRunLogsQuery} from "../features/systemLogs/logsRunApi.ts";
import LogBox from "./LogBox.tsx";
import {useGetSystemInfoQuery} from "../features/system/systemApi.ts";

export default function MigrationToolHeader () {
    const [openedInfoBox, setOpenedInfoBox] = useState(false)
    const [openedLogBox, setOpenedLogBox] = useState(false)

    const baseUrl = useAppSelector((state) => state.backendConfig.baseUrl)

    function openInfoBox() {
        setOpenedInfoBox(true)
    }

    function openLogBox() {
        setOpenedLogBox(true)
    }

    function closeLogBox() {
        console.log('closeLogBox')
        setOpenedLogBox(false)
    }

    const { data, isLoading, error } = useGetRunLogsQuery(10)
    const { data: system } = useGetSystemInfoQuery()

    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        if (isLoading) {
            const id = setTimeout(() => setShowLoader(true), 100);
            return () => clearTimeout(id);
        } else {
            setShowLoader(false);
        }
    }, [isLoading]);

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error</p>

    const formatter = new Intl.DateTimeFormat('it-IT', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })

    return (
        <>
            <Flex justify="space-between" align="center" style={{height:'100%', marginTop:'5px'}}>
                <Title level={4} style={{ margin: 0 }}>
                    Migration Dashboard ({baseUrl})
                </Title>

                <Flex gap="small">
                    <Badge count={0} size="small">
                        <Button variant={"filled"}  color="primary" icon={<UnorderedListOutlined />} onClick={openLogBox}>
                            Logs
                        </Button>
                    </Badge>

                    <Button variant={"filled"}  color="primary" icon={<InfoCircleOutlined />} onClick={openInfoBox}>
                        Info
                    </Button>
                </Flex>
            </Flex>

            <LogBox
                openModal={openedLogBox} onCancel={closeLogBox}
            />

            <Modal
                title={<p>Loading Modal</p>}
                footer={
                    <Button type="primary" onClick={() => setOpenedInfoBox(false)}>
                        Reload
                    </Button>
                }
                loading={showLoader}
                open={openedInfoBox}
                onCancel={() => setOpenedInfoBox(false)}
            >
                <p>RunId: {system?.runId}</p>
                <p>Version: {system?.version}</p>

                <ul>
                    {data?.content?.map(log => {
                        const startedAt = new Date(log.startedAt)
                        return (
                            <li key={log.id}>
                                [{log.id}] {log.lastRun ? '✅' : ' '} {formatter.format(startedAt)}
                            </li>
                        )
                    })}

                </ul>
            </Modal>
        </>
    )
}