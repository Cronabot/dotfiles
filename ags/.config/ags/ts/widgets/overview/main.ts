import { WidgetFunction } from "ts/utils";
import { Window, Box, Label, Overlay, Fixed, Icon } from "resource:///com/github/Aylur/ags/widget.js";
import { hyprland } from "resource:///com/github/Aylur/ags/service/hyprland.js";
import { Client, Monitor, Workspace } from "../../../types/service/hyprland";
import GLib20 from "gi://GLib";

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
const trackedKeys: any = "0123456"
const keyComboTimer = 3000
let waiting = false
let resetTimer: number;
const keyComboState = Variable("")

const inverseScale = 8

const WindowContainer = (client: Client) => Box({
    child: Fixed({
        setup(self) {
            let mon = hyprland.monitors[client.monitor]
            const posX = (client.at[0] - mon?.x) / inverseScale
            const posY = (client.at[1] - mon?.y) / inverseScale
            self.put(Box({
                class_name: "window-container",
                css: `min-width: ${(client.size[0] / inverseScale) - 6}px; min-height: ${(client.size[1] / inverseScale) - 6}px`,
                child: Icon({
                    icon: Utils.lookUpIcon(client.initialClass) ? client.initialClass : "",
                    expand: true,
                    size: 32,
                })
            }), posX, posY)
        }
    })
})

const WorkspaceContainer = (ws: Workspace, monitor: Monitor) => {

    const key = String(ws.id).padStart(2, '0');
    let clients = hyprland.clients.filter(client => client.workspace.id === ws.id)

    return Box({
        class_name: "workspace-container",
        css: `min-width: ${monitor.width / inverseScale}px; min-height: ${monitor.height / inverseScale}px;`,
        children: [
            Overlay({
                overlays: [
                    Box({
                        class_name: "workspace-label",
                        expand: true,
                        margin_top: 5,
                        vpack: "start",
                        hpack: "start",
                        child: Label(key).hook(keyComboState, self => {
                            if (keyComboState.getValue().length == 1) {
                                self.toggleClassName("monitor-selected", parseInt(keyComboState.getValue()) === monitor.id)
                            } else {
                                self.toggleClassName("monitor-selected", false)
                            }
                        })
                    })
                ],
                child: Overlay({
                    child: Box({
                        hpack: "center",
                        vpack: "center",
                    }),
                    overlays: clients.map(c => WindowContainer(c))
                })
            }),
        ]
    }).hook(hyprland, self => {
            self.toggleClassName("in-use", clients.length > 0)
            self.toggleClassName("active", hyprland.active.workspace.id === ws.id)
        })
}

const MonitorWorkspaces = (monitor: Monitor) => Box({
    spacing: 8,
    class_name: "monitor-workspace",
}).hook(hyprland, self => {
        let workspaces = hyprland.workspaces.filter(ws => {
            return ws.monitorID == monitor.id && ws.id > 0
        }).sort((a, b) => { // Sort workspace id's in ascending order
            return a.id - b.id
        })
        self.children = workspaces.map(ws => {
            return WorkspaceContainer(ws, monitor)
        })
    })

export const Overview: WidgetFunction = () => Window({
    name: `overview`,
    exclusivity: "normal",
    monitor: hyprland.bind("active").as(active => active.monitor.id),
    anchor: ["top"],
    margins: [0, 0],
    visible: false,
    layer: "overlay",
    keymode: "on-demand",
    child: Box({ 
        vertical: true,
        spacing: 8,
        class_name: "overview-main",
    }).hook(hyprland, self => {
        self.children = hyprland.monitors.map(mon => {
            return MonitorWorkspaces(mon)
        })
    }),
    setup: self => {
        self.keybind("Escape", (_, e) => {
            App.closeWindow(self.name || "")
        })
        trackedKeys.split("").forEach(k => self.keybind(k, (_, e) => {
            if (waiting) GLib20.source_remove(resetTimer)
            keyComboState.setValue(keyComboState.getValue() + k)
            waiting = true
            resetTimer = Utils.timeout(keyComboTimer, () => {
                keyComboState.setValue("")
                waiting = false
            })
            if (keyComboState.getValue().length == 2) {
                hyprland.workspaces.forEach(ws => {
                    if (ws.id == parseInt(keyComboState.getValue())) {
                        Utils.execAsync("hyprctl dispatch workspace " + keyComboState.getValue()).catch(er => {
                            console.log(er)
                        })
                        App.closeWindow(self.name || "")
                    }
                })
                keyComboState.setValue("")
            }
        }))
    }
})
