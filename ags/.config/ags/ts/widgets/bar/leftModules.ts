import { hyprland } from "resource:///com/github/Aylur/ags/service/hyprland.js";
import { Box, EventBox, Label } from "resource:///com/github/Aylur/ags/widget.js";
import { ellipsisTruncate, getMonitorWorkspace } from "../../utils";

const Workspace = (monitor: number) => Box({
    class_name: "workspaces",
    child: Label({
        hexpand: true,
        vpack: "center",
        hpack: "fill",
        setup: self => self.hook(hyprland, () => {
            self.label = getMonitorWorkspace(monitor).toString()
        })
    })
})

const ActiveWindow = () => EventBox({
    class_name: "eb-activewin",
    child: Label().hook(hyprland.active.client, self => {
        const c = hyprland.active.client
        let l = c.class || "No Active Window"
        self.label = ellipsisTruncate(l, 20)
    })
})

export const LeftModules = (monitor: number) => Box({
    class_name: "box-left",
    expand: true,
    spacing: 8,
    halign: 1,
    children: [Label("󰋙"), Workspace(monitor), ActiveWindow()]
})
