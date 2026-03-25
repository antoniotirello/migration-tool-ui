import {Button, Modal, Select, Table, Tag} from "antd"
import {useGetRunLogsQuery} from "../features/systemLogs/logsRunApi.ts"
import {useGetSystemInfoQuery} from "../features/system/systemApi.ts";
import {useEffect, useState} from "react";
import {useElementHeight} from "../app/helpers/useElementHeight.ts";
import {RunLogsViewer} from "./RunLogsViewer.tsx";

interface LogBoxProps {
    openModal: boolean
    onCancel: () => void
}

export default function LogBox ({ openModal, onCancel }: LogBoxProps ) {
    //const [runSelected, setRunSelected] = useState<boolean>(false)

    const { data: runData, isLoading: runIsLoading } = useGetRunLogsQuery(10)

    const { data: system } = useGetSystemInfoQuery()

    const [currentRunId, setCurrentRunId] = useState<number | undefined>(undefined)

    // sync quando arriva system
    useEffect(() => {
        if (system?.runId) {
            setCurrentRunId(system.runId)
        }
    }, [system])

    const [open, setOpen] = useState(false);

    const onChange = (id: number) => {
        console.log("onChange", id)
        setCurrentRunId(id)
    }

    const { ref, height } = useElementHeight(openModal);

    return (
        <Modal
            title={<p>Logs</p>}
            footer={
                <Button type="primary" onClick={onCancel}>
                    Close
                </Button>
            }
            open={openModal}
            onCancel={onCancel}
            width={"90%"}
            style={{top: 20}}
            styles={{
                body: {
                    padding: 16,
                },
            }}
        >
            <div
                style={{
                    height: "60vh",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                }}
            >
                <Select
                    loading={runIsLoading}
                    value={currentRunId}
                    style={{ width:"100%" }}
                    open={open}
                    onOpenChange={setOpen}
                    options={runData?.content.map((r) => ({
                        value: r.id,
                        label: `Run ${r.id}`,
                    }))}
                    popupRender={() => (
                        <div style={{ maxHeight: 300, overflowY: "auto" }}>
                            <Table
                                size="small"
                                rowKey="id"
                                pagination={false}
                                dataSource={runData?.content}
                                columns={[
                                    { title: "ID", dataIndex: "id" },
                                    {
                                        title: "Status",
                                        render: (_, r) =>
                                            r.lastRun ? <Tag color="green">CURRENT</Tag> : null,
                                    },
                                    { title: "Time", dataIndex: "startedAt" },
                                    { title: "Logs", dataIndex: "logs" },
                                    {
                                        title: "Errors",
                                        dataIndex: "errors",
                                        render: (v) => (v > 0 ? <Tag color="red">{v}</Tag> : v),
                                    },
                                ]}
                                onRow={(record) => ({
                                    onClick: () => {
                                        onChange(record.id);
                                        setOpen(false);
                                    },
                                })}
                                scroll={{ y: 240 }}
                            />
                        </div>
                    )}
                />

                <p>
                    height: {height}
                </p>

                <div style={{ flex: 1, minHeight: 0 }} ref={ref}>
                    <RunLogsViewer runId={currentRunId} height={height}/>
                </div>
            </div>
        </Modal>
    )
}