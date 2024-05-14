import { hyprland } from "resource:///com/github/Aylur/ags/service/hyprland.js"
import { CenterBox, EventBox, Label, Box } from "resource:///com/github/Aylur/ags/widget.js";

const ActiveWindow = () => EventBox({
    class_name: "eb-activewin",
    child: Label().hook(hyprland.active.client, self => {
        const c = hyprland.active.client
        let l = c.class || "No Active Window"
        if (l.length > 20) {
            l = l.slice(0, 18) + "..."
        }
        self.label = l
    })
})

export const CenterModules = () => CenterBox({
    class_name: "box-center",
    expand: true,
    spacing: 8,
    halign: 3,
    vertical: false,
    center_widget: ActiveWindow(),
})
