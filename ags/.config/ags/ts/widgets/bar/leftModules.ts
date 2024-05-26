import { hyprland } from "resource:///com/github/Aylur/ags/service/hyprland.js";
import { Box, Label } from "resource:///com/github/Aylur/ags/widget.js";

const Workspaces = (monitor: number) => Box({
    class_name: "workspaces",
    children: [...(Array(6).keys())].map(i => i+monitor*10+1).map(i => Label({
        hexpand: true,
        vpack: "center",
        hpack: "fill",
        //label: `${i-monitor*10-1}`,
        setup: self => self.hook(hyprland, () => {
            self.toggleClassName("active", hyprland.active.workspace.id === i)
            if (hyprland.getWorkspace(i)?.windows || 0 > 0) {
                self.toggleClassName("occupied", true)
                self.label = "•"
            } else {
                self.toggleClassName("occupied", false)
                self.label = "◦"
            }

        }),
    })),
})

export const LeftModules = (monitor: number) => Box({
    class_name: "box-left",
    expand: true,
    spacing: 8,
    halign: 1,
    children: [Label("󰣇"), Workspaces(monitor)]
})
