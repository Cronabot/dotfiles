import { WidgetFunction } from "ts/utils";
import { Window, Box, Label, Overlay } from "resource:///com/github/Aylur/ags/widget.js";
import { hyprland } from "resource:///com/github/Aylur/ags/service/hyprland.js";
import { Workspace } from "../../../types/service/hyprland";

/*
# Layout Plan

Outer Box
    monitor Boxes (Listed vertically)
        Monitor ID
        workspace Boxes
            workspace id             
            window Boxes
                window icon
                label
    special workspaces

monitor id > workspace id for hotkey (2 part hotkey i.e. press 2 then 1 for mon 2 ws 1)
s > id for special workspaces

*/

const WorkspaceContainer = (ws: Workspace) => Box({
    class_name: "workspace-container",
    children: [
        Overlay({
            overlays: [Label(`${ws.name}`)],
            child: Box().hook(hyprland, self => {
                self.children
            })
        }),
    ]
})

const MonitorWorkspaces = (monitorID: number) => Box({
    margin: 8,
    spacing: 8,
    class_name: "monitor-workspace-main",
}).hook(hyprland, self => {
        let workspaces = hyprland.workspaces.filter(ws => {
            return ws.monitorID == monitorID && !ws.name.match("^special:")
        })
        self.children = workspaces.map(ws => {
            return WorkspaceContainer(ws)
        })
    })

export const Overview: WidgetFunction = () => Window({
    name: `overview`,
    exclusivity: "normal",
    monitor: hyprland.bind("active").as(active => active.monitor.id),
    anchor: ["top"],
    margins: [8, 0],
    visible: false,
    layer: "overlay",
    keymode: "exclusive",
    child: Box({ 
        vertical: true,
        class_name: "bg",
    }).hook(hyprland, self => {
        self.children = hyprland.monitors.map(mon => {
            return MonitorWorkspaces(mon.id)
        })
    }),
    setup: self => {
        return self.keybind("Escape", () => {
            App.closeWindow(self.name || "")
        })
    }
})
