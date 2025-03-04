import { Gdk } from "astal/gtk3"
import Hyprland from "gi://AstalHyprland"

export const getMonitorWorkspace = (monitor: number): number => {
    const hypr = Hyprland.get_default()

    if (!hypr.monitors[monitor]) return -1

    let sortedMons = hypr.monitors.sort((a, b) => a.id - b.id )
    let activeWs = sortedMons[monitor].activeWorkspace
    if (!activeWs) return -1
    let wsStr = activeWs.id.toString()

    return parseInt(wsStr.slice(-1))
}

export const GdkMonitorToHypr = (gdkmonitor: Gdk.Monitor): Hyprland.Monitor => {
    const hypr = Hyprland.get_default()

    let found = hypr.monitors.filter(mon => mon.model == gdkmonitor.model)
    return found[0]
}

export const ellipsisTruncate = (text: string, limit: number): string => {
    if (text.length > limit) {
        return text.slice(0, limit-2) + "..."
    }
    return text
}
