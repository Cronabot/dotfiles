import { bind } from "astal"
import Hyprland from "gi://AstalHyprland"
import { ellipsisTruncate } from "../../../utils"

export const ActiveWindow = () => {
    const hypr = Hyprland.get_default()

    return <label label={bind(hypr, "focusedClient").as(client => {
        let l = client?.class || "No Active Window"
        return ellipsisTruncate(l, 20)
    })} />
}
