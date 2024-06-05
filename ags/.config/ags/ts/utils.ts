import { hyprland } from "resource:///com/github/Aylur/ags/service/hyprland.js";
import AgsWindow from "types/widgets/window"

export type WidgetFunction = { (monitor?: number): AgsWindow<any, any> }

export const getMonitorWorkspace = (monitor: number): number => {
    if (!hyprland.monitors[monitor]) return -1
    let ws = hyprland.monitors[monitor].activeWorkspace.id.toString()
    return parseInt(ws.slice(-1), 10);
}

export const ellipsisTruncate = (text: string, limit: number): string => {
    if (text.length > limit) {
        return text.slice(0, limit-2) + "..."
    }
    return text
}
