import { bind } from "astal"
import Hyprland from "gi://AstalHyprland"
import { getMonitorWorkspace } from "../../../utils"

export const Workspace = ({monitor}: { monitor: number }) => {
    const hypr = Hyprland.get_default()

    return <label label={bind(hypr, "focusedWorkspace").as(ws => {
        return getMonitorWorkspace(monitor).toString()
    })} />
}
