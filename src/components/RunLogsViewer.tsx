import {LogEntryEvent, useGetRunDetailLogsQuery} from "../features/systemLogs/logsDetailApi.ts";
import {useGetSystemInfoQuery} from "../features/system/systemApi.ts";
import {Table, TableColumnsType} from "antd";
import {useEffect, useRef} from "react";


export function RunLogsViewer({ runId, height }: { runId?: number, height: number }) {

    const { data: system } = useGetSystemInfoQuery()


    const { data: logs = [], isLoading, isError } = useGetRunDetailLogsQuery(
        {
            realtime: (system?.runId == runId),
            runId: runId
        }
    )

    // console.log(`Run Logs Viewer: ${runId}`);

    const fixedColumns: TableColumnsType<LogEntryEvent> = [
        {
            title: 'Id',
            dataIndex: 'id',
            fixed: true,
            width: 100,
        },
        {
            title: 'Message',
            dataIndex: 'message',
        },
    ]

    const safeHeight = height - 40

    const containerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        console.log("useEffect")
        const container = containerRef.current
        if (!container) return

        // console.log("container OK")

        const body = container.querySelector('.ant-table-body')
        if (!body) return

        // console.log("body OK")

        const isAtBottom =
            body.scrollHeight - body.scrollTop - body.clientHeight < 50

        // console.log(`body.scrollHeight: ${body.scrollHeight}`)
        // console.log(`body.scrollTop: ${body.scrollTop}`)
        // console.log(`body.clientHeight: ${body.clientHeight}`)
        // console.log(`isAtBottom: ${isAtBottom}`)

        if (isAtBottom) {
            console.log("isAtBottom OK")
            body.scrollTop = body.scrollHeight
        }
    }, [logs.length])

    if (isLoading) return <p>Loading...</p>;
    if (isError)   return <p>Loading error.</p>;

    return (
        <div ref={containerRef} style={{ height: "100%" }}>
            <Table<LogEntryEvent>
                //className={styles.customTable}
                columns={fixedColumns}
                dataSource={logs}
                pagination={false}
                scroll={{ x: 2000, y: safeHeight }}
                bordered
            />
        </div>
    )

    // return (
    //     <ul>
    //         {logs.map((entry) => (
    //             <li key={entry.id}>
    //                 [{entry.level}] {entry.timestamp} — {entry.message}
    //             </li>
    //         ))}
    //     </ul>
    // );
}