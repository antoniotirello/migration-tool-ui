vi.mock('../api/tauri/backend', () => ({
    getBackendPort: vi.fn().mockResolvedValue('http://localhost:1420')
}))

import { getBackendPort } from '../api/tauri/backend'
import { vi, describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MigrationToolStates } from "../machines/MigrationToolStates"
import { MigrationToolEventType } from "../machines/MigrationToolEvents"
import MigrationToolApp from './MigrationToolApp'
import { renderWithProviders } from '../test/utils'

describe('MigrationToolApp', () => {
    it('renders and triggers events', async () => {
        const sendMock = vi.fn()
        vi.mocked(getBackendPort).mockResolvedValueOnce('http://localhost:9999')

        vi.mock('../features/systemLogs/logsApi', () => ({
            ...vi.importActual('../features/systemLogs/logsApi'),
            useGetLastRunLogsQuery: vi.fn().mockReturnValue({
                data: { content: [], page: 0, size: 0, totalElements: 0, totalPages: 0 },
                isLoading: false,
                error: undefined
            })
        }))

        renderWithProviders(
            <MigrationToolApp state={MigrationToolStates.Idle} send={sendMock} />
        )

        await waitFor(() => {
            expect(screen.getByText(/Create a new migration process/i)).toBeInTheDocument()
        })

        const newMigrationButton = screen.getByText(/Create a new migration process/i)

        await userEvent.click(newMigrationButton)

        expect(sendMock).toHaveBeenCalledWith({ type: MigrationToolEventType.CREATE })
    })
})
