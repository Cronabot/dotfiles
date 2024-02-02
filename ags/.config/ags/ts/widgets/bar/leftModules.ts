import { hyprland } from "resource:///com/github/Aylur/ags/service/hyprland.js"
import { Widget } from "resource:///com/github/Aylur/ags/widget.js"

const ActiveWindow = () => Widget.EventBox({
    class_name: "eb-activewin",
    child: Widget.Label().hook(hyprland.active.client, self => {
        const c = hyprland.active.client
        self.label = c.class ? `${c.class}: ${c.title}` : ""
    })
})

export const LeftModules = () => Widget.Box({
    class_name: "box-left",
    expand: true,
    spacing: 8,
    halign: 1,
    vertical: false,
    children: [ActiveWindow()]
})
