import {useEffect, useRef, useState} from "react"

/**
 * useElementHeight
 *
 * This hook provides the current height of a DOM element using ResizeObserver.
 * It is primarily intended for cases where a component (e.g. a virtualized list
 * or a table with internal scroll like Ant Design Table) requires an explicit,
 * numeric height to correctly render its scrollable area.
 *
 * Why this exists:
 * - Some UI components (like Ant Design Table) do NOT support percentage-based
 *   heights for their scroll containers (e.g. `scroll.y` must be a number).
 * - In dynamic layouts (flex, modals, resizable panels), the available height
 *   is not known ahead of time and must be measured at runtime.
 *
 * Key behaviors:
 * - Uses ResizeObserver to react to size changes of the target element.
 * - Forces an immediate height calculation on mount/activation because
 *   ResizeObserver may not fire immediately (especially in portals like modals).
 * - Activation is controlled via the `active` flag to avoid measuring elements
 *   that are not yet visible (e.g. closed modals), which would return 0 height.
 *
 * Use:
 * const { ref, height } = useElementHeight(openModal);
 *
 * Usage guidelines:
 * - Attach `ref` to a container that represents ONLY the space you want to measure.
 *   Avoid including headers, toolbars, or other elements unless intentional.
 *   e.g. <div style={{ flex: 1, minHeight: 0 }} ref={ref}>
 * - Typically used with layout containers like:
 *     display: flex;
 *     flex-direction: column;
 *     flex: 1;
 *     min-height: 0;
 * - Pass the returned `height` to components requiring explicit dimensions:
 *     <Table scroll={{ y: height }} />
 *
 * Caveats:
 * - Initial height may be 0 if the element is not yet visible; use a fallback if needed.
 * - Be mindful of layout timing when used inside modals or animated containers.
 * - Avoid mixing this with hardcoded heights to prevent layout inconsistencies.
 *
 * This hook is designed to make dynamic layouts predictable and robust
 * without relying on "magic numbers" or brittle manual calculations.
 */
export function useElementHeight(active: boolean) {
    const ref = useRef<HTMLDivElement | null>(null)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        if (!active) return
        if (!ref.current) return

        const el = ref.current

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0]
            if (entry) {
                setHeight(entry.contentRect.height)
            }
        })

        observer.observe(el)

        // Force immediate calculation of height
        setHeight(el.getBoundingClientRect().height)

        return () => observer.disconnect()
    }, [active])

    return { ref, height }
}